const mongoose = require("mongoose");

// Footer Logo

const FooterlogoSchema = new mongoose.Schema({
  image: String,
});
const FooterLogo = mongoose.model("FooterLogo", FooterlogoSchema);

// Footer Title

const FooterTitleSchema = new mongoose.Schema({
  title1: String,
  title2: String,
});
const FooterTitle = mongoose.model("FooterTitle", FooterTitleSchema);

// Footer Quick Links

const FooterLinksSchema = new mongoose.Schema({
  name: String,
  link: String,
});
const FooterLinks = mongoose.model("FooterLinks", FooterLinksSchema);

// Footer Connect Links

const FooterConnectLinksSchema = new mongoose.Schema({
  name: String,
  link: String,
});
const FooterConnectLinks = mongoose.model(
  "FooterConnectLinks",
  FooterConnectLinksSchema
);

// Footer Contact Data

const FooterContactSchema = new mongoose.Schema({
  address: String,
  email: String,
  PhoneNo: String,
});
const FooterContact = mongoose.model("FooterContact", FooterContactSchema);

module.exports = {
  FooterLogo,
  FooterTitle,
  FooterLinks,
  FooterConnectLinks,
  FooterContact,
};
