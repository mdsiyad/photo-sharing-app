import express, { Request, Response, NextFunction } from "express";

const router = express.Router();


const { body } = require("express-validator");

const userController = require("../controllers/userController");

router.post(
  "/login",
  userController.Login
);
router.get(
  "/logout",
  userController.Logout
);


router.post(
  "/register",
  body("email").isEmail(),
  body("username")
    .isLength({ min: 3 })
    .withMessage("username must be at least 5 chars long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  userController.Register
);

module.exports = router;
