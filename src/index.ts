import express, {Request, Response } from 'express';
import AWS from 'aws-sdk';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';

import audioRouter from './audioRouter';
import userRoute from './routes/userRoute';

import userController from './controller/userController'; 

const app = express() ;
const port = 3000;

const SERVICE_NAME = 'voicejournal';
const VERSION = "v1";

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

app.use(fileUpload())
app.use(express.json())

app.get(`/${SERVICE_NAME}/${VERSION}/audio/upload`, (req: Request, res: Response) => {

    res.status(201).json({message: "uploaded"});
});

app.use(`/${SERVICE_NAME}/${VERSION}/audio`, audioRouter)

app.use(`/${SERVICE_NAME}/${VERSION}/user`, userRoute);

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})