import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { FoodsService } from './foods.service'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Public } from '../auth/public.decorator'

@Controller('foods')
@UseGuards(JwtAuthGuard)
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto)
  }

  @Public()
  @Get()
  findAll(@Query() query: any) {
    return this.foodsService.findAll(query)
  }

  @Public()
  @Get('recommend')
  findRecommend(@Query() query: any) {
    return this.foodsService.findRecommend(query)
  }

  @Public()
  @Get('hot')
  findHot(@Query() query: any) {
    return this.foodsService.findHot(query)
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id)
  }
}
