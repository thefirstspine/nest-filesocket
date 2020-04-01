# Nest File Socket

Call your NestJS app through local file socket

## Installation

```
npm i nest-filesocket
```

## Usage

### In your app module

```
imports: [
  FileSocketModule.forRoot({
    methodsMap: {
      hello: (name: string) => {
        console.log(`Hello ${name}!`);
      },
    },
    socketFile: __dirname + '/../socket',
  }),
],
```

### Anywhere in your app

Import the writer service:

```
import { WriterService } from 'nest-filesocket';
```

```
  constructor(
    private readonly filesocketWriterService: WriterService
  ) {}
```

Use the service:

```
this.filesocketWriterService.write('hello', 'Teddy');
```

## Some sugar

Use it with nestjs-console & you are ready to communicate with your app with your favorite console!

## Working examples

On Arena: https://github.com/thefirstspine/arena/commit/d08b450afaa1ee88dd90c02380922960a78d5ea4
