const Profile = require("../../models/profiles");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");
const transformProfile = (profile) => {
  return {
    ...profile._doc,
    _id: profile.id,
    date: dateToString(profile._doc.date),
    creator: user.bind(this, profile.creator),
  };
};

const transformThanking = (thank) => {
  return {
    ...thank._doc,
    _id: thank.id,
    profile: singleProfile.bind(this, thank._doc.profile),
    user: user.bind(this, thank._doc.user),
    createdAt: dateToString(thank._doc.createdAt),
    updatedAt: dateToString(thank._doc.updatedAt),
  };
};

const profiles = async (profileIds) => {
  try {
    const profiles = await Profile.find({ _id: { $in: profileIds } });
    return profiles.map((profile) => {
      return transformProfile(profile);
    });
  } catch (err) {
    throw err;
  }
};

const singleProfile = async (profileId) => {
  try {
    const profile = await Profile.findById(profileId);
    return transformProfile(profile);
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
      createdProfiles: profiles.bind(this, user._doc.createdProfiles),
    };
  } catch (err) {
    throw err;
  }
};

exports.transformProfile = transformProfile;
exports.transformThanking = transformThanking;
