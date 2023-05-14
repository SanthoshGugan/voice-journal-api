import { Request } from "express";

export const extractFileName = (req: Request): string => {
    const contentDisposition = req.headers['content-disposition'];

    const regex = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/i;
    const match = regex.exec(contentDisposition);
    if (match && match[0]) {
        return match[0];
    }
    return null;
}   

export const getS3Url = (bucketName: string, fileName: string): string => {
    const s3BaseUrl = 'https://s3.amazonaws.com';
    const url = `${s3BaseUrl}/${bucketName}/${fileName}`;
    return url;
  }
  