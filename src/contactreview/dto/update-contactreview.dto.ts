import { PartialType } from '@nestjs/mapped-types';
import { CreateContactreviewDto } from './create-contactreview.dto';

export class UpdateContactreviewDto extends PartialType(CreateContactreviewDto) {}
