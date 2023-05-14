import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import JournalController from './controller/journalController';
import JournalService from './service/journalService';

const router = express.Router();
const journalController = new JournalController();

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

router.post('/upload', (req: Request, res: Response) => {

    // check if the request contains audio file
    journalController.uploadAudio(req, res);
});

// router.get('/download/:filename', (req: Request, res: Response) => {

//     const filename = req.params.filename;
//     const filePath = path.join(UPLOADS_DIR, filename);

//     if (!fs.existsSync(filePath)) {
//         return res.status(400).json({ "message": "File not found!"});
//     }

//     res.setHeader('Content-Type', 'audio/mpeg');
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

//     const fileStream = fs.createReadStream(filePath);
//     fileStream.pipe(res);
// });

router.post('/', async (req, res) => {
    await journalController.add(req, res);

})


export default router;