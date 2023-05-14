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