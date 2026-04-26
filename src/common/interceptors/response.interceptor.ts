import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = data as any

        if (res && typeof res === 'object') {
          // 如果调用方已返回 message 或 code，优先使用并规范化输出结构
          if ('message' in res || 'code' in res) {
            return {
              message: res.message ?? 'success',
              code: res.code ?? 200,
              data: res.data === undefined ? null : res.data,
              ...( 'total' in res ? { total: res.total } : {} ),
              ...( 'pageNum' in res ? { pageNum: res.pageNum } : {} ),
              ...( 'pageSize' in res ? { pageSize: res.pageSize } : {} )
            }
          }

          // 分页格式但未包含 message/code，展开避免 data.data
          if ('data' in res && ( 'total' in res || 'pageNum' in res || 'pageSize' in res )) {
            return {
              message: 'success',
              code: 200,
              data: res.data === undefined ? null : res.data,
              total: res.total,
              pageNum: res.pageNum,
              pageSize: res.pageSize
            }
          }
        }

        return {
          message: 'success',
          code: 200,
          data: data === undefined ? null : data
        }
      })
    )
  }
}
