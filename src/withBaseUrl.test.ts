import { describe, expect, test } from 'vitest'
import { etherscanResolver } from './resolvers'
import { withBaseUrl } from './withBaseUrl'

const ADDRESS = '0xADc466855ebe8d1402C5F7e6706Fccc3AEdB44a0'

describe.concurrent('Imported resolver', () => {
  test('should generate correct links with given base URL', () => {
    const addressUrl = withBaseUrl(etherscanResolver, 'https://bscscan.com/').address({ address: ADDRESS })
    expect(addressUrl).toBe(`https://bscscan.com/address/${ADDRESS}`)
  })

  test('should resolve correct url for baseUrl **with** trailing slash', () => {
    const addressUrl = withBaseUrl(etherscanResolver, 'https://test.com/').address({ address: ADDRESS })
    expect(addressUrl).toBe(`https://test.com/address/${ADDRESS}`)
  })

  test('should resolve correct url for baseUrl **without** trailing slash', () => {
    const addressUrl = withBaseUrl(etherscanResolver, 'https://test.com').address({ address: ADDRESS })
    expect(addressUrl).toBe(`https://test.com/address/${ADDRESS}`)
  })
})
