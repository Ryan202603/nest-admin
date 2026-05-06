import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SKIP_TRANSFORM_URL } from '../decorators/skip-transform-url.decorator'

@Injectable()
export class TransformUrlInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skip = this.reflector.get<boolean>(SKIP_TRANSFORM_URL, context.getHandler())
    if (skip) {
      return next.handle()
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const baseUrl = `${request.protocol}://${request.headers.host}`

    return next.handle().pipe(map(data => this.transformUrls(data, baseUrl)))
  }

  private transformUrls(data: any, baseUrl: string): any {
    if (typeof data === 'string' && data.startsWith('/uploads/')) {
      return `${baseUrl}${data}`
    }

    if (Array.isArray(data)) {
      return data.map(item => this.transformUrls(item, baseUrl))
    }

    if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
      const result = { ...data }
      for (const key of Object.keys(result)) {
        result[key] = this.transformUrls(result[key], baseUrl)
      }
      return result
    }

    return data
  }
}
