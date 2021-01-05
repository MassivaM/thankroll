const Thanking = require("../../models/thanking");
const Profile = require("../../models/profiles");
const { transformThanking, transformProfile } = require("./merge");

module.exports = {
  thanks: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const thanks = await Thanking.find();
      return thanks.map((thank) => {
        return transformThanking(thank);
      });
    } catch (err) {
      throw err;
    }
  },

  thankProfile: async (args, req) => {
    if (!req.isAuth) {
      const fetchedProfile = await Profile.findOne({
        _id: args.profileId,
      });
      const thank = new Thanking({
        message: args.message,
        user: "unauthenticated user",
        profile: fetchedProfile,
      });
      const result = await thank.save();
      return transformThanking(result);
    }
    const fetchedProfile = await Profile.findOne({ _id: args.profileId });
    const thank = new Thanking({
      message: args.message,
      user: req.userId,
      profile: fetchedProfile,
    });
    const result = await thank.save();
    return transformThanking(result);
  },
  cancelThanking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
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
