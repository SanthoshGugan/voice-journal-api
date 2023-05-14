import { Request, Response } from "express";
import { Transform } from "stream";
import fs from 'fs';
import { Journal } from "../model/journal";
import JournalService from "../service/journalService";
import AbstractController from "./abstractController";
import { extractFileName } from "../utils/audioReqUtils";

const journalService = new JournalService();

class JournalController extends AbstractController<JournalService, Journal, number> {

    constructor() {
        super(journalService);
    }

    public async addJournal(req, res: Response) {
        const audioFile = req.files.audio as Blob;
        const fileName = extractFileName(req);
        const journalData = req.body.journal as string;
        try {
            const journal: Journal = await journalService.addJournal(fileName, audioFile, journalData)
        } catch(error) {
            console.log("error while adding journal" + error)
            return res.status(500).json({ "message" : "Internal server error "});
        }

        res.status(201).json(`{ message : "Audio file uploaded"`);

    }

};

export default JournalController;