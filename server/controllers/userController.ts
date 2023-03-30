

// import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } = require('express');
import express, { Request, Response, NextFunction } from "express";
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'



//user sign up

exports.Register = async (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //👇🏻 Destructure the user details from the  request object
  const { username, email, password, name } = req.body;
  //👇🏻 Filters the database (array) to check if there is no existing user with the same email or username

  const result = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: username } },
        { email: { contains: email } },
      ],
    },
  })



  //👇🏻 If none, saves the data to the database.
  if (result.length === 0) {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
        email,
      },
    })
    //👇🏻 returns an event stating that the registration was successful

    return res.status(200).json({
      message: "user created successfully!",
      user
    });
  } else {
    return res.status(400).json({
      error: "User already exists",
    });
  }
};


//user sign in 

exports.Login = async (req: Request, res: Response, next: NextFunction) => {

  //validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { username, password } = req.body;

  //👇🏻 Check if user exists from the database
  const user = await prisma.user.findFirst({
    where: {
      username: username
    },
  })


  if (user) {
    //user not found 
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //login success
      const userJwt = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        id: user.id,
        email: user.email
      }, process.env.JWT_KEY!)

      // console.log(userJwt)

      req.session = {
        jwt: userJwt
      };

      res.status(200).json({
        message: "successfully logged in",
        token:userJwt,
        id:user.id,
        email:user.email,
        name:user.name
      });
    } else {
      //Incorrect password
      res.status(400).json({
        error: "Incorrect username or password",
      });
    }



  } 

  else{
    res.status(400).json({
      error: "Incorrect username or password",
    });
  }
};


//user logout

exports.Logout = async (req: Request, res: Response, next: NextFunction) => {


  req.session = null
  console.log('user logout')
  res.status(200).json({
      message:"User logged out",
      });
  

};
