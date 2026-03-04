import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { DataSource } from 'typeorm'
import { mockFoods } from '../foods/data'
import { Food } from '../foods/entities/food.entity'

async function seedFoods() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const dataSource = app.get(DataSource)
  const foodRepository = dataSource.getRepository(Food)

  console.log('开始导入食物数据...')

  let successCount = 0
  let failCount = 0

  for (const foodData of mockFoods) {
    try {
      // 检查是否存在 (假设 ID 不冲突，或者我们想保留 ID)
      // 如果 mockFoods 里的 ID 跟现有数据库冲突，save 会尝试更新（如果 ID 是主键）

      // 注意：mockFoods 里的数据可能包含 id。
      // 如果我们保留 id，TypeORM save() 会尝试 UPDATE 如果 id 存在，或者 INSERT 如果不存在。
      // 这是所谓的 "upsert" 行为（基于主键）。

      await foodRepository.save(foodData)
      console.log(`已处理食物: ${foodData.name}`)
      successCount++
    } catch (e) {
      console.error(`导入 ${foodData.name} 失败:`, e)
      failCount++
    }
  }

  console.log(`导入完成! 成功: ${successCount}, 失败: ${failCount}`)
  await app.close()
}

seedFoods()
