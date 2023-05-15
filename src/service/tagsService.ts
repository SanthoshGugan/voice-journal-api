import { Journal } from "../model/journal";
import { JournalTag,  JournalTagClass } from "../model/journalTags";
import { Tags } from "../model/tags";
import { JournalRepository } from "../repository/journalRepository";
import { JournalTagsRepository } from "../repository/journalTagsRepository";
import { TagsRepository } from "../repository/tagsRepository";
import AbstractService from "./abstractService";

const tagsRepository = new TagsRepository();
const journalTagsRepository = new JournalTagsRepository();
const journalRepository = new JournalRepository();

class TagsService extends AbstractService<TagsRepository, Tags, number> {
    constructor() {
        super(tagsRepository);
    }

    public async addTagToJournal(tag_id: number, journal_id: number): Promise<JournalTag> {
        const newJournalTag: JournalTag = new JournalTagClass(journal_id, tag_id);
        return await journalTagsRepository.add(newJournalTag);
    }

    public async getJournalsByTagName(tag_name: string): Promise<Journal[]> {
        const tags: Tags[] = await tagsRepository.getByField('name', tag_name);
        console.log(" tags : " + tags);
        if (tags.length == 0) return [];
        const journalTags : JournalTag[] = await journalTagsRepository.getByField('tag_id', tags[0].id);
        const journals: Journal[] = await journalRepository.getByIds(journalTags.map(journal => journal.journal_id));
        return journals;
    }

    public async getTagsForJournal(journal_id: number): Promise<Tags[]> {
        const journalTags: JournalTag[] = await journalTagsRepository.getByField('journal_id', journal_id);
        const tag_ids: number[] = await journalTags.map(journalTag => journalTag.tag_id);
        const tags: Tags[] = await tagsRepository.getByIds(tag_ids);
        return tags;

    }
};

export default TagsService;