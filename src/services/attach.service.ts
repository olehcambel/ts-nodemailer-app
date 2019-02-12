import { createReadStream, ReadStream, promises } from 'fs';

interface FileStream {
  originalname: string;
  path: string;
}

export interface FileStreamOutput {
  filename: string;
  content: ReadStream;
}

export class AttachService {
  static fileStream({ originalname, path }: FileStream): FileStreamOutput {
    return {
      filename: originalname,
      content: createReadStream(path),
    };
  }

  static async removeFile({ path }: { path: string }): Promise<void> {
    promises.unlink(path);
  }
}
