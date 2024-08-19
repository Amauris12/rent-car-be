import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Model } from 'mongoose';
import { SearchByLicenseCarDto } from './dto/searchByLicensePlate_car.dto';
import { Car } from 'src/car/schemas/car.schema' 

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<[string, HttpStatus]> {
    const session = await this.carModel.db.startSession();
    session.startTransaction();
    try {
      await this.carModel.create([createCarDto], { session });
      await session.commitTransaction();
      return ['Carro creado con éxito!', HttpStatus.OK];
    } catch (error) {
      await session.abortTransaction();
      throw new ConflictException('El carro con el número de placa ya existe o entra en conflicto con la operación.');
    } finally {
      session.endSession();
    }
  }

  async findAll(query: SearchByLicenseCarDto): Promise<Car[]> {
    const queryCreated = Object.keys(query).reduce( (acc, q) => {
      if(typeof q === 'string') {
        acc[q] = new RegExp(query[q], 'i')
      }
      else {
        acc[q] = query[q]
      }

      return acc
    }, {})
    return await this.carModel.find({
      ...queryCreated
    });
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<[string, HttpStatus]> {
    const car =await this.carModel.findOne({ _id : id })
    if(!car) throw new NotFoundException(`Carro no encontrado`);

    //set: es para actualizar campos especificos
    await this.carModel.updateOne({_id : id}, { $set: updateCarDto })
    return ['Actualización realizada correctamente!',  HttpStatus.OK]

  }

  async remove(id: string): Promise<[string, HttpStatus]> {
    const uno = await this.carModel.deleteOne({_id : id})
    return ['Car successfully Delete!',  HttpStatus.OK]
  }

  async updateAvailability(id: string): Promise<void> {
    const car = await this.carModel.findOne({ _id: id });
    if (!car) throw new NotFoundException(`Carro no encontrado`);
    const newAvailability = !car.availability;
    await this.carModel.updateOne({ _id: id }, { $set: { availability: newAvailability } });
  }
}
