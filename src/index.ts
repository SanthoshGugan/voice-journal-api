import express, { Request, Response } from 'express';

import audioRouter from './audioRouter';

const app = express();
const port = 3000;

const SERVICE_NAME = 'voicejournal';
const VERSION = "v1";

app.get(`/${SERVICE_NAME}/${VERSION}/audio/upload`, (req: Request, res: Response) => {

    res.status(201).json({message: "uploaded"});
});

app.use(`/${SERVICE_NAME}/${VERSION}/audio`, audioRouter)

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})