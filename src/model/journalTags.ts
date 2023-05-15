export interface JournalTag {
    id: number,
    tag_id: number,
    journal_id: number
}

export class JournalTagClass implements JournalTag {

    id: number;
    journal_id: number;
    tag_id: number;

    constructor(journal_id: number, tag_id: number) {
        this.journal_id = journal_id;
        this.tag_id = tag_id;
    }
}