import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';
import { Country, City } from 'country-state-city';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  findAllLocations(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async createLocation(createLocationDto: CreateLocationDto): Promise<any> {
    const location: Location = new Location();

    const countryName = createLocationDto.country.toLowerCase();

    const isCountryInList = Country.getAllCountries().find(
      (c) => c.name.toLowerCase() === countryName,
    );

    if (!isCountryInList) {
      return null;
    }

    const cityName = createLocationDto.city.toLowerCase();

    const isCityInList = City.getCitiesOfCountry(isCountryInList.isoCode).find(
      (c) => c.name.toLowerCase() === cityName,
    );

    if (!isCityInList) {
      return null;
    }

    const isLocationExist = await this.locationRepository.findOneBy({
      country: countryName,
      city: cityName,
    });

    if (isLocationExist) {
      return null;
    }

    location.country = countryName;
    location.city = cityName;
    return this.locationRepository.save(location);
  }
}
