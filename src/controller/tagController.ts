import { Request, Response } from "express";
import { Tags } from "../model/tags";
import JournalService from "../service/journalService";
import TagsService from "../service/tagsService";
import AbstractController from "./abstractController";
import { Journal } from "../model/journal";
import { JournalTag } from "../model/journalTags";

const tagService = new TagsService();
const journalService = new JournalService();

class TagController extends AbstractController<TagsService, Tags, number> {

    constructor() {
        super(tagService);
    }

    public async addTagToJournal(req: Request, res: Response) {
        const { tag_id, journal_id } = req.body;
        const journalTag: JournalTag = await tagService.addTagToJournal(tag_id, journal_id);
        res.status(200).json({ journalTag });
    }

    public async getJournalByTagName(req: Request, res: Response) {
        const tag_name = req.params.tag_name;
        const journals: Journal[] = await tagService.getJournalsByTagName(tag_name);
        res.status(200).json({ journals });
    }

    public async getTagsByJournalId(req: Request, res: Response) {
        const journal_id = req.params.journal_id as unknown;
        const tags: Tags[] = await tagService.getTagsForJournal(journal_id as number);
        res.status(200).json({ tags });
    }
};

export default TagController;