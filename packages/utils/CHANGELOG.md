# @sarcoinswap/utils

## 8.0.1

### Patch Changes

- Updated dependencies [d6de8ef]
  - @sarcoinswap/chains@0.7.0

## 8.0.0

### Patch Changes

- Updated dependencies [cd589e1]
- Updated dependencies [f71ce8b]
- Updated dependencies [a070948]
  - @sarcoinswap/chains@0.6.0
  - @sarcoinswap/localization@6.2.0

## 7.0.1

### Patch Changes

- Updated dependencies [979f5e0]
  - @sarcoinswap/chains@0.5.3

## 7.0.0

### Patch Changes

- Updated dependencies [ea1da46]
  - @sarcoinswap/localization@6.1.0

## 6.1.5

### Patch Changes

- 0bc1b53: Remove lodash deps for @sarcoinswap/farms to support edge api env.
- Updated dependencies [b6d0d74]
- Updated dependencies [e4bbcc7]
  - @sarcoinswap/localization@6.0.4

## 6.1.4

### Patch Changes

- 7270ffa: Remove deps of some lodash functions to support Lambda env.

## 6.1.3

### Patch Changes

- 87f089f: Bump version for update deps in @sarcoinswap/utils

## 6.1.2

### Patch Changes

- 1718057: Perf. improvement of router. Using online tvl for filter pools.

## 6.1.1

### Patch Changes

- Updated dependencies [3de0443]
  - @sarcoinswap/chains@0.5.2

## 6.1.0

### Minor Changes

- cb44715: [Major Updates]
  **@sarcoinswap/routing-sdk-addon-infinity**
  **@sarcoinswap/routing-sdk-addon-quoter**
  **@sarcoinswap/infinity-sdk**

  3 packages added for support infinity(CL & Bin) pools and dynamic hooks path finding and liquidity management.

  [Minor Updates]
  **@sarcoinswap/universal-router-sdk**: This update implements Infinity CL/BIN route planning, merges and restructures code for stable, V2, V3, and Infinity pools, refactors commands into a RoutePlanner, and removes legacy ABIs. It adds new decode logic for universal calldata, reorganizes input token permits, and updates addresses in constants, improving flexibility and reducing complexity.

  **@sarcoinswap/widgets-internal** : Add Infinity modules, "PriceRangeChartWithPeriodAndLiquidity," new "ProtocolMenu," "PoolTypeFilter," and "Tips," and remove "PoolTagFilter," "PoolTypeMenu." We update "FeatureStack" (folding/info icons), "FeeTierTooltip," "NetworkFilter," "TokenFilter," "TokenOverview," and ROI logic. We also revise Infinity liquidity features with new chart components and hooks.

  **@sarcoinswap/swap-sdk-core**: Reduce rounding errors and improve quote accuracy, with refined type definitions ensuring a smoother developer experience.

  **@sarcoinswap/smart-router**: Refactored some references to Infinity and introduced InfinityRouter with Infinity CL and BIN pools. Removed V4 code, updated on-chain quote providers, route encoders, logging, and aggregator logic. Enhanced route handling performance and ensured compatibility with Infinity SDK for improved quoting.

  **@sarcoinswap/routing-sdk**: Add Infinity CL and Bin pool support to the routing SDK. Introduce new constants, math utilities, and route encoding for Infinity mixed routes. Integrate Infinity quoter logic, including bin and CL quote calls, gas cost estimation, and logging improvements for better debugging.

  **@sarcoinswap/farms**: Added InfinityBIN and InfinityCLAMM protocols, introduced BSC testnet support, updated fetch logic to handle zeroAddress with Native tokens, and included new V4 farm format in utilities. Also updated test exports, chain arrays, and support lists to incorporate these changes and ensure robust universal farm configuration.

  **@sarcoinswap/uikit**
  '@sarcoinswap/utils': Added forwardRef support to Breadcrumbs, new Button variant "textPrimary60," a noButtonMargin prop in ButtonMenu, children rendering in CopyButton, itemKey in DropdownMenu, new icons (CurveGraph, CurvedChart, HookFeature, SpotGraph), updated color tokens and styles, refined useModal logic.

  [Patch Updates]

  Added support for infinity by introducing internal types and updating unit tests to improve code maintainability and logging accuracy.

## 6.0.11

### Patch Changes

- Updated dependencies [5f264c5]
- Updated dependencies [0436fec]
  - @sarcoinswap/chains@0.5.1

## 6.0.10

### Patch Changes

- Updated dependencies [6a6acdb]
  - @sarcoinswap/chains@0.5.0

## 6.0.9

### Patch Changes

- Updated dependencies [9a16780]
  - @sarcoinswap/chains@0.4.6

## 6.0.8

### Patch Changes

- Updated dependencies [b9c91d1]
  - @sarcoinswap/chains@0.4.5

## 6.0.7

### Patch Changes

- edc3f30: Upgrade viem and wagmi

## 6.0.6

### Patch Changes

- Updated dependencies [edf4640]
  - @sarcoinswap/chains@0.4.4

## 6.0.5

### Patch Changes

- Updated dependencies [0f4281c]
- Updated dependencies [63a63d8]
  - @sarcoinswap/chains@0.4.3

## 6.0.4

### Patch Changes

- 72c834c: Upgrade viem and wagmi v2
- Updated dependencies [72c834c]
- Updated dependencies [d4283e5]
  - @sarcoinswap/chains@0.4.2

## 6.0.3

### Patch Changes

- @sarcoinswap/localization@6.0.3

## 6.0.2

### Patch Changes

- @sarcoinswap/localization@6.0.2

## 6.0.1

### Patch Changes

- Updated dependencies [91969f80f]
  - @sarcoinswap/chains@0.4.1
  - @sarcoinswap/localization@6.0.1

## 6.0.0

### Minor Changes

- ec7e469ca: Add support for abort control

### Patch Changes

- @sarcoinswap/localization@6.0.0

## 5.0.8

### Patch Changes

- Updated dependencies [8fcd67c85]
  - @sarcoinswap/chains@0.4.0
  - @sarcoinswap/localization@5.0.8

## 5.0.7

### Patch Changes

- Updated dependencies [f71904c26]
  - @sarcoinswap/localization@5.0.7

## 5.0.6

### Patch Changes

- d994c3335: chore: Bump up jotai
  - @sarcoinswap/localization@5.0.6

## 5.0.5

### Patch Changes

- 2d7e1b3e2: Upgraded viem
  - @sarcoinswap/localization@5.0.5

## 5.0.4

### Patch Changes

- 51b77c787: Fix utils deps: `@sarcoinswap/utils` now should not dependent on sdk and awgmi
  - @sarcoinswap/localization@5.0.4

## 5.0.3

### Patch Changes

- Updated dependencies [dd10c9457]
  - @sarcoinswap/awgmi@0.1.15
  - @sarcoinswap/localization@5.0.3
  - @sarcoinswap/token-lists@0.0.8
  - @sarcoinswap/tokens@0.4.1

## 5.0.2

### Patch Changes

- a784ca6ed: Pancake Multicall release
  - @sarcoinswap/awgmi@0.1.14
  - @sarcoinswap/localization@5.0.2
  - @sarcoinswap/token-lists@0.0.8
  - @sarcoinswap/tokens@0.4.1

## 5.0.1

### Patch Changes

- @sarcoinswap/tokens@0.4.1
- @sarcoinswap/awgmi@0.1.13
- @sarcoinswap/localization@5.0.1
- @sarcoinswap/token-lists@0.0.8

## 5.0.0

### Patch Changes

- Updated dependencies [868f4d11f]
  - @sarcoinswap/tokens@0.4.0
  - @sarcoinswap/awgmi@0.1.12
  - @sarcoinswap/localization@5.0.0
  - @sarcoinswap/token-lists@0.0.8

## 4.0.1

### Patch Changes

- Updated dependencies [d0f9b28a9]
  - @sarcoinswap/tokens@0.3.1
  - @sarcoinswap/awgmi@0.1.11
  - @sarcoinswap/localization@4.0.1
  - @sarcoinswap/token-lists@0.0.8

## 4.0.0

### Patch Changes

- Updated dependencies [5e15c611e]
  - @sarcoinswap/tokens@0.3.0
  - @sarcoinswap/awgmi@0.1.10
  - @sarcoinswap/localization@4.0.0
  - @sarcoinswap/token-lists@0.0.8

## 3.0.3

### Patch Changes

- Updated dependencies [299cf46b7]
  - @sarcoinswap/awgmi@0.1.9
  - @sarcoinswap/localization@3.0.3
  - @sarcoinswap/token-lists@0.0.8
  - @sarcoinswap/tokens@0.2.3

## 3.0.2

### Patch Changes

- Updated dependencies [e0a681bc6]
  - @sarcoinswap/tokens@0.2.2
  - @sarcoinswap/awgmi@0.1.8
  - @sarcoinswap/localization@3.0.2
  - @sarcoinswap/token-lists@0.0.8

## 3.0.1

### Patch Changes

- @sarcoinswap/tokens@0.2.1
- @sarcoinswap/awgmi@0.1.7
- @sarcoinswap/localization@3.0.1
- @sarcoinswap/token-lists@0.0.8

## 3.0.0

### Patch Changes

- Updated dependencies [77fc3406a]
  - @sarcoinswap/tokens@0.2.0
  - @sarcoinswap/awgmi@0.1.6
  - @sarcoinswap/localization@3.0.0
  - @sarcoinswap/token-lists@0.0.8

## 2.0.3

### Patch Changes

- Updated dependencies [500adb4f8]
  - @sarcoinswap/tokens@0.1.6
  - @sarcoinswap/awgmi@0.1.5
  - @sarcoinswap/localization@2.0.3
  - @sarcoinswap/token-lists@0.0.8

## 2.0.2

### Patch Changes

- @sarcoinswap/tokens@0.1.5
- @sarcoinswap/awgmi@0.1.4
- @sarcoinswap/localization@2.0.2
- @sarcoinswap/token-lists@0.0.8

## 2.0.1

### Patch Changes

- e31475e6b: chore: Bump up jotai
- Updated dependencies [e31475e6b]
  - @sarcoinswap/token-lists@0.0.8
  - @sarcoinswap/tokens@0.1.4
  - @sarcoinswap/awgmi@0.1.3
  - @sarcoinswap/localization@2.0.1

## 2.0.0

### Major Changes

- 938aa75f5: Migrate ethers to viem

### Patch Changes

- @sarcoinswap/tokens@0.1.3
- @sarcoinswap/awgmi@0.1.2
- @sarcoinswap/localization@2.0.0
- @sarcoinswap/token-lists@0.0.7

## 1.0.0

### Patch Changes

- Updated dependencies [b5dbd2921]
  - @sarcoinswap/aptos-swap-sdk@1.0.0
  - @sarcoinswap/tokens@0.1.2
  - @sarcoinswap/token-lists@0.0.7
  - @sarcoinswap/awgmi@0.1.1
  - @sarcoinswap/localization@1.0.0
