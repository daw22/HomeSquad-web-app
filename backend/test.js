import mongoose from "mongoose";
import workerProfile from "./models/workerProfile.js";
import address from "./models/address.js";
import { connectDB } from "./libs/utils.js";
import dotenv from "dotenv";
dotenv.config();

const addressData = {
  country: "Ethiopia",
  city: "Adiss Abeba",
  location: {
    coordinates: [38.744364, 9.010252],
  },
  streetName: "piasa",
};
const workerProfileData = {
  firstName: "jhon",
  lastName: "doe",
  email: "jhondoe@gamil.com",
  jobCategory: "satellite dish",
  jobDescription: "satellite dish installation and maintainance.",
  address: "666eb3cbe3df4e34a2e6b6fb",
  aboutYourSelf: "I am a fast and efficent worker with good behaviour.",
};

const homeownersProfile = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    number_of_hires: 3,
    money_spent: 1500,
    rating: 3.8,

  },
  {
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@example.com",
    number_of_hires: 5,
    money_spent: 2500,
    rating: 4.2,
  },
  {
    first_name: "Emily",
    last_name: "Johnson",
    email: "emilyjohnson@example.com",
    number_of_hires: 2,
    money_spent: 1000,
    rating: 4.8,
  },
  {
    first_name: "Michael",
    last_name: "Williams",
    email: "michaelwilliams@example.com",
    number_of_hires: 4,
    money_spent: 2000,
    rating: 4.4,
  },
  {
    first_name: "Sarah",
    last_name: "Brown",
    email: "sarahbrown@example.com",
    number_of_hires: 3,
    money_spent: 1500,
    rating: 4.5,
  },
  {
    first_name: "David",
    last_name: "Miller",
    email: "davidmiller@example.com",
    number_of_hires: 5,
    money_spent: 2500,
    rating: 4.8,
  },
];

const addresses = [
  {
    country: "USA",
    city: "Chicago",
    streetName: "W Randolph St",
    location: {
        coordinates: [-87.633003, 41.8871]
    },
    houseNumber: 1234,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "N Michigan Ave",
    location: {
        coordinates: [-87.623889, 41.901852]
    },
    houseNumber: 5678,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "S State St",
    location: {
        coordinates: [-87.630571, 41.88332]
    },
    houseNumber: 9012,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "E Wacker Dr",
    location: {
        coordinates: [-87.629004, 41.887907]
    },
    houseNumber: 3456,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "N Ashland Ave",
    location: {
        coordinates: [-87.686719, 41.933228]
    },
    houseNumber: 7890,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "S Cicero Ave",
    location: {
        coordinates: [-87.752222, 41.866167]
    },
    houseNumber: 2580,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "W Belmont Ave",
    location: {
        coordinates: [-87.649414, 41.947834]
    },
    houseNumber: 6173,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "N Clark St",
    location: {
        coordinates: [-87.62937, 41.908117]
    },
    houseNumber: 4951,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "S Halsted St",
    location: {
        coordinates: [-87.621997, 41.880595]
    },
    houseNumber: 8319,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "W Madison St",
    location: {
        coordinates: [-87.632109, 41.885036]
    },
    houseNumber: 1047,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "N LaSalle St",
    location: {
        coordinates: [-87.628113, 41.902615]
    },
    houseNumber: 2765,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "S Wabash Ave",
    location: {
        coordinates: [-87.624121, 41.882124]
    },
    houseNumber: 6093,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "W Roosevelt Rd",
    location: {
        coordinates: [-87.653242, 41.878369]
    },
    houseNumber: 9421,
  },
  {
    country: "USA",
    city: "Chicago",
    streetName: "N Milwaukee Ave",
    location: {
        coordinates: [-87.645398, 41.915]
    },
    houseNumber: 7745,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "E751 St",
    location: {
        coordinates: [-94.49266759091495, 39.07703370905572]
    },
    houseNumber: 4369,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "E75 Ave",
    location: {
        coordinates: [-94.67136937468094, 39.05725264975985]
    },
    houseNumber: 4317,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "N805 Rd",
    location: {
        coordinates: [-94.85750009128186, 38.96004009316606]
    },
    houseNumber: 9910,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "N2 Ave",
    location: {
        coordinates: [-94.50369149214042, 39.39496289058374]
    },
    houseNumber: 4449,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "S621 Ave",
    location: {
        coordinates: [-94.84135402024069, 38.93101731931521]
    },
    houseNumber: 4764,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "N398 St",
    location: {
        coordinates: [-94.97986747109995, 39.313090587833806]
    },
    houseNumber: 1782,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "S562 Blvd",
    location: {
        coordinates: [-94.88907537674221, 39.22364064933557]
    },
    houseNumber: 7055,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "W174 Blvd",
    location: {
        coordinates: [-94.77399964331204, 39.32505767682564]
    },
    houseNumber: 2890,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "N959 Rd",
    location: {
        coordinates: [-94.85224972393522, 39.01222446872348]
    },
    houseNumber: 5145,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "S835 Ave",
    location: {
        coordinates: [-94.81094482555629, 38.99008366462895]
    },
    houseNumber: 5181,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "N904 Rd",
    location: {
        coordinates: [-94.66862420265812, 39.33422018590864]
    },
    houseNumber: 3848,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "W47 Blvd",
    location: {
        coordinates: [-94.55788007909088, 39.09840753042297]
    },
    houseNumber: 8237,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Main St",
    location: {
        coordinates: [-94.57867670092773, 39.10352323652344]
    },
    houseNumber: 9852,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Troost Ave",
    location: {
        coordinates: [-94.56790187976837, 39.069769287109374]
    },
    houseNumber: 2691,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "The Paseo",
    location: {
        coordinates: [-94.59442718408203, 39.06347236877441]
    },
    houseNumber: 3579,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Wyandotte St",
    location: {
        coordinates: [-94.58238080078125, 39.12420001220703]
    },
    houseNumber: 7124,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "State Line Rd",
    location: {
        coordinates: [-94.53450967907715, 39.0007095336914]
    },
    houseNumber: 6480,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Bannister Rd",
    location: {
        coordinates: [-94.59906707763672, 38.98229229736328]
    },
    houseNumber: 5932,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Blueridge Blvd",
    location: {
        coordinates: [-94.63800811767578, 39.02542310229492]
    },
    houseNumber: 8716,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Volker Blvd",
    location: {
        coordinates: [-94.57537049072266, 39.02929077148437]
    },
    houseNumber: 4201,
  },
  {
    country: "USA",
    city: "Kansas City",
    streetName: "Brush Creek Blvd",
    location: {
        coordinates: [-94.621337890625, 39.0079345703125]
    },
    houseNumber: 1357,
  },
];
async function addWorkerProfile(data) {
  const wp = new workerProfile(data);
  await wp.save();
  console.log("worker profile saved.");
}

async function addAddresses(array) {
  await address.insertMany(array)
  .then(result => console.log(`added ${result.insertedCount} addresses.`))
  .catch(err=> console.log(err))
}

(async () => {
  await connectDB();
  await addWorkerProfile(workerProfileData);
  //await addAddresses(addresses);
  mongoose.connection.close();
})();
