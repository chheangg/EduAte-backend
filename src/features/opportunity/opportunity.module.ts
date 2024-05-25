import { OpportunityService } from './opportunity.service';
import { Module } from '@nestjs/common';
import { OpportunityController } from './opportunity.controller';
import { Opportunity } from './opportunity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity])],
  providers: [OpportunityService],
  controllers: [OpportunityController],
})
export class OpportunityModule {}
