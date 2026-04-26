import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SoftwaresModule } from './softwares/softwares.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { Software } from './softwares/entities/software.entity'
import { User } from './users/entities/user.entity'
import { Role } from './roles/entities/role.entity'
import { RolesModule } from './roles/roles.module'
import { ApplicationsModule } from './applications/applications.module'
import { Application, ApprovalRecord } from './applications/entities/application.entity'
import { Food } from './foods/entities/food.entity'
import { FoodsModule } from './foods/foods.module'

import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UploadModule } from './upload/upload.module'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { TransformUrlInterceptor } from './common/interceptors/transform-url.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

// brew services start postgresql 开启本地服务器
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    UploadModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // 数据库类型
      host: 'localhost', // 数据库主机名，如果是本地就是 localhost 或 127.0.0.1
      port: 5432,
      username: 'wanti', // 你的数据库用户名
      password: '123456', // 你的数据库密码
      database: 'postgres', // 你要连接的数据库名称
      entities: [Software, User, Role, Application, ApprovalRecord, Food], // 列出所有需要 TypeORM 管理的实体类
      synchronize: true // 开发环境下可以设为 true，它会自动根据实体创建数据库表（生产环境建议设为 false）
      // 其他 TypeORM 配置选项...
      // 例如，如果你想使用连接池:
      // extra: {
      //   connectionLimit: 10,
      // },
      // logging: true, // 可以在控制台打印 SQL 查询语句
    }),
    SoftwaresModule,
    UsersModule,
    AuthModule,
    RolesModule,
    ApplicationsModule,
    FoodsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformUrlInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
