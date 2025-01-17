import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SerieService } from './service/serie/serie.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SerieSchema} from "./schema/serie.schema/serie.schema";

@Module({
  imports:[
      MongooseModule.forFeature(
          [
            {
              name:'Serie',
              schema: SerieSchema,
              collection:'ProyectoBelda'
            }
          ]
      )
  ],
  controllers: [SeriesController],
  providers: [SerieService]
})
export class SeriesModule {}
