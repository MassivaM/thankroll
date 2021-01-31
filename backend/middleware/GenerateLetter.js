const Profile = require("../graphql/resolvers/profiles");
const DateUtil = require("../helpers/date");
const { profileThankings } = require("../graphql/resolvers/merge");

module.exports = {
  generateLetter: async (profile) => {
    try{
      var thankings = await profileThankings(profile._id);
      console.log(profileId);
      console.log(thankings);
    } catch (err) {
      console.log(err);
    }
  },

  verifyProfiles: async (args) => {
    
    var fetchedProfiles = await Profile.profiles();

    fetchedProfiles.forEach(async (profile,index) =>{ 

      var daysBetween = DateUtil.daysBetween(new Date(profile.date), args);

      console.log(daysBetween + " days since profile creation.");

      if(daysBetween >= 3){
        console.log("Generation letter for profile " + profile.firstName);
        await module.exports.generateLetter(profile);
      }
    })
  }
}