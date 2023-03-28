import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';
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

  app.enableCors();
  app.set('trust proxy', 1);
  app.set('views', viewsPath);
  app.set('view engine', 'njk');
  app.useStaticAssets(join(__dirname, '..', 'public'));

  /*
  app.setBaseViewsDir(join(__dirname, '..', 'resources', 'views'));  
  app.setViewEngine('njk');
  await app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
  */
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`ROOT_DIR: ${ROOT_DIR}`);
  console.log(`viewsPath: ${viewsPath}`);
}
bootstrap();
