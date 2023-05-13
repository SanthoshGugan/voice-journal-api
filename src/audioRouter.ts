import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

router.post('/upload', (req: Request, res: Response) => {

    // check if the request contains audio file
    if(!req.headers['content-type'] || !req.headers['content-type'].startsWith('multipart/form-data')) {
        return res.status(400).send('Invalid request content type');
    }

    const fileData : Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
        fileData.push(chunk);
    });

    req.on('end', () => {
        const formData = Buffer.concat(fileData);

        const contentDisposition = req.headers['content-disposition'];
        console.log(" Content disposition : " + contentDisposition);
        const filenameMatch = /filename="([^"]+)"/.exec(contentDisposition as string);


        if (!filenameMatch) {
            return res.status(400).send('No Audio File not found!');
        }

        const filename = filenameMatch[1];

        fs.writeFileSync(`./uploads/${filename}`, formData);

        res.status(201).json(`{ message : "Audio file uploaded"`)
    });
});

router.get('/download/:filename', (req: Request, res: Response) => {

    const filename = req.params.filename;
    const filePath = path.join(UPLOADS_DIR, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ "message": "File not found!"});
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});


export default router;