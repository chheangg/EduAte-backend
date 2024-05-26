import { InjectRepository } from '@nestjs/typeorm';
import { Opportunity } from './opportunity.entity';
import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './create-opportunity.dto';
import { Category } from '../category/category.entity';
import { Location } from '../location/location.entity';
import { Tag } from '../tag/tag.entity';
import { OpportunityQuery } from './opportunity-query.interface';

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

  findAllOpportunitiesWithQueries(
    opportunityQuery: OpportunityQuery,
  ): Promise<Opportunity[]> {
    // const queryBuilder =
    //   this.opportunityRepository.createQueryBuilder('opportunity');

    // if (opportunityQuery.q) {
    //   queryBuilder.andWhere('opportunity.name like :q', {
    //     q: `%${opportunityQuery.q}%`,
    //   });
    //   queryBuilder.andWhere('opportunity.description like :q', {
    //     q: `%${opportunityQuery.q}%`,
    //   });
    // }

    // if (opportunityQuery.category_id) {
    //   console.log(opportunityQuery);
    //   queryBuilder.andWhere('opportunity.categoryId = :id', {
    //     id: opportunityQuery.category_id,
    //   });
    // }

    // if (opportunityQuery.country) {
    //   queryBuilder.andWhere('opportunity.locationId = :id', {
    //     id: opportunityQuery.country,
    //   });
    // }
    // if (opportunityQuery.tag_ids) {
    //   queryBuilder.innerJoin(
    //     'opportunity.tags',
    //     'tag',
    //     'tag.id IN (:...tagIds)',
    //     {
    //       tagIds: opportunityQuery.tag_ids,
    //     },
    //   );
    // }

    // return queryBuilder
    //   .leftJoinAndSelect('opportunity.category', 'category')
    //   .leftJoinAndSelect('opportunity.location', 'location')
    //   .leftJoinAndSelect('opportunity.tags', 'tags')
    //   .getMany();

    const { country, city, category_id, q } = opportunityQuery;
    return this.opportunityRepository.find({
      relations: ['category', 'location', 'tags'],
      where: {
        location: {
          country,
          city,
        },
        category: {
          id: category_id,
        },
        body: q ? Like(`%${q}%`) : null,
        name: q ? Like(`%${q}%`) : null,
      },
    });
  }

  findOpportunity(id: number): Promise<Opportunity> {
    console.log(id);
    return this.opportunityRepository.findOne({
      relations: {
        category: true,
        location: true,
        tags: true,
      },
      where: {
        id: id,
      },
    });
  }

  async createOpportunity(
    createOpportunityDto: CreateOpportunityDto,
  ): Promise<Opportunity> {
    const opportunity: Opportunity = new Opportunity();

    opportunity.name = createOpportunityDto.name;
    opportunity.image = createOpportunityDto.image;
    opportunity.body = createOpportunityDto.body;
    opportunity.description = createOpportunityDto.description;

    const { category_id, location_id, tag_ids } = createOpportunityDto;

    const category = await this.categoryRepository.findOneBy({
      id: category_id,
    });

    const location = await this.locationRepository.findOneBy({
      id: location_id,
    });

    if (tag_ids) {
      const tags = await Promise.all(
        tag_ids.map(
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
