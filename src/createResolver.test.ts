import { describe, expect, test } from 'vitest'
import { createResolver } from './createResolver'
import { etherscanResolver } from './resolvers'

const ADDRESS = '0xADc466855ebe8d1402C5F7e6706Fccc3AEdB44a0'

describe.concurrent('Imported resolver', () => {
  test('should generate correct links with imported resolver', () => {
    const addressUrl = etherscanResolver.address('https://bscscan.com/', { address: ADDRESS })
    expect(addressUrl).toBe(`https://bscscan.com/address/${ADDRESS}`)
  })

  test('should resolve correct url for baseUrl **with** trailing slash', () => {
    const addressUrl = etherscanResolver.address('https://test.com/', { address: ADDRESS })
    expect(addressUrl).toBe(`https://test.com/address/${ADDRESS}`)
  })

  test('should resolve correct url for baseUrl **without** trailing slash', () => {
    const addressUrl = etherscanResolver.address('https://test.com', { address: ADDRESS })
    expect(addressUrl).toBe(`https://test.com/address/${ADDRESS}`)
  })
})

describe.concurrent('Custom resolver', () => {
  const resolver = createResolver({
    address: ({ address }) => `/custom-address/${address}`,
    tx: ({ hash }) => `/custom-tx/${hash}`,
    block: ({ id }) => `/custom-block/${id}`,
  })

  test('should generate correct links with custom resolver', () => {
    const addressUrl = resolver.address('https://custom-explorer.com/', { address: ADDRESS })
    expect(addressUrl).toBe(`https://custom-explorer.com/custom-address/${ADDRESS}`)
  })

  test('should resolve correct url for baseUrl **with** trailing slash', () => {
    const addressUrl = resolver.address('https://test.com/', { address: ADDRESS })
    expect(addressUrl).toBe(`https://test.com/custom-address/${ADDRESS}`)
  })

  test('should resolve correct url for baseUrl **without** trailing slash', () => {
    const addressUrl = resolver.address('https://test.com', { address: ADDRESS })
    expect(addressUrl).toBe(`https://test.com/custom-address/${ADDRESS}`)
  })

  test('should complement skipped optional fields', () => {
    const keys = Object.keys(resolver).sort()
    expect(keys).toMatchObject(['address', 'token', 'contract', 'nftToken', 'nftContract', 'tx', 'block'].sort())
  })
})

describe.concurrent('`contract` fallbacks', () => {
  test('should fallback `contract` to `address` method if not provided', () => {
    const resolver = createResolver({
      address: ({ address }) => `/custom-address/${address}`,
      tx: ({ hash }) => `/custom-tx/${hash}`,
      block: ({ id }) => `/custom-block/${id}`,
    })
    const contractUrl = resolver.contract('https://test.com/', { address: ADDRESS })
    expect(contractUrl).toBe(`https://test.com/custom-address/${ADDRESS}`)
  })
})

describe.concurrent('`nftContract` fallbacks', () => {
  test('should fallback `nftContract` to `contract` method if not provided', () => {
    const resolver = createResolver({
      address: ({ address }) => `/custom-address/${address}`,
      contract: ({ address }) => `/custom-collection/${address}`,
      tx: ({ hash }) => `/custom-tx/${hash}`,
      block: ({ id }) => `/custom-block/${id}`,
    })
    const nftContractUrl = resolver.nftContract('https://test.com/', { address: ADDRESS })
    expect(nftContractUrl).toBe(`https://test.com/custom-collection/${ADDRESS}`)
  })

  test('should fallback `nftContract` to `address` method if not provided and there\'s no `contract`', () => {
    const resolver = createResolver({
      address: ({ address }) => `/custom-address/${address}`,
      tx: ({ hash }) => `/custom-tx/${hash}`,
      block: ({ id }) => `/custom-block/${id}`,
    })
    const nftContractUrl = resolver.nftContract('https://test.com/', { address: ADDRESS })
    expect(nftContractUrl).toBe(`https://test.com/custom-address/${ADDRESS}`)
  })
})

describe.concurrent('`token` fallbacks', () => {
  test('should fallback `token` to `address` method if not provided', () => {
    const resolver = createResolver({
      address: ({ address }) => `/custom-address/${address}`,
      tx: ({ hash }) => `/custom-tx/${hash}`,
      block: ({ id }) => `/custom-block/${id}`,
    })
    const tokentUrl = resolver.token('https://test.com/', { address: ADDRESS })
    expect(tokentUrl).toBe(`https://test.com/custom-address/${ADDRESS}`)
  })
})

describe.concurrent('`nftToken` fallbacks', () => {
  test('should fallback `nftToken` to `token` method if not provided', () => {
    const resolver = createResolver({
      address: ({ address }) => `/custom-address/${address}`,
      token: ({ address }) => `/custom-token/${address}`,
      tx: ({ hash }) => `/custom-tx/${hash}`,
      block: ({ id }) => `/custom-block/${id}`,
    })
    const nftTokenUrl = resolver.nftToken('https://test.com/', { address: ADDRESS })
    expect(nftTokenUrl).toBe(`https://test.com/custom-token/${ADDRESS}`)
  })

  test('should fallback `nftToken` to `address` method if not provided and there\'s no `token`', () => {
    const resolver = createResolver({
      address: ({ address }) => `/custom-address/${address}`,
      tx: ({ hash }) => `/custom-tx/${hash}`,
      block: ({ id }) => `/custom-block/${id}`,
    })
    const nftTokenUrl = resolver.nftToken('https://test.com/', { address: ADDRESS })
    expect(nftTokenUrl).toBe(`https://test.com/custom-address/${ADDRESS}`)
  })
})
