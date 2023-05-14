import { Response } from "express";
import { Journal } from "../model/journal";
import S3Repository from "../repository/S3Repository";
import { JournalRepository } from "../repository/journalRepository";
import AbstractService from "./abstractService";

const s3Repo = new S3Repository();
const journalRepository = new JournalRepository();

class JournalService extends AbstractService<JournalRepository, Journal, number> {

    constructor() {
        super(journalRepository);
    }

    public async addJournal(fileName: string, fileContent, journalStr: string): Promise<Journal> {
        const journal: Journal = this.getJournal(journalStr);
        const insertedJournal = await journalRepository.add(journal);
        await s3Repo.uploadAudioToS3(fileContent, fileName);
        return insertedJournal;
    }

    private getJournal(journalStr: string): Journal | null {
        let journal: Journal;
        try {
            journal = JSON.parse(JSON.parse(journalStr));
        } catch(error) {
            console.log(" Error on json parsing : " + journalStr);
            return null;
        }
        return journal;
    }
};

export default JournalService;
