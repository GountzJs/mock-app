import fs from 'fs';
import path from 'path';

export class Database {
  private getDataPath(filename: string): string {
    return path.join(process.cwd(), `src/data/${filename}.json`);
  }

  get(filename: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        this.getDataPath(filename),
        (err: NodeJS.ErrnoException, data: Buffer) => {
          err || !data ? reject(err) : resolve(JSON.parse(data.toString()));
        }
      );
    });
  }

  update(filename: string, newData: Record<string, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.getDataPath(filename),
        JSON.stringify(newData, null, 2),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}
