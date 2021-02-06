const Profile = require("../graphql/resolvers/profiles");
const DateUtil = require("../helpers/date");
const { profileThankings } = require("../graphql/resolvers/merge");
const nodemailer = require("nodemailer");
const fs = require('fs')

module.exports = {
  generateHTML: async (profile) => {
    var thankings = await profileThankings(profile._id);
    var creator = await profile.creator();

    var html;
    try {
      html = fs.readFileSync('middleware\\LetterTemplate.html', 'utf8');
    } catch (err) {
      throw err;
    }

    html = html.replace("#firstName#", creator.firstName);
    html = html.replace("#lastName#", creator.lastName);
    html = html.replace("#description#", profile.description);
    html = html.replace("#profileImage#", profile.picture);

    var messagesHTML = "";
    for(const thanking of thankings){
      let user = await thanking.user();
      let firstName = user == null ? "Anonymous" : user.firstName;
      let lastName = user == null ? "" : user.lastName;
      messagesHTML += `<tr>
                          <td class="spacer"></td>
                        </tr>
                        <tr>
                          <td class="message">
                            ${thanking.message}
                          </td>
                        </tr>
                        <tr>
                          <th style="height: 1vw; text-align: right;">
                            - ${firstName} ${lastName}
                          </th>
                        </tr>`
    }

    html = html.replace("#messages#", messagesHTML);
    return html;
  },

  generateLetter: async (profile) => {
    try {
      var htmlMessage = await module.exports.generateHTML(profile);

      if(htmlMessage == null){
        console.log("html messages null - Let Alain know");
        return;
      }

      var transport = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "abboudalain@gmail.com",
          pass: "dNHhX35rVRqjDUMQ"
        }
      });

      let message = {
        from: 'Alain from ThankLoop <abboudalain@thankloop.io>',
        to: profile.email,
        subject: 'Thank you',
        text: htmlMessage,
        html: htmlMessage
      }

      let info = await transport.sendMail(message);

    } catch (err) {
      console.log(err);
    }
  },

  verifyProfiles: async (currentTimestamp) => {

    var fetchedProfiles = await Profile.profiles();
    var i = false;

    fetchedProfiles.forEach(async (profile, index) => {

      var daysBetween = DateUtil.daysBetween(new Date(profile.createdAt), currentTimestamp);

      if (daysBetween >= 5) {
        Profile.setActive(profile._id, false);
        await module.exports.generateLetter(profile);
      }
    })
  },

  verifySingleProfile: async (profile) => {
    var thankings = await profileThankings(profile._id);
    if(thankings.length >= 8){
      Profile.setActive(profile._id, false);
      await module.exports.generateLetter(profile);
    }
  }
}
