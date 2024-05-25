import { InjectRepository } from '@nestjs/typeorm';
import { Opportunity } from './opportunity.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './create-opportunity.dto';
import { Category } from '../category/category.entity';
import { Location } from '../location/location.entity';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAllOpportunities(): Promise<Opportunity[]> {
    return this.opportunityRepository.find();
  }

  findOpportunity(id: number): Promise<Opportunity> {
    return this.opportunityRepository.findOneBy({ id });
  }

  async createOpportunity(
    createOpportunityDto: CreateOpportunityDto,
  ): Promise<Opportunity> {
    const opportunity: Opportunity = new Opportunity();

    opportunity.name = createOpportunityDto.name;
    opportunity.image = createOpportunityDto.image;
    opportunity.body = createOpportunityDto.body;
    opportunity.description = createOpportunityDto.description;

    const { category_id, location_id, tags_id } = createOpportunityDto;

    const category = await this.categoryRepository.findOneBy({
      id: category_id,
    });

    const location = await this.locationRepository.findOneBy({
      id: location_id,
    });

    if (tags_id) {
      const tags = await Promise.all(
        tags_id.map(
          async (tag_id) => await this.tagRepository.findOneBy({ id: tag_id }),
        ),
      );
      opportunity.tags = tags;
    }

    if (!category || !location) return null;

    opportunity.category = category;
    opportunity.location = location;

    return this.opportunityRepository.save(opportunity);
  }
}
