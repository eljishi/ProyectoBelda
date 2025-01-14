import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import {MongooseModule} from "@nestjs/mongoose";
import { SeriesModule } from './series/series.module';
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
      MongooseModule.forRoot(
          process.env.DBURL
      ),
      SeriesModule,
      ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
