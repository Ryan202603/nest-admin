import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>
  let fastifyApp: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    fastifyApp = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter())
    app = fastifyApp as unknown as INestApplication<App>
    await fastifyApp.init()
    await fastifyApp.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
  })
})
