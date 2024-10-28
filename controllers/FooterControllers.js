const models = require("../models/FooterModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: `your_prefix/${req.file.originalname}`,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    stream.end(req.file.buffer);
  });
};

// Footer Logo

const createFooterLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadImage(req);

    const logo = new models.FooterLogo({
      image: result.secure_url,
    });

    const savedLogo = await logo.save();

    res.status(201).json(savedLogo);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: err.message });
  }
};

const getFooterLogo = async (req, res) => {
  const logo = await models.FooterLogo.findOne();
  res.send(logo);
};

const deleteFooterLogo = async (req, res) => {
  const logo = await models.FooterLogo.findOne();

  if (!logo) {
    return res.status(404).send({ message: "Logo not found" });
  }

  const public_id = logo.image.split("/").pop().split(".")[0];

  await cloudinary.uploader.destroy(public_id);

  await models.Logo.deleteMany({});
  res.send({ message: "Logo deleted successfully" });
};

const updateFooterLogo = async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      const result = await uploadImage(req);
      imageUrl = result.secure_url;
    }
    const updateData = {
      ...(imageUrl && { image: imageUrl }),
    };

    const logo = await models.FooterLogo.findOneAndUpdate({}, updateData, {
      new: true,
    });
    if (!logo) {
      return res.status(404).send({ error: "Logo not found" });
    }
    res.send(logo);
  } catch (error) {
    res.status(500).send({ error: "Failed to update Logo" });
  }
};

// Footer title

const createFooterTitle = async (req, res) => {
  try {
    const footerTitle = new models.FooterTitle(req.body);
    await footerTitle.save();
    res.status(201).json(footerTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFooterTitle = async (req, res) => {
  try {
    const footerTitle = await models.FooterTitle.find();
    res.json(footerTitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFooterTitle = async (req, res) => {
  const id = req.params.id;

  try {
    const footerTitle = await models.FooterTitle.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(footerTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFooterTitle = async (req, res) => {
  try {
    await models.FooterTitle.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer title deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Footer Quick Link

const createFooterLink = async (req, res) => {
  try {
    const footerLink = new models.FooterLinks(req.body);
    await footerLink.save();
    res.status(201).json(footerLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFooterLinks = async (req, res) => {
  try {
    const footerLinks = await models.FooterLinks.find();
    res.json(footerLinks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFooterLink = async (req, res) => {
  try {
    const footerLink = await models.FooterLinks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(footerLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFooterLink = async (req, res) => {
  try {
    await models.FooterLinks.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer link deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Footer Connect Links

const createFooterConnectLink = async (req, res) => {
  try {
    const footerConnectLink = new models.FooterConnectLinks(req.body);
    await footerConnectLink.save();
    res.status(201).json(footerConnectLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFooterConnectLinks = async (req, res) => {
  try {
    const footerConnectLinks = await models.FooterConnectLinks.find();
    res.json(footerConnectLinks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFooterConnectLink = async (req, res) => {
  try {
    const footerConnectLink = await models.FooterConnectLinks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(footerConnectLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFooterConnectLink = async (req, res) => {
  try {
    await models.FooterConnectLinks.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer connect link deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Footer Contact

const createFooterContact = async (req, res) => {
  try {
    const footerContact = new models.FooterContact(req.body);
    await footerContact.save();
    res.status(201).json(footerContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFooterContacts = async (req, res) => {
  try {
    const footerContacts = await models.FooterContact.find();
    res.json(footerContacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFooterContact = async (req, res) => {
  try {
    const footerContact = await models.FooterContact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(footerContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFooterContact = async (req, res) => {
  try {
    await models.FooterContact.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upload,
  createFooterLogo,
  getFooterLogo,
  deleteFooterLogo,
  updateFooterLogo,
  createFooterTitle,
  getFooterTitle,
  updateFooterLink,
  deleteFooterLink,
  createFooterLink,
  getFooterLinks,
  updateFooterTitle,
  deleteFooterTitle,
  createFooterConnectLink,
  getFooterConnectLinks,
  updateFooterConnectLink,
  deleteFooterConnectLink,
  createFooterContact,
  getFooterContacts,
  updateFooterContact,
  deleteFooterContact,
};
