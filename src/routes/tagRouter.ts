import express, { Request, Response } from 'express';
import TagController from '../controller/tagController';

const router = express.Router();
const tagController = new TagController();

router.post('/', (req: Request, res: Response) => {
    tagController.add(req, res);
});


router.get('/', (req: Request, res: Response) => {
    tagController.getAll(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    tagController.getById(req, res);
});

router.post('/journal', (req: Request, res: Response) => {
    tagController.addTagToJournal(req, res);
});

router.get('/:tag_name/journal', (req: Request, res: Response) => {
    tagController.getJournalByTagName(req, res);
});

router.get('/journal/:journal_id', (req: Request, res: Response) => {
    tagController.getTagsByJournalId(req, res);
});

export default router;

