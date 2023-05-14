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

            this.s3.headBucket({ Bucket: bucketName }, function (err, data) {
                if (err) {
                  console.log('Error:', err.code);
                } else {
                  console.log('Bucket is accessible!');
                }
              });

              const paramsTest = {
                Bucket: bucketName,
                Key: filePath,
                Body: file,
              };
              
              this.s3.putObject(paramsTest, function (err, data) {
                if (err) {
                  console.log('Write access not available:', err.code);
                } else {
                  console.log('Write access is available!');
                }
              });

            const params: AWS.S3.PutObjectRequest = {
                Bucket: bucketName,
                Key: filePath,
                Body: file as Blob,
              };
            
              response = await this.s3.upload(params).promise();
        } catch (error) {
            console.log(" file type on error : " + typeof file)
            console.log(" file type on error : " +  file)
            throw new Error("Error uploading file to S3" + error);
        }
    
        // Add logging
        console.log("File uploaded to S3 successfully : " + response.location);
    };

    private async uploadSample() {
        const file: Blob = new Blob();
        this.s3.upload
    }
};

export default S3Repository;