import { Controller, Get } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';

@Controller('/opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}
  @Get()
  findAllOpportunities() {
    return this.opportunityService.findAllOpportunities();
  }
}
