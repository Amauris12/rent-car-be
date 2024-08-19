import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentService } from 'src/rent-service/schemas/rentService.shema';
import { Contact } from 'src/rent-service/schemas/contact.schema';
import { Review } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(RentService.name) private rentServiceModel: Model<RentService>,
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async create({uniqueCode, review}: CreateReviewDto) {
    const service = await this.rentServiceModel.findOne({ uniqueCode }).populate('contact')

    if (!service) return 'Service not found';
    
    const contact = await this.contactModel.findById(service.contact)
    
    const newReview = {
      rentService: service._id,
      name: contact.name,
      review
    }

    await this.reviewModel.create(newReview)
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(id: string, {review}: UpdateReviewDto) {
    await this.reviewModel.updateOne({_id: id}, {review});
  }

  async remove(id: string) {
    await this.reviewModel.deleteOne({_id: id})
  }
}
