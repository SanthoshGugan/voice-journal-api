import { Response } from "express";
import { Journal } from "../model/journal";
import S3Repository from "../repository/S3Repository";
import { JournalRepository } from "../repository/journalRepository";
import AbstractService from "./abstractService";
import { JournalLocationRepository } from "../repository/journalLocationRepository";
import { JournalLocation, JournalLocationClass } from "../model/journalLocation";

const s3Repo = new S3Repository();
const journalRepository = new JournalRepository();

const journalLocationRepository = new JournalLocationRepository();

class JournalService extends AbstractService<JournalRepository, Journal, number> {

    constructor() {
        super(journalRepository);
    }

    public async uploadAudio(fileName: string, fileContent): Promise<void> {
        await s3Repo.uploadAudioToS3(fileContent, fileName);
    }

    public async addJournalLocation(journalId: number, bucket_name: string, filename: string): Promise<JournalLocation> {
        const journalLocation: JournalLocation = new JournalLocationClass(journalId, bucket_name, filename);
        console.log(" journalLocation : " + JSON.stringify(journalLocation));
        return await journalLocationRepository.add(journalLocation);
    }
    
    public async downloadAudio(journal_id: number): Promise<Buffer> {
        const journalLocation = await journalLocationRepository.getByField('journal_id', journal_id)
        const { s3_bucket_name, s3_file_name } = journalLocation[0];
        const journalAudio: Buffer = await s3Repo.downloadJournalAudio(s3_bucket_name, s3_file_name);
        return journalAudio;
    }

};

export default JournalService;
