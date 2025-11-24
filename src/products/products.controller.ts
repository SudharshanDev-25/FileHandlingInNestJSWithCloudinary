import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('save')
  @UseInterceptors(AnyFilesInterceptor())
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.create(dto, files);
  }

  @Get('get')
  getAll() {
    return this.productService.findAll();
  }
}
