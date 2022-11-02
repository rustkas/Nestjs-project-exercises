import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { AdminController } from './admin.controller';
import { Cats } from './cats.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminController],
  providers: [AppService, Cats],
})
export class AppModule {}
