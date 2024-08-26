import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { Brand } from './entities/brand.entity';

import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    { id: uuid(), name: 'Toyota', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Honda', createdAt: 123456, updatedAt: 123456 },
    /*{ id: uuid(), name: 'Ford', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Chevrolet', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Nissan', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'BMW', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Mercedes', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Audi', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Volkswagen', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Subaru', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Lexus', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Infiniti', createdAt: 123456, updatedAt: 123456 },
    { id: uuid(), name: 'Mazda', createdAt: 123456, updatedAt: 123456 },*/
  ]

  create(createBrandDto: CreateBrandDto) {
   const {name} = createBrandDto;

   const newBrand = {
    id: uuid(),
    name: name.toLowerCase(),
    createdAt: new Date().getTime(),
   }
   this.brands.push(newBrand);

   return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const Brand = this.brands.find(brand => brand.id === id);
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandUpdated = this.brands.find(brand => brand.id === id);

    if(updateBrandDto.id && updateBrandDto.id !== id)
      throw new BadRequestException(`The id is not valid inside body.`);

    this.brands = this.brands.map(brand => {
      if(brand.id === id){
        brandUpdated = {
          ...brandUpdated,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
        }
        return brandUpdated;
      }
      return brand;
    })

    return brandUpdated;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== id);

    return this.brands;
  }
}
