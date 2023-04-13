import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';
// import * as methodOverride from 'method-override';
import * as session from 'express-session';
import flash from 'express-flash-message';

import { AppModule } from './app.module';

/**
 * refs.:
 * - https://blog.devgenius.io/multiple-page-application-mpa-in-nest-js-with-nunjucks-1fd522cc1aa
 * - https://github.com/STI-Labs/evernote-clone-b/blob/main/app.js
 **/
const ROOT_DIR: string = join(__dirname, '..');
const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const port = 3000;
  const opts: nunjucks.ConfigureOptions = {
    express: app,
    autoescape: true,
    watch: !IS_PRODUCTION,
    noCache: !IS_PRODUCTION,
  };

  const viewsPath = join(ROOT_DIR, 'resources', 'views');
  nunjucks.configure(viewsPath, opts);

  // app.enableCors();
  app.set('trust proxy', 1);
  app.set('views', viewsPath);
  app.set('view engine', 'njk');
  // app.useStaticAssets(join(__dirname, '..', 'public'));

  /*
  app.setBaseViewsDir(join(__dirname, '..', 'resources', 'views'));  
  app.setViewEngine('njk');
  await app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
  */

  // app.use(trim_all);
  // app.use(methodOverride('_method'));
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(
    flash({
      sessionKeyName: 'express-flash-message',
      // below are optional property you can pass in to track
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
      onAddFlash: (type, message) => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
      onConsumeFlash: (type: string, messages: string[]) => {},
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
