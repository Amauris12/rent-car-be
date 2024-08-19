import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactreviewService } from './contactreview.service';
import { CreateContactreviewDto } from './dto/create-contactreview.dto';
import { UpdateContactreviewDto } from './dto/update-contactreview.dto';
import { Contactreview } from './schemas/contactreview.schema';

@Controller('contactreview')
export class ContactreviewController {
  constructor(private readonly contactreviewService: ContactreviewService) {}

  @Post()
  async create(@Body() createContactreviewDto: CreateContactreviewDto):Promise<Contactreview> {
    return await this.contactreviewService.create(createContactreviewDto);
  }

  @Get()
  findAll() {
    return this.contactreviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactreviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactreviewDto: UpdateContactreviewDto) {
    return this.contactreviewService.update(+id, updateContactreviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactreviewService.remove(+id);
  }
}
