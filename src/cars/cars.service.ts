import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';

import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos/car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {id: uuid(), brand: 'Toyota', model: 'Corolla'},
        {id: uuid(), brand: 'Honda', model: 'Civic'},
        {id: uuid(), brand: 'Ford', model: 'Mustang'},
        {id: uuid(), brand: 'Chevrolet', model: 'Camaro'},
        {id: uuid(), brand: 'BMW', model: 'X5'},
        {id: uuid(), brand: 'Mercedes-Benz', model: 'C-Class'}
    ];
    
    findAllCars(){
        return this.cars;
    }

    findCarById(id: string){
        return this.cars.find(car => car.id === id);
    }

    createCar(createCarDto: CreateCarDto){
        const newCar: Car = {id: uuid(), ...createCarDto};  
        this.cars.push(newCar);
        return newCar;
    }

    updateCar(id: string, updateCarDto: UpdateCarDto){
        let carUpdate = this.findCarById(id);

        if( updateCarDto.id && id !== updateCarDto.id )
            throw new BadRequestException(`The id is not valid inside body.`)
        
        this.cars = this.cars.map(car => {
            if(car.id === id){
                carUpdate = {...car, ...updateCarDto, id};
                return carUpdate;
            }
            return car;
        });

        return carUpdate;
    }

    deleteCar(id:string){
        const car = this.findCarById(id);
        if(!car) throw new NotFoundException(`Car with id '${id}' not found.`);

        this.cars = this.cars.filter(car => car.id !== id);
        return this.cars
    }

}
