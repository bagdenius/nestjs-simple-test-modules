import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filename = path.parse(file.originalname).name;
    const extention = path.parse(file.originalname).ext;
    const filePath = path.join(
      uploadDir,
      `${filename}-${new Date().getTime()}${extention}`,
    );
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(filePath, file.buffer);
    return { path: filePath };
  }
}
