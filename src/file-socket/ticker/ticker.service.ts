import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { isString, isArray } from 'util';

@Injectable()
export class TickerService {

  protected passedParams: ITicketServiceOptions;

  constructor(
    params: ITicketServiceOptions
  ) {
    // Store params
    this.passedParams = params;

    // Default values
    this.passedParams.tickDelay =
      this.passedParams.tickDelay && this.passedParams.tickDelay > 0 ?
      this.passedParams.tickDelay :
      500;
    
    // Create socket file if not exists
    if (!fs.existsSync(this.passedParams.socketFile)) {
      fs.writeFileSync(this.passedParams.socketFile, '');
    }

    // Start ticking!
    this.tick();
  }

  protected tick() {
    // Read socket file
    const buffer: Buffer = fs.readFileSync(this.passedParams.socketFile);
    const strBuffer: string = buffer.toString();
    if (strBuffer.length === 0) {
      return this.next();
    }

    // Get commands & call them
    const commands: string[] = strBuffer.split("\n");
    commands.forEach(this.execute.bind(this));

    // Empty socket file
    fs.writeFileSync(this.passedParams.socketFile, '');

    // Process next tick
    this.next()
  }

  protected next() {
    setTimeout(() => {
      this.tick();
    }, this.passedParams.tickDelay);
  }

  protected execute(command: string) {
    try {
      if (command.length === 0) {
        return;
      }

      const objectCommand: IObjectCommand|any = JSON.parse(command); 
      if (!isObjectCommand(objectCommand)) {
        console.log(objectCommand, "Not a valid object command");
        return; // exit method on not valid object command
      }
  
      if (typeof this.passedParams.methodsMap[objectCommand.name] === 'undefined') {
        console.log(objectCommand.name, "not mapped");
        return; // exit method on not registered method
      }
  
      // Apply function
      const callable: Function = this.passedParams.methodsMap[objectCommand.name];
      callable.apply(this.passedParams.context, objectCommand.args);
    } catch (e) {
      console.log(e);
    }
  }

}

export interface ITicketServiceOptions {
  socketFile: string;
  methodsMap: {
    [key: string]: Function,
  };
  context?: Function;
  tickDelay?: number;
}

export interface IObjectCommand {
  name: string,
  args: any[],
}

function isObjectCommand(toBeDefined: any): toBeDefined is IObjectCommand {
  return toBeDefined.name &&
    isString(toBeDefined.name) &&
    toBeDefined.args &&
    isArray(toBeDefined.args);
}
