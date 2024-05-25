import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunityDto } from './create-opportunity.dto';

@Controller('/opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}
  @Get()
  findAllOpportunitiesWithQueries(
    @Query('q') q: string,
    @Query('category_id') category_id: number,
    @Query('location_id') location_id: number,
    @Query(
      'tag_ids',
      new ParseArrayPipe({ items: Number, separator: ',', optional: true }),
    )
    tag_ids?: number[],
  ) {
    console.log(tag_ids);
    return this.opportunityService.findAllOpportunitiesWithQueries({
      q,
      category_id,
      location_id,
      tag_ids,
    });
  }

  @Get('/:opportunity_id')
  findOpportunity(@Param('opprtunity_id') opportunity_id: number) {
    return this.opportunityService.findOpportunity(opportunity_id);
  }

  @Post()
  createOpportunity(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunityService.createOpportunity(createOpportunityDto);
  }
}
