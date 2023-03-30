import express, { Request, Response, NextFunction } from "express";
const { validationResult } = require("express-validator");
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface UserPayload {
  id: number;
  email: string;

  
}

interface Error {
  status?: number;
  message?: string;
  name?:string
}
//get all photos
exports.photos = async (req: Request, res: Response, next: NextFunction) => {

  try {
    //check req session
    if (!req.session?.jwt) {
      return res.status(401).json({
        error: "Not authorized"
      })
    } else {


      // const payload = jwt.verify(
      //   req.session.jwt,
      //   process.env.JWT_KEY!
      // ) as UserPayload;

      jwt.verify(req.session.jwt, process.env.JWT_KEY! , async function(err:any, decoded:any) {
        if (err) {
          
           const error = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: err.expiredAt
            }

            return res.status(500).json({
              error
            })
          
        } else{
          const results = await prisma.post.findMany({
            where: {
              published: true
            }
          })
          res.status(200).json({
            message: "success",
            photos: results
          })
        }
      });
    


    }
  } catch (error) {
    let errorType;
    if (error instanceof Error) {
      errorType = error.name;
    }

    res.status(500).json({
      message: "error while fetching photos",
      code:errorType
    })
  }
}


//upload photo
exports.upload = async (req: Request, res: Response, next: NextFunction) => {

  const { title, content, photo } = req.body;

  try {
    //check req session
    if (!req.session?.jwt) {
      return res.status(401).json({
        error: "Not authorized"
      })
    } else {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;

      jwt.verify(req.session.jwt, process.env.JWT_KEY! , async function(err:any, decoded:any) {
        if (err) {
          
           const error = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: err.expiredAt
            }

            return res.status(500).json({
              error
            })
          
        } else{
      

      const result = await prisma.post.create({
        data: {
          title,
          content,
          photo,
          published: true,
          authorId: payload.id
        }
      });


      res.status(201).json({
        message: "success",
        photos: result
      })
    }
  })
}
    
  } catch (error) {
    let errorType;
    if (error instanceof Error) {
      errorType = error.name;
    }
    
    res.status(500).json({
      error: "error while fetching photos",
      code:errorType,
    })
  }
}



// myPhotos
exports.myPhotos =   async (req: Request, res: Response, next: NextFunction) => {
  try {
    //check req session
    if (!req.session?.jwt) {
      return res.status(401).json({
        error: "Not authorized"
      })
    } else {


 
      jwt.verify(req.session.jwt, process.env.JWT_KEY! , async function(err:any, decoded:any) {
        if (err) {
         
          
           const error = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: err.expiredAt
            }

            return res.status(500).json({
              error
            })
          
        } else{
          
          const results = await prisma.post.findMany({
            where: {
              id: decoded.id
            }
          })
          res.status(200).json({
            message: "success",
            photos: results
          })
        }
      });
    


    }
  } catch (error) {
    let errorType;
    if (error instanceof Error) {
      errorType = error.name;
    }

    res.status(500).json({
      message: "error while fetching photos",
      code:errorType
    })
  }
}
