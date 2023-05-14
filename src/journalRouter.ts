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

router.get('/download/:journal_id', (req: Request, res: Response) => {
  journalController.downloadJournal(req, res);
})

router.post('/', async (req, res) => {
    await journalController.add(req, res);

})

router.get('/', async (req, res) => {
  await journalController.getAll(req, res);
})


router.get('/:id', async (req, res) => {
  await journalController.getById(req, res);
})


export default router;