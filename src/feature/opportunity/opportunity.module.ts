import { OpportunityService } from './opportunity.service';
import { Module } from '@nestjs/common';
import { OpportunityController } from './opportunity.controller';
import { Opportunity } from './opportunity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Location } from '../location/location.entity';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity, Category, Location, Tag])],
  providers: [OpportunityService],
  controllers: [OpportunityController],
})
export class OpportunityModule {}
