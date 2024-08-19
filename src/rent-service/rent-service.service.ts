import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Contact } from './schemas/contact.schema';
import { License } from './schemas/license.schma';

import { CreateRentServiceDto } from './dto/create-rent-service.dto';
import { UpdateRentServiceDto } from './dto/update-rent-service.dto';

import { CreateContactDto } from './dto/create-contact.dto';
import { CreateLicenseDto } from './dto/create-license.dto';
import { RentService } from './schemas/rentService.shema';

import { CarService } from 'src/car/car.service';

const nodemailer = require("nodemailer");

@Injectable()
export class RentServiceService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    @InjectModel(License.name) private licenseModel: Model<License>,
    @InjectModel(RentService.name) private rentServiceModel: Model<RentService>,
    private configService: ConfigService,
    private carService: CarService,
  ) {}

  async createRentServiceTransaction(carId: string, createContactDto: CreateContactDto, createLicenseDto: CreateLicenseDto, createRentServiceDto: CreateRentServiceDto): Promise<RentService> {    

    const session = await this.contactModel.db.startSession();
    session.startTransaction();
    createRentServiceDto.car = carId;
    const uniqueCode = this.generateRandomString();
    createRentServiceDto.uniqueCode = uniqueCode;
    const contactId = await this.getContactoByIdCard(createContactDto.idCard)
    try {

      if(contactId){
        createRentServiceDto.contact = contactId;
        const rentservice = await this.createRentService(createRentServiceDto, session);
        const emailData = this.buildEmailData(rentservice);
        try{
          await this.sendConfirmationEmail(emailData);
        }catch(error){
          console.error('Ocurrió un error al enviar el correo de confirmación:', error);
        }
        await session.commitTransaction();
        return rentservice
      }

      const [newContact] = await this.contactModel.create([createContactDto], { session });
      
      createLicenseDto.contact = newContact._id.toHexString();
      createRentServiceDto.contact = newContact._id.toHexString();
      
      await this.licenseModel.create([createLicenseDto], { session });
      
      
      const rentservice = await this.createRentService(createRentServiceDto, session);
      const emailData = this.buildEmailData(rentservice);
      try{
        await this.sendConfirmationEmail(emailData);
      }catch(error){
        console.error('Ocurrió un error al enviar el correo de confirmación:', error);
      }
      await session.commitTransaction();
      await this.carService.updateAvailability(carId)
      return rentservice;

    } catch (error) {
      await session.abortTransaction();
      throw new ConflictException('Error creating service', error.message);
    } finally {
      session.endSession();
    }
  }

  async createRentService(createRentServiceDto: CreateRentServiceDto, session): Promise<RentService>{
    const rentservice = await this.rentServiceModel.create([createRentServiceDto], { session });
    return rentservice[0]
  }

  async getContactoByIdCard(idCard: string): Promise<string>{
    const contact = await this.contactModel.findOne({idCard})
    return contact ? contact._id.toHexString() : null;
  }

  async findAll(): Promise<RentService[]> {
    return await this.rentServiceModel.find()
      .sort({
        creationDate: -1
      })
      .populate('contact')
      .populate('car');
  }

  async findOne(id: string) {
    const rentService = await this.rentServiceModel.findOne({_id: id})
      .populate('contact')
      .populate('car');
      
    return rentService;
  }

  async update(id: string, updateRentServiceDto: UpdateRentServiceDto) {

    const rentService = await this.findOne(id);
    if (!rentService) {
      throw new NotFoundException(`RentService with ID ${id} not found`);
    }

    const carId = (rentService.car as any)._id;
    await this.carService.updateAvailability(carId)

    await this.rentServiceModel.updateOne(
      { _id: id },
      {
        paymentStatus: 'DROP-OFF',
      },
    )
    return {message: `This action updates a #${id} rentService`};
  }

  async remove(id: string) {
    await this.rentServiceModel.deleteOne({_id: id})
    return {message: `This action removes a #${id} rentService`};
  }

  generateRandomString() {
    const randomLetters = Array.from({ length: 4 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))); 
    const randomNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0'); 
  
    return `${randomLetters.join('')}-${randomNumber}`;
  }

  private buildEmailData(rentservice: any): any {
    return {
      emailAddress: rentservice.paypal.payer.email_address,
      id: rentservice.paypal.id,
      uniqueCode: rentservice.uniqueCode,
      firstName: rentservice.paypal.payer.name.given_name,
      lastName: rentservice.paypal.payer.name.surname
    };
  }
  
  async sendConfirmationEmail(emailData: any): Promise<void> 
  {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      tls: {
        ciphers:'SSLv3'
      }
    });
  
    const mailOptions = {
      from:  this.configService.get<string>('EMAIL_USER'),
      to: emailData.emailAddress,
      subject: 'Confirmación de alquiler de automóvil',
      text: `Hola ${emailData.firstName} ${emailData.lastName},\n\n¡Gracias por elegirnos para alquilar un automóvil! Estamos emocionados de tenerte como nuestro cliente. Tu alquiler con el código ${emailData.uniqueCode} ha sido confirmado correctamente. Tu código de factura es ${emailData.id}. ¡Esperamos que tengas una experiencia increíble con tu automóvil alquilado!\n\nSaludos cordiales,\nEl equipo de Amauris Rent a Car`,
      html: `<img src="cid:logo@amaurisrentacar.com" alt="Logo de Amauris Rent a Car" style="width: 200px;"><p>Hola <b>${emailData.firstName} ${emailData.lastName}</b>,</p><p>¡Gracias por elegirnos para alquilar un automóvil! Estamos emocionados de tenerte como nuestro cliente. Tu alquiler con el código <strong>${emailData.uniqueCode}</strong> ha sido confirmado correctamente. Tu código de factura es <strong>${emailData.id}</strong>. ¡Esperamos que tengas una experiencia increíble con tu automóvil alquilado!</p><p>Saludos cordiales,<br>El equipo de <b>Amauris Rent a Car</b></p>`,
      attachments: [{
        filename: 'logo.png',
        path: 'src/assets/images/logo.png',
        cid: 'logo@amaurisrentacar.com' 
      }]
    };
   
    await transporter.sendMail(mailOptions);
  }
}
