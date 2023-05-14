import { Request, Response } from "express";
import { Transform } from "stream";
import fs from 'fs';
import { Journal } from "../model/journal";
import JournalService from "../service/journalService";
import AbstractController from "./abstractController";
import { extractFileName } from "../utils/journalUtils";
import { JournalLocation } from "../model/journalLocation";

const journalService = new JournalService();

class JournalController extends AbstractController<JournalService, Journal, number> {

    constructor() {
        super(journalService);
    }

    public async uploadAudio(req, res: Response) {

        // check if the request contains audio file
        if(!req.headers['content-type'] || !req.headers['content-type'].startsWith('audio/')) {
            return res.status(400).send('Invalid request content type');
        }

        const fileData : Buffer[] = [];

        req.on('data', (chunk: Buffer) => {
            fileData.push(chunk);
        });

        req.on('end', async () => {
            const formData = Buffer.concat(fileData);

            const contentDisposition = req.headers['content-disposition'];
            console.log(" Content disposition : " + contentDisposition);
            const filenameMatch = /filename="([^"]+)"/.exec(contentDisposition as string);

            const journalId = req.headers['journal_id'];

            if (!filenameMatch) {
                return res.status(400).send('No Audio File not found!');
            }

            if (!journalId) {
                return res.status(400).send('journal_id is required in header');
            }

            const filename = filenameMatch[1];

            // fs.writeFileSync(`./uploads/${filename}`, formData);
            await journalService.uploadAudio(filename, formData)
            const s3_bucket_name = process.env.AWS_S3_BUCKET_NAME;
            const journalLocation: JournalLocation = await journalService.addJournalLocation(journalId, s3_bucket_name, filename);
            res.status(201).json(`{ message : "Audio file uploaded"`)
        });

    }

};

export default JournalController;