const Profile = require("../../models/profiles");
const { transformProfile } = require("./merge");

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
  createProfile: async (args) => {
    const profile = new Profile({
      name: args.profileinput.name,
      description: args.profileinput.description,
      profession: args.profileinput.profession,
      picture: args.profileinput.picture,
      date: new Date(args.profileinput.date),
      creator: "5ff0c0961be1ed5112f0cfaa",
    });
    let createdprofile;
    try {
      const result = await profile.save();
      createdprofile = transformProfile(result);
      const creator = await User.findById("5ff0c0961be1ed5112f0cfaa");

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
};
