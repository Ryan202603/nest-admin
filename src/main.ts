import { ValidationPipe } from '@nestjs/common'
import multipart from '@fastify/multipart'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  await app.register(multipart as never)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
