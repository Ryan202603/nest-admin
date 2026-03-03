import { SetMetadata } from '@nestjs/common'

export const SKIP_TRANSFORM_URL = 'skipTransformUrl'
export const SkipTransformUrl = () => SetMetadata(SKIP_TRANSFORM_URL, true)
