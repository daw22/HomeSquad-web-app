import express from "express";
import workerProfile from "../models/workerProfile.js";
import homeownerProfile from "../models/homeownerProfile.js"
import jobPosting from "../models/jobPosting.js";

const searchRoutes = express.Router();

searchRoutes.post("/handiman", async (req, res) => {
  const { firstName, lastName, radius, category } = req.body;
  let query = {};
  if (firstName) query["firstName"] = firstName;
  if (lastName) query["lastName"] = lastName;
  if (category) query["jobCategory"] = category;
  if (radius && radius.location.length == 2) {
    query["address.location"] = {
      $near: {
        $geometry: {
          type: "point",
          coordinates: [radius.location[0], radius.location[1]],
        },
        $maxDistance: radius.radius * 1000,
      },
    };
  }
  const handimen = await workerProfile.find(query, ["-address"]);
  res.status(200).json(handimen);
});

searchRoutes.post("/jobs", async (req, res) => {
  const { category, minBudget, city } = req.body;
  const budget = minBudget ? minBudget : 0;
  try {
    let results = await jobPosting.find({
      'category': category,
      'budget': {$gte: budget},
      'stillOpen': true
    }).populate('employer', 'firstName lastName profilePic address');
    results = results.filter((result)=> {
      if (result.employer.address.city == city){
        result.employer.address.houseNumber = null;
        result.employer.address.location = null;
        result.employer.address.streetName = null;
        return result;
      }
    });
    console.log(results)
    res.status(200).json(results);
  } catch (e) {
    res.status(500);
  }
});
export default searchRoutes;
