/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateProductDto, files: Express.Multer.File[]) {
    let imageUrl = null;
    let audioUrl = null;
    let videoUrl = null;
    let documentUrl = null;

    for (const file of files) {
      const uploaded = await this.cloudinary.uploadStream(file);

      if (file.mimetype.startsWith('image')) imageUrl = uploaded.secure_url;
      else if (file.mimetype.startsWith('audio'))
        audioUrl = uploaded.secure_url;
      else if (file.mimetype.startsWith('video'))
        videoUrl = uploaded.secure_url;
      else documentUrl = uploaded.secure_url; // pdf/doc/xls
    }

    const product = new this.productModel({
      ...dto,
      imageUrl,
      audioUrl,
      videoUrl,
      documentUrl,
    });

    return product.save();
  }

  findAll() {
    return this.productModel.find();
  }
}
