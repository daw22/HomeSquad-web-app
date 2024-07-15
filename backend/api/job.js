import express from "express";
import jobPosting from "../models/jobPosting.js";
import jobOffer from "../models/jobOffer.js";
import bid from "../models/bid.js";
import homeownerProfile from "../models/homeownerProfile.js";
import workerProfile from "../models/workerProfile.js";

const jobRoutes = express.Router();

// route to post job
jobRoutes.post("/postjob", async (req, res) => {
  const { jobCategory, jobTitle, jobDescription, budjet, picture } = req.body;
  try {
    let data = {
      category: jobCategory,
      title: jobTitle,
      description: jobDescription,
      budget: budjet,
    };
    data["employer"] = req.user.profile;
    if (picture) data["picture"] = picture;
    // create job posting and save
    const jobPost = new jobPosting(data);
    const resp = await jobPost.save();
    // update user profile
    const newProfile = await homeownerProfile.findOneAndUpdate(
      { _id: req.user.profile },
      { $push: {jobPostings: resp._id}},
      { new: true }
    );
    res.status(201).json(newProfile);
  } catch (e) {
    res.status(500);
  }
});

// route to get jobs posted by the user
jobRoutes.get("/my-jobPostings", async (req, res) => {
  const user = req.user.profile;
  try {
    const userProfile = await homeownerProfile.findById(user);
    console.log(userProfile.jobPostings);
    const posts = await jobPosting.find({ _id: { $in: userProfile.jobPostings } });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500);
  }
});

// route to delete job posting
jobRoutes.delete("/delete-jobPosting/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    // get bids on the posting if any and delete them
    const jobPost = await jobPosting.findOne({ _id: postId });
    if (jobPost) {
      // check if user owns the post
      if (!jobPost.employer.equals(req.user.profile)) res.status(400).send('not post owner!'); //bad request
      // delete all the bids for the job posting
      const bids = jobPost.bids;
      if (bids.length > 0) {
        await bid.deleteMany({ _id: { $in: bids } });
      }
    }
    // delete the post it self
    await jobPosting.findOneAndDelete({_id: postId});
    // delete post from homeowner profile jobposting list
    const profile = await homeownerProfile.findOneAndUpdate(
      { _id: req.user.profile },
      { $pull: { jobPostings: postId } },
      {new: true}
    ).populate('jobPostings');
     //send new profile
    res.status(201).json(profile);
  } catch (e) {
    res.status(500);
  }
});

// route to bid on a job.
jobRoutes.post("/bid", async (req, res) => {
  const { jobPostId, bidPrice, message } = req.body;
  try {
    // create and save bid
    const data = { 'jobPosting': jobPostId, bidPrice, message, worker: req.user.profile };
    const newBid = new bid(data);
    const savedBid = await newBid.save();
    // edit job posting with the new bid
    await jobPosting.findOneAndUpdate(
      {_id: jobPostId},
      {$push: {bids: savedBid._id}},  
    );
    res.status(201).json(savedBid);
  } catch (e) {
    console.log(e);
    res.status(500).send("error");
  }
});
// route to get bids on a job(only for job post owner)
jobRoutes.get("/bids/:postId", async (req, res)=> {
  const postId = req.params.postId;
  try {
    // get the post
    const post = await jobPosting.findById(postId);
    // check if user is owner of the post
    if(!post.employer.equals(req.user.profile)) res.status(400).send();
    const bids = await bid.find({_id: {$in: post.bids}}).populate('worker');
    res.status(200).json(bids);
  }catch(e){
    res.status(500).send();
  }
})
// route to withdraw/delete bid
jobRoutes.delete("/delete-bid/:bidId", async (req, res) => {
  const bidId = req.params.bidId;
  try {
    //delete the bid
    const deleteBid = await bid.findOneAndDelete({ _id: bidId });
    //remove from jobPosting bids list
    await jobPosting.findOneAndUpdate(
      { _id: deleteBid.jobPosting },
      { $pull: { bids: bidId } }
    );
    res.status(201);
  } catch (e) {
    res.status(500);
  }
});

// route to award a job to a bidder
jobRoutes.get("/awardjob/:postId/:bidId/:workerId", async (req, res) => {
  const postId = req.params.postId;
  const bidId = req.params.bidId;
  const workerId = req.params.workerId;
  try {
    const jobPost = await jobPosting.findById(postId);
    // check if user owns the job Posting
    //if (jobPost.employer != req.user.profile) res.status(400).send(); // bad request
    // check if the bid exists
    if (!jobPost.bids.includes(bidId)) res.status(400).send();
    // update the accepted bid
    await bid.updateMany(
      { _id: { $in: jobPost.bids } },
      { pending: false, accepted: false }
    );
    await bid.findOneAndUpdate({ _id: bidId }, { accepted: true });
    jobPost.stillOpen = false;
    jobPost.awardedTo = workerId;
    const updatedJobPost = await jobPost.save();
    res.status(200).json(updatedJobPost);
  } catch (e) {
    //console.log(e);
    res.status(500).send("server error");
  }
});

// offer a job for a worker
jobRoutes.post("/offerjob", async (req, res) => {
  const { title, description, budget, picture, worker, homeowner, deadline } =
    req.body;
  const data = { title, description, budget, worker, homeowner, deadline };
  if (picture) data["picture"] = picture;
  try {
    const offer = new jobOffer(data);
    const resp = await offer.save();
    // update homeowner profile
    const updatedProfile = await homeownerProfile.findOneAndUpdate(
      { _id: homeowner },
      { $push: { jobOffers: resp._id } }
    );
    await workerProfile.findOneAndUpdate(
      { _id: worker },
      { $push: { jobOffers: resp._id } }
    );
    res.status(201).json(updatedProfile);
  } catch (e) {
    res.status(500);
  }
});

// route to delete a job offer
jobRoutes.delete("/delete-jobOffer/:jobOfferId", async (req, res) => {
  const jobOfferId = req.params.jobOfferId;
  console.log("id:", jobOfferId);
  try {
    const offer = await jobOffer.findById(jobOfferId).exec();
    // check if offer exist and belongs to user
    if (!offer || !offer.homeowner.equals(req.user.profile)) res.status(400).send(); // bad request
    // remove ofer from homeownner job offers list
    const updatedProfile = await homeownerProfile.findOneAndUpdate(
      { _id: offer.homeowner },
      { $pull: { jobOffers: jobOfferId } },
      { new: true }
    );
    // remove offer from workers job offers list
    await workerProfile.findOneAndUpdate(
      { _id: offer.worker },
      { $pull: { jobOffers: jobOfferId } }
    );
    // delete the offer
    await jobOffer.findByIdAndDelete(jobOfferId);
    // respond with updated profile
    res.status(201).json(updatedProfile);
  } catch (e) {
    res.status(500).send();
  }
});

// route to respond a job offer
jobRoutes.patch("/offer-response/:offerId/:response", async (req, res) => {
  const offerId = req.params.offerId;
  const response = req.params.response;
  try {
    const offer = await jobOffer.findById(offerId);
    // check if offer exists and is offered for the user
    if (!offer || !offer.worker.equals(req.user.profile)) res.status(400).send("error");
    // check if valid response is provided
    if (!(response === "ACCEPTED" || response === "DECLINED")) res.status(400).send("error");
    // update job offer
    offer.status = response;
    const updatedOffer = await offer.save();
    res.status(201).json(updatedOffer);
  } catch (e) {
    res.status(500);
  }
});

// get job offers
jobRoutes.get("/get-offers", async (req, res)=>{
  // if request is form a worker
  if (req.user.role == 'worker') {
    const offers = await jobOffer.find({worker: req.user.profile}).populate('homeowner');
    res.status(200).json(offers);
  }
  // if request is from employer
  else if(req.user.role == 'homeowner') {
    const offers = await jobOffer.find({homeowner: req.user.profile}).populate('worker');
    res.status(200).json(offers);
  }
  else {
    res.status(404).send("error");
  }
})
export default jobRoutes;
