import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { Food } from './entities/food.entity'

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto)
    return await this.foodRepository.save(food)
  }

  async findAll(query: any) {
    const pageNum = parseInt(query.query?.pageNum || query.pageNum, 10) || 1
    const pageSize = parseInt(query.query?.pageSize || query.pageSize, 10) || 10
    const name = query.query?.name || query.name || ''

    const queryBuilder = this.foodRepository.createQueryBuilder('food')

    if (name) {
      queryBuilder.where(
        "(food.name LIKE :likeName OR food.category LIKE :likeName OR :rawName LIKE CONCAT('%', food.name, '%') OR :rawName LIKE CONCAT('%', food.category, '%'))",
        {
          likeName: `%${name}%`,
          rawName: name
        }
      )
    }

    queryBuilder.skip((pageNum - 1) * pageSize)
    queryBuilder.take(pageSize)
    queryBuilder.orderBy('food.createdAt', 'DESC')

    const [data, total] = await queryBuilder.getManyAndCount()

    return {
      data,
      total,
      pageNum,
      pageSize
    }
  }

  async findRecommend(query: any) {
    const pageNum = parseInt(query.query?.pageNum || query.pageNum, 10) || 1
    const pageSize = parseInt(query.query?.pageSize || query.pageSize, 10) || 10
    const season = this.getCurrentSeason()

    const [data, total] = await this.foodRepository.findAndCount({
      where: { season },
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
      order: {
        createdAt: 'DESC'
      }
    })

    return {
      data,
      total,
      pageNum,
      pageSize
    }
  }

  async findHot(query: any) {
    const pageNum = parseInt(query.query?.pageNum || query.pageNum, 10) || 1
    const pageSize = parseInt(query.query?.pageSize || query.pageSize, 10) || 5
    const season = this.getCurrentSeason()

    const [data, total] = await this.foodRepository.findAndCount({
      where: { season },
      take: pageSize,
      skip: (pageNum - 1) * pageSize
    })

    return {
      data,
      total,
      pageNum,
      pageSize
    }
  }

  private getCurrentSeason(): string {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) {
      return '春季'
    } else if (month >= 6 && month <= 8) {
      return '夏季'
    } else if (month >= 9 && month <= 11) {
      return '秋季'
    } else {
      return '冬季'
    }
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOne({ where: { id } })
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`)
    }
    return food
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.findOne(id)
    this.foodRepository.merge(food, updateFoodDto)
    return await this.foodRepository.save(food)
  }

  async remove(id: number) {
    const food = await this.findOne(id)
    return await this.foodRepository.remove(food)
  }
}
