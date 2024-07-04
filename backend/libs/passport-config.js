import passport from "passport";
import LocalStrategy from "passport-local";
import homeownerAccount from "../models/homeownerAccount.js";
import workerAccount from "../models/workerAccount.js";
import crypto from "crypto";

function verifyPassword(password, user) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, user.salt, 310000, 32, "sha256")
    .toString("hex");
  return hashedPassword === user.password;
}

passport.use(
  'worker-local',
  new LocalStrategy.Strategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        workerAccount
          .findOne({ username: username })
          .then((user, err) => {
            if (!user)
              return done(err, false, { message: "user doesn't exist" });
            const verified = verifyPassword(password, user);
            if (!verified)
              return done(err, false, { message: "wrong password" });
            return done(null, user);
          })
          .catch((err) => done(err));
      }
  )
);

passport.use(
  'homeowner-local',
  new LocalStrategy.Strategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        homeownerAccount
          .findOne({ username: username })
          .then((user, err) => {
            if (!user)
              return done(err, false, { message: "user doesn't exist" });
            const verified = verifyPassword(password, user);
            if (!verified)
              return done(err, false, { message: "wrong password" });
            return done(null, user);
          })
          .catch((err) => done(err));
      } 
  )
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((data, done) => {
  if (data.role === 'worker'){
    workerAccount
    .findById(data._id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err)); 
  }
  if (data.role === 'homeowner'){
    homeownerAccount
    .findById(data._id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
  }
});

export default passport;
