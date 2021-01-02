const bcrypt = require("bcryptjs");
const Profile = require("../../models/profiles");
const User = require("../../models/user");

const profiles = async (profileIDs) => {
  try {
    const profiles = await Profile.find({ _id: { $in: profileIDs } });
    profiles.map((profile) => {
      return {
        ...profile._doc,
        _id: profile.id,
        date: new Date(profile._doc.date).toISOString(),
        creator: user.bind(this, profile.creator),
      };
    });
    return profiles;
  } catch (err) {
    throw err;
  }
};
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdProfiles: profiles.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  profiles: async () => {
    try {
      const profiles = await Profile.find();
      return profiles.map((profile) => {
        return {
          ...profile._doc,
          _id: profile.id,
          date: new Date(profile._doc.date).toISOString(),
          creator: user.bind(this, profile._doc.creator),
        };
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
      createdprofile = {
        ...result._doc,
        date: new Date(profile._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
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
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userinput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userinput.password, 12);

      const user = new User({
        email: args.userinput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
