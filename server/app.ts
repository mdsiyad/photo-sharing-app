import express, {Express,Request,Response,NextFunction,ErrorRequestHandler} from "express";
const cors = require("cors");
const app  = express();
const fs = require('fs')
import cookieSession from "cookie-session";


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const userRoutes = require("./routes/users");
const photosRoutes = require("./routes/photos");

// import library and files
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  
}));

// app.set('trust proxy',true)
app.use(
  cookieSession({
    signed:false,
    // secure:process.env.NODE_ENV !== "test",
    secure:false,
    httpOnly:true,
    maxAge:Math.floor(Date.now() / 1000) + (60 * 60)
  })
)

//root route
app.get("/", async (req, res) => {

  // const users = await getUsers();
  const users =await prisma.user.findMany();
  
  res.json({
    message: "ok",
    data:users
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

//routes
app.use('/api/users',userRoutes)
app.use('/api/photos',photosRoutes)

interface Error {
  status?: number;
  message?: string;
}

// app.use((req:Request, res:Response, next:NextFunction) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
//   );
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
//   next();
// });

// Error Handling if routes is not found
app.use((req:Request, res:Response, next:NextFunction) => {

  // const error = new Error('Not Found');
  const error = new Error('Something went wrong') as Error;

  error.status = 404;
  next(error)
});

app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;
