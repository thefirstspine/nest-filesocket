import { Module, DynamicModule } from '@nestjs/common';
import { TickerService, ITicketServiceOptions } from './ticker/ticker.service';
import { WriterService, IWriterServiceOptions } from './writer/writer.service';

@Module({
})
export class FileSocketModule {

  static forRoot(options: IFileSocketModuleOptions): DynamicModule {
    return {
      module: FileSocketModule,
      providers: [
        {
          provide: WriterService,
          useValue: new WriterService({
            socketFile: options.socketFile,
          }),
        },
        {
          provide: TickerService,
          useValue: new TickerService({
            methodsMap: options.methodsMap,
            socketFile: options.socketFile,
          }),
        },
      ],
      exports: [WriterService],
    };
  }

}

export interface IFileSocketModuleOptions extends ITicketServiceOptions, IWriterServiceOptions {
}
