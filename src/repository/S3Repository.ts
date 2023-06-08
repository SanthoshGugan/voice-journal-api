import AWS from 'aws-sdk';
import { getS3Url } from '../utils/journalUtils';

export class S3Repository {

    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({ region: process.env.AWS_REGION });
    }

    public async uploadAudioToS3(file, filePath: string): Promise<void> {

        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        let response;
        // Add error handling
        try {

            const params: AWS.S3.PutObjectRequest = {
                Bucket: bucketName,
                Key: filePath,
                Body: file,
              };
            
              response = await this.s3.upload(params);
        } catch (error) {
            console.log(" file type on error : " + typeof file)
            throw new Error("Error uploading file to S3" + error);
        }
    
        // Add logging
        console.log("File uploaded to S3 successfully : " + JSON.stringify(response.Location));
        return response?.Location || '';
    };

    private async uploadSample() {
        const file: Blob = new Blob();
        this.s3.upload
    }

    public async downloadJournalAudio(bucketName: string, fileName: string): Promise<Buffer> {

        const params: AWS.S3.GetObjectRequest = {
            Bucket: bucketName,
            Key: fileName
        };

        const response = await this.s3.getObject(params).promise();

        const fileData: Buffer = response.Body as Buffer;
        return fileData;
    }
};

export default S3Repository;