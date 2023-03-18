# @wiiib/explorer-adapter

Adapter for generating urls for different web3 explorers.

![](https://repository-images.githubusercontent.com/614963887/b8f308fc-d13d-4e1a-84f7-bd09fc22e665)

### Summary

```ts
import { createAdapter } from '@wiiib/explorer-adapter'
import { blockscoutResolver, etherscanResolver } from '@wiiib/explorer-adapter/resolvers'

const explorers = createAdapter({
  etherscanBased: etherscanResolver,
  blockscout: blockscoutResolver,
})

explorers.etherscanBased.token('https://etherscan.io', { address: '0xABC..123' tokenId: 1 })
// > 'https://etherscan.io/token/0xABC..123?a=1'

explorers.etherscanBased.token('https://bscscan.com', { address: '0xABC..123' tokenId: 1 })
// > 'https://bscscan.com/token/0xABC..123?a=1'

explorers.blockscout.token('https://explorer.palm.io', { address: '0xABC..123' tokenId: 1 })
// > 'https://explorer.palm.io/token/0xABC..123/instance/1'
```

```ts
import { createAdapter, withBaseUrl } from '@wiiib/explorer-adapter'
import { epirusResolver, etherscanResolver } from '@wiiib/explorer-adapter/resolvers'

const concreteExplorers = createAdapter({
  etherscan: withBaseUrl(etherscanResolver, 'https://etherscan.io'),
  bscscan: withBaseUrl(etherscanResolver, 'https://bscscan.com'),
  palm: withBaseUrl(epirusResolver, 'https://palm.epirus.io'),
})

concreteExplorers.bscscan.tx({ hash: '0xABC...123' })
// > 'https://bscscan.com/tx/0xABC...123'

concreteExplorers.palm.tx({ hash: '0xABC...123' })
// > 'https://palm.epirus.io/transactions/0xABC...123'
```

```ts
import { createResolver } from '@wiiib/explorer-adapter'

const myCustomResolver = createResolver({
  address: ({ address }) => `/custom-address/${address}`,
  tx: ({ hash }) => `/custom-tx/${hash}`,
  block: ({ id }) => `/custom-block/${id}`,
})

myCustomResolver.token('https://test.com/' { address: '0xABC...123'})
// > 'https://test.com/custom-address/0xABC...123'

```

[See details](#usage)

[View on npm.js](https://www.npmjs.com/package/@wiiib/explorer-adapter)


### Why?

<small>
When building an NFT marketplace or any other dApp where you want to display the token data, you will probably need to add some "View on explorer" link on the token page.

But you need to construct that link based on address and type of the entity itself.
You can resolve the link in a simple utility function if you support just one chain (and one block explorer, apparently).
But what if you were to use multiple chains? The links might be different for different explorers (e.g. you look for a token on `/token/{address}?a={tokenID}` on [etherscan](https://etherscan.io) but on `/token/{address}/instance/{tokenId}` on a [blockscout](https://explorer.palm.io/) explorer).

In this case you'll probably come up with some kind of [strategy](https://refactoring.guru/design-patterns/strategy) mapping from chain ID to the corresponding utility. This feature may turn into something unpleasant very quickly, especially if you use it not statically but dynamically extracting chain ID from some page parameters in the runtime.
Not to mention copying such utilities from app to app...

Well, this package provides an easy way to manage such resolvers with an adapter for different explorers.
</small>

# Install

Install the package as a dependency with your prefered package manager:

```
pnpm i @wiiib/explorer-adapter
```

# Usage

## Resolvers

The package provides multiple pre-created resolvers for popular blockchain explorers. You can import them from `@wiiib/explorer-adapter/resolvers`:
```ts
import { etherscanResolver } from '@wiiib/explorer-adapter/resolvers'
```

> **Warning**
> To make such modules' imports work, don't forget to set `"compilerOptions.moduleResolution": "nodenext"` in your app's *tsconfig.json* and `"type": "module"` in its *package.json*. Or you can go with `commonjs` and just import resolvers from `@wiiib/explorer-adapter/dist/resolvers`

The full list of represented resolvers:

| Export | Description | Example explorers |
| - | - | - |
| `etherscanResolver` | A resolver for the Etherscan-based explorers. | https://bscscan.com/ <br> https://testnet.bscscan.com/ <br> https://polygonscan.com/ |
| `etherscanResolverNext` | A resolver for the explorers based on the new version of Etherscan. New `/nft` route for viewing tokens is supported. | https://etherscan.io/ <br> https://goerli.etherscan.io/ |
| `epirusResolver` | A resolver for the [Epirus](https://www.web3labs.com/sirato)-based explorers. | https://palm.epirus.io/ |
| `blockscoutResolver` | A resolver for the [Blockscout](https://github.com/blockscout/blockscout)-based explorers. | https://explorer.palm.io/ <br> https://blockscout.com/xdai/mainnet/ |
| `apscanResolver` | A resolver for the Apscan explorer. | https://apscan.io/ |
| `aptosResolver` | A resolver for the Aptos Explorer. | https://explorer.aptoslabs.com/ |
| `aptoscanResolver` | A resolver for the AptoScan explorer. | https://aptoscan.com/ |
| `solanaResolver` | A resolver for the Solana Explorer. | https://explorer.solana.com/ |
| `solscanResolver` | A resolver for the SolScan explorer. | https://solscan.io/ |
| `nearResolver` | A resolver for the NEAR Explorer | https://explorer.near.org/ |
| `nearblocksResolver` | A resolver for the NearBlocks explorer | https://nearblocks.io/ |

### Methods

Each of the available resolvers implements the same interface and provides following methods:

#### `address(base, options)`
Constructs the link for viewing the address page.
Options
- `base` - explorer's base URL
- `options`
  ```
  { address: string }
  ```

#### `contract(base, options)`
Constructs the link for viewing the contract page.
Options
- `base` - explorer's base URL
- `options`
  ```
  { address: string }
  ```

#### `nftContract(base, options)`
Constructs the link for viewing the NFT collection page.
Options
- `base` - explorer's base URL
- `options`
  ```
  { address: string }
  ```

#### `token(base, options)`
Constructs the link for viewing the token page (incl. non-NFT).
Options
- `base` - explorer's base URL
- `options`
  ```ts
  { address: string; tokenId?: number | `${number}` | `0x${string}` }
  ```

#### `nftToken(base, options)`
Constructs the link for viewing the NFT token page.
Options
- `base` - explorer's base URL
- `options`
  ```ts
  { address: string; tokenId?: number | `${number}` | `0x${string}` }
  ```

#### `tx(base, options)`
Constructs the link for viewing the specific transaction page.
Options
- `base` - explorer's base URL
- `options`
  ```ts
  { hash: string }
  ```

#### `block(base, options)`
Constructs the link for viewing the specific block page.
Options
- `base` - explorer's base URL
- `options`
  ```ts
  // Hash or block height
  { id: string | number }
  ```

> **Note**
>
> As you could notice, each of the resolver methods requires base URL as an argument.
> That's because there are many explorers that use the **same solution** (and resolving rules, accordingly) but have **different domains** *(e.g. BscScan and PolygonScan are both built based on Etherscan team's solution, or even Etherscan for main- and testnet have different domains)*.
>
>So, each resolver abover represents the *type* of the explorer. The solution, not just concrete site.


### Pre-set baseURL via `withBaseUrl`

If may prefer set base URL only once instead of passing it on every method's call. In this case you can use `withBaseUrl` wrapper.

This function wraps the original resolver in closure and passes provided base URL on every call of a resolver's method. Now you need to provide just the same options.

```ts
const concreteExplorerResolver = withBaseUrl(etherscanResolver, 'https://etherscan.io')

concreteExplorerResolver.token({ address: '0xABC...123', tokenId: 69 })
// > 'https://etherscan.io/token/0xABC...123?a=69'

concreteExplorerResolver.tx({ hash: '0xABC...123' })
// > 'https://etherscan.io/tx/0xABC...123
```


### Custom resolvers via `createResolver`

Of course, not all the usecases may be covered by the resolvers above. You can create your own resolver with `createResolver` utility.

```ts
import { createResolver } from '@wiiib/explorer-adapter'

const myCustomResolver = createResolver({
  address: ({ address }) => `/custom-address/${address}`,
  tx: ({ hash }) => `/custom-tx/${hash}`,
  block: ({ id }) => `/custom-block/${id}`,
})
```

In this case, your should provide the structure similar to the resolvers' [methods](#methods) as config, but with several nuances:

- Each method take just its options as argument, without base URL
- Each method should return the absolute path also **without base URL**. The base URL will be provided in the runtime (if you pass it on every method call) or via [`withBaseUrl`](#pre-set-baseurl-via-withbaseurl) wrapper.
- Besides applying base URL, `createResolver` also require you to specify only several methods and uses them as defaults for not provided ones. See config's 

`createResolver` config's fields:
| Method | Required? | Defaults |
| - | - | - |
| `address` | ✅ | - |
| `contract` | ❌ | `address` |
| `nftContract` | ❌ | `contract` ?? `address` |
| `token` | ❌ | `address` |
| `nftToken` | ❌ | `token` ?? `address` |
| `tx` | ✅ | - |
| `block` | ✅ | - |

`createResolver` returns the resolver with the same API the pre-created resolvers have.

```ts
myCustomResolver.address('https://test.com/', { address: '0xABC...123' })
// > 'https://test.com/custom-address/0xABC...123'

myCustomResolver.token('https://test.com/', { address: '0xABC...123' })
// `token` wasn't provided so the `address` method is called by default
// > 'https://test.com/custom-address/0xABC...123'
```

## Adapter

You may need to compose your resolvers into an object to access them by key (e.g. by some dynamic param from fetched token's data).

`@wiiib/explorer-adapter` provides `createAdapter` wrapper to create such structures.

```ts
import { createAdapter, withBaseUrl } from '@wiiib/explorer-adapter'
import { etherscanResolverNext } from '@wiiib/explorer-adapter/resolvers'

enum CHAINS {
  mainnet = 'ethereum',
  goerli = 'goerli',
}

const adapter = createAdapter({
  [CHAINS.mainnet]: withBaseUrl(etherscanResolverNext, 'https://etherscan.io'),
  [CHAINS.goerli]: withBaseUrl(etherscanResolverNext, 'https://goerli.etherscan.io'),
})

// ...
const getTokenExplorerUrl = (chain: CHAINS, options: { address: string; tokenId?: number }) => {
  return adapter[chain].token(options)
}
```

Obviously, it could be done with just a regular object, but the benefit of `createAdapter` is that it's typed.

```ts
// ✅ The resolvers implement the same API, everything is ok
createAdapter({
  resolver1: etherscanResolver,
  resolver2: blockscoutResolver,
})

// ✅ The resolvers still implement the same API, everything is ok
createAdapter({
  resolver1: withBaseUrl(etherscanResolver, 'https://etherscan.io'),
  resolver2: withBaseUrl(blockscoutResolver, 'https://explorer.palm.io'),
})

// ❌ Type error! The APIs are different
createAdapter({
  resolver1: etherscanResolver,
  resolver2: withBaseUrl(blockscoutResolver, 'https://explorer.palm.io'),
})
```

So, you can't pass resolvers with different APIs and the [strategy](https://refactoring.guru/design-patterns/strategy) pattern will remain unharmed.
