import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Obtener todos los productos disponibles' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener información de un producto por ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.productsService.findOne(+id);
    if (!response) {
      throw new NotFoundException('No product found with the provided ID');
    }
    return response;
  }

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}
