import { BadRequestException, Controller, Post, Req } from '@nestjs/common'
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'
import { extname, join } from 'path'
import { pipeline } from 'stream/promises'
import { FastifyRequest } from 'fastify'
import { SkipTransformUrl } from '../common/decorators/skip-transform-url.decorator'

type RequestMultipartFile = NonNullable<Awaited<ReturnType<FastifyRequest['file']>>>

@Controller('upload')
export class UploadController {
  @Post('image')
  @SkipTransformUrl()
  async uploadFile(@Req() request: FastifyRequest) {
    const file = await request.file()

    if (!file) {
      throw new BadRequestException('请选择上传文件')
    }

    const filename = this.createFilename(file)
    const uploadDir = join(process.cwd(), 'uploads', 'images')
    await mkdir(uploadDir, { recursive: true })
    await pipeline(file.file, createWriteStream(join(uploadDir, filename)))

    return {
      data: `/uploads/images/${filename}`
    }
  }

  private createFilename(file: RequestMultipartFile) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('')

    return `${randomName}${extname(file.filename)}`
  }
}
