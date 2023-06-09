import express, {Request, Response } from 'express';
import AWS from 'aws-sdk';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';
import cors from 'cors';

import audioRouter from './routes/journalRouter';
import userRoute from './routes/userRoute';
import tagRouter from './routes/tagRouter';

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

app.use(cors());
app.use(fileUpload())
app.use(express.json())

app.get(`/${SERVICE_NAME}/${VERSION}/audio/upload`, (req: Request, res: Response) => {

    res.status(201).json({message: "uploaded"});
});

app.use(`/${SERVICE_NAME}/${VERSION}/journal`, audioRouter)

app.use(`/${SERVICE_NAME}/${VERSION}/user`, userRoute);

app.use(`/${SERVICE_NAME}/${VERSION}/tags`, tagRouter);

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})