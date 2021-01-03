const authResolver = require("./auth");
const profileResolver = require("./profiles");
const thankingResolver = require("./thanking");

const rootResolver = {
  ...authResolver,
  ...profileResolver,
  ...thankingResolver,
};

module.exports = rootResolver;
