const Profile = require("../../models/profiles");
const User = require("../../models/user");
const { transformProfile } = require("./merge");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
module.exports = {
  profiles: async () => {
    try {
      const profiles = await Profile.find();
      return profiles.map((profile) => {
        return transformProfile(profile);
      });
    } catch (err) {
      throw err;
    }
  },
  singleProfile: async (profileId) => {
    try {
      const profile = await Profile.findById(profileId);
      return transformProfile(profile);
    } catch (err) {
      throw err;
    }
  },
  createProfile: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const profile = new Profile({
      firstName: args.profileinput.firstName,
      lastName: args.profileinput.lastName,
      description: args.profileinput.description,
      profession: args.profileinput.profession,
      picture: args.profileinput.picture,
      email: args.profileinput.email,
      date: new Date(args.profileinput.date),
      accept: args.profileinput.accept,
      creator: req.userId,
    });
    let createdprofile;
    try {
      const result = await profile.save();
      createdprofile = transformProfile(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found");
      }
      creator.createdProfiles.push(profile);
      await creator.save();

      return createdprofile;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  setActive: async (profileId, active) =>{
    try{
      const profile = await this.singleProfile(profileId);
      profile.active = active;
      await profile.save();
    } catch (err) {
      throw err;
    }
  },
  uploadImage: async (filename) => {
    filename = `../../uploads/${filename}`;

    try {
      const picture = await cloudinary.v2.uploader.upload(filename);
      return `${picture.public_id}.${picture.format}`;
    } catch (error) {
      throw new Error(error);
    }
  },
};
