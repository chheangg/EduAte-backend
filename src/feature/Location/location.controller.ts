import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './create-location.dto';

@Controller('/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  findAllLocations() {
    return this.locationService.findAllLocations();
  }

  @Post()
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    console.log(createLocationDto);
    return this.locationService.createLocation(createLocationDto);
  }
}
