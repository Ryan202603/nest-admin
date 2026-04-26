import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let code: number | string = status
    let message: any = 'Internal server error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      if (typeof res === 'string') {
        message = res
      } else if (res && typeof res === 'object') {
        const anyRes = res as any
        message = anyRes.message ?? anyRes.error ?? JSON.stringify(anyRes)
        code = anyRes.code ?? status
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    const httpStatus = this.getHttpStatus(status, request)

    response.status(httpStatus).json({
      message,
      code,
      data: null
    })
  }

  private getHttpStatus(status: number, request: Request) {
    if (status >= 500 || status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) {
      return status
    }

    // Keep framework-level missing-route errors as real 404s.
    if (status === HttpStatus.NOT_FOUND && !request.route) {
      return status
    }

    return HttpStatus.OK
  }
}
