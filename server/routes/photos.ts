import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

const { body, validationResult } = require("express-validator");

const photosController = require("../controllers/photosController");

router.get(
  "/",
  photosController.photos
);

router.get(
  "/myPhotos",
  photosController.myPhotos
);

router.post(
  "/upload",
  body("content")
  .isLength({ min: 10 })
  .withMessage("content must be at least 10 chars long"),
  body("title")
    .isLength({ min: 5 })
    .withMessage("title must be at least 5 chars long"),
  body("photo")
    .isLength({ min: 6 })
    .withMessage("photo url must be at least 5 chars long")
    .matches(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
    .withMessage("must be valid url"),
    photosController.upload
);

module.exports = router;
