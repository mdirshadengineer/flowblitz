import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CoreModule } from 'src/core/core.module'; // Import the shared core module

@Module({
  imports: [CoreModule], // Import CoreModule for logging and error handling
  providers: [DatabaseService],
  exports: [DatabaseService] // Export DatabaseService so it can be used in other modules
})
export class DatabaseModule {}
