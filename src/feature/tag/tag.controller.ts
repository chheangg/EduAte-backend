import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './create-tag.dto';

@Controller('/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAllTags() {
    return this.tagService.findAllTags();
  }

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }
}
