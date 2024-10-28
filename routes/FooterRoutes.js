const express = require("express");

module.exports = (controllers) => {
  const router = express.Router();

  // Footer Logo Routes
  router.post(
    "/logo",
    controllers.upload.single("image"),
    controllers.createFooterLogo
  );
  router.get("/logo", controllers.getFooterLogo);
  router.put(
    "/logo",
    controllers.upload.single("image"),
    controllers.updateFooterLogo
  );
  router.delete("/logo", controllers.deleteFooterLogo);

  // Footer Title Routes
  router.post("/title", controllers.createFooterTitle);
  router.get("/title", controllers.getFooterTitle);
  router.put("/title/:id", controllers.updateFooterTitle);
  router.delete("/title/:id", controllers.deleteFooterTitle);

  // Footer Quick Links Routes
  router.post("/links", controllers.createFooterLink);
  router.get("/links", controllers.getFooterLinks);
  router.put("/links/:id", controllers.updateFooterLink);
  router.delete("/links/:id", controllers.deleteFooterLink);

  // Footer Connect Links Routes
  router.post("/connect-links", controllers.createFooterConnectLink);
  router.get("/connect-links", controllers.getFooterConnectLinks);
  router.put("/connect-links/:id", controllers.updateFooterConnectLink);
  router.delete("/connect-links/:id", controllers.deleteFooterConnectLink);

  // Footer Contact Routes
  router.post("/contact", controllers.createFooterContact);
  router.get("/contact", controllers.getFooterContacts);
  router.put("/contact/:id", controllers.updateFooterContact);
  router.delete("/contact/:id", controllers.deleteFooterContact);

  return router;
};
