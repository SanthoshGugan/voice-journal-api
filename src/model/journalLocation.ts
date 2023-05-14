export interface JournalLocation {
    id: number,
    journal_id: number,
    s3_bucket_name: string,
    s3_file_name: string
}

export class JournalLocationClass implements JournalLocation {

    id: number;
    journal_id: number;
    s3_bucket_name: string;
    s3_file_name: string;

    constructor(journal_id: number, s3_bucket_name: string, s3_file_name: string) {
        this.journal_id = journal_id;
        this.s3_bucket_name = s3_bucket_name;
        this.s3_file_name = s3_file_name;
    }
}