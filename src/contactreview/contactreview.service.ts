import { Injectable } from '@nestjs/common';
import { CreateContactreviewDto } from './dto/create-contactreview.dto';
import { UpdateContactreviewDto } from './dto/update-contactreview.dto';
import { Contactreview } from './schemas/contactreview.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ContactreviewService {
  constructor(@InjectModel(Contactreview.name) private contactreviewModel: Model<Contactreview>) {}

  async create(createContactreviewDto: CreateContactreviewDto):Promise<Contactreview> {
    const newContactReview = await this.contactreviewModel.create(createContactreviewDto)
    return newContactReview
  }

  findAll() {
    return `This action returns all contactreview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactreview`;
  }

  update(id: number, updateContactreviewDto: UpdateContactreviewDto) {
    return `This action updates a #${id} contactreview`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactreview`;
  }
}
