// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: any = null

export async function getPayloadClient(): Promise<any> {
  if (cached) return cached
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require('../payload.config').default
    const { getPayload } = require('payload')
    cached = await getPayload({ config })
    return cached
  } catch {
    return null
  }
}
