const express = require("express");
const router = express.Router();
const { body} = require("express-validator");
const weightController = require("../../controllers/weightController");

router.post(
    "/save_weight",
    body("weight").not().isEmpty(),
    weightController.saveWeight
  );
  
  router.post(
    "/update_weight",
    body("weight").not().isEmpty(),
    body("id").not().isEmpty(),
    weightController.updateWeight
  );
  
  router.get("/get_weight_history", weightController.getWeightsByUser);
  router.get("/delete_weight/:id", weightController.deleteWeight);

  module.exports = router;