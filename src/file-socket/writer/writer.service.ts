import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class WriterService {

  protected passedParams: IWriterServiceOptions;

  constructor(
    params: IWriterServiceOptions
  ) {
    // Store params
    this.passedParams = params;
  }

  write(name: string, ...args: any[]) {
    const json: string = JSON.stringify({
      name,
      args,
    });
    fs.appendFileSync(this.passedParams.socketFile, `${json}\n`);
  }

}

export interface IWriterServiceOptions {
  socketFile: string;
}
