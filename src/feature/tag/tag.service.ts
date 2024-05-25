import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAllTags(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async createTag(createTagDto: CreateTagDto): Promise<any> {
    const isTagExist = await this.tagRepository.findOneBy({
      name: createTagDto.name.toLowerCase(),
    });

    if (isTagExist) {
      return null;
    }

    const tag: Tag = new Tag();
    tag.name = createTagDto.name.toLowerCase();
    return this.tagRepository.save(tag);
  }
}
