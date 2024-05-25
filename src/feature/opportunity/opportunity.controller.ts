import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunityDto } from './create-opportunity.dto';

@Controller('/opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}
  @Get()
  findAllOpportunities() {
    return this.opportunityService.findAllOpportunities();
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
