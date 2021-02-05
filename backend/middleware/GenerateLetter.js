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
    fs.readFile('middleware\\LetterTemplate.html', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      html = data;
    });
    html.replace("#firstName#", creator.firstName);
    html.replace("#lastName#", creator.lastName);
    html.replace("#description#", profile.description);

    var messagesHTML = "";
    thankings.forEach(async (thanking, index) => {
      let user = await thanking.user();
      messagesHTML += `<tr>
                          <td class="message">
                            ${thanking.message}
                          </td>
                        </tr>
                        <tr>
                          <th style="height: 5%; text-align: right;">
                            ${user.firstName} ${user.lastName}
                          </th>
                        </tr>`
    });
    html.replace("#messages#", messagesHTML);
    console.log("Generation finished");
    console.log(html);
    return html;
  },

  generateLetter: async (profile) => {
    try {
      var htmlMessage = await module.exports.generateHTML(profile);

      if(htmlMessage == null){
        console.log("html null");
        return;
      }

      console.log("Sending email");

      var transport = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: "",
          pass: ""
        }
      });

      let message = {
        from: 'Alain Test <abboudalain@gmail.com>',
        to: 'abboudalain@gmail.com',
        subject: 'Thank you',
        text: 'For clients with plaintext support only',
        html: htmlMessage
      }

      let info = await transport.sendMail(message);

      console.log("Message sent: %s", info);

    } catch (err) {
      console.log(err);
    }
  },

  verifyProfiles: async (args) => {

    var fetchedProfiles = await Profile.profiles();
    var i = false;

    fetchedProfiles.forEach(async (profile, index) => {

      var daysBetween = DateUtil.daysBetween(new Date(profile.date), args);

      console.log(daysBetween + " days since profile creation.");

      if (profile.firstName == "Massy" || daysBetween >= 50) {
        console.log("Generation letter for profile " + profile.firstName);
        await module.exports.generateLetter(profile);
      }
    })
  }
}
