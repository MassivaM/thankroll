const Thanking = require("../../models/thanking");
const Profile = require("../../models/profiles");
const { transformThanking, transformProfile } = require("./merge");

module.exports = {
  thanks: async () => {
    try {
      const thanks = await Thanking.find();
      return thanks.map((thank) => {
        return transformThanking(thank);
      });
    } catch (err) {
      throw err;
    }
  },

  thankProfile: async (args) => {
    const fetchedProfile = await Profile.findOne({ _id: args.profileId });
    const thank = new Thanking({
      message: args.message,
      user: "5ff0c0961be1ed5112f0cfaa",
      profile: fetchedProfile,
    });
    const result = await thank.save();
    return transformThanking(result);
  },
  cancelThanking: async (args) => {
    try {
      const thank = await Thanking.findById(args.thankingId).populate(
        "profile"
      );
      const profile = transformProfile(thank.profile);
      await Thanking.deleteOne({ _id: args.thankingId });
      return profile;
    } catch (err) {
      throw err;
    }
  },
};
