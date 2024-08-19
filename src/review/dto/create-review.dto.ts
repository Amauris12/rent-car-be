import { IsString } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    uniqueCode: string;
  
    @IsString()
    review: string;
}
