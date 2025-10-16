# @sarcoinswap/v2-sdk

## 1.1.7

### Patch Changes

- Updated dependencies [edc65d4]
  - @sarcoinswap/swap-sdk-core@1.5.1
  - @sarcoinswap/swap-sdk-evm@1.1.7

## 1.1.6

### Patch Changes

- Updated dependencies [d6de8ef]
  - @sarcoinswap/chains@0.7.0
  - @sarcoinswap/swap-sdk-evm@1.1.6

## 1.1.5

### Patch Changes

- Updated dependencies [cd589e1]
  - @sarcoinswap/swap-sdk-core@1.5.0
  - @sarcoinswap/chains@0.6.0
  - @sarcoinswap/swap-sdk-evm@1.1.5

## 1.1.4

### Patch Changes

- Updated dependencies [979f5e0]
  - @sarcoinswap/chains@0.5.3
  - @sarcoinswap/swap-sdk-evm@1.1.4

## 1.1.3

### Patch Changes

- Updated dependencies [3de0443]
  - @sarcoinswap/chains@0.5.2
  - @sarcoinswap/swap-sdk-evm@1.1.3

## 1.1.2

### Patch Changes

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

- Updated dependencies [cb44715]
  - @sarcoinswap/swap-sdk-core@1.4.0
  - @sarcoinswap/swap-sdk-evm@1.1.2

## 1.1.1

### Patch Changes

- Updated dependencies [5f264c5]
- Updated dependencies [0436fec]
  - @sarcoinswap/chains@0.5.1
  - @sarcoinswap/swap-sdk-evm@1.1.1

## 1.1.0

### Minor Changes

- 6a6acdb: support monad testnet

### Patch Changes

- Updated dependencies [6a6acdb]
  - @sarcoinswap/chains@0.5.0
  - @sarcoinswap/swap-sdk-evm@1.1.0

## 1.0.6

### Patch Changes

- Updated dependencies [176eb10]
- Updated dependencies [176eb10]
  - @sarcoinswap/swap-sdk-core@1.3.0
  - @sarcoinswap/swap-sdk-evm@1.0.6

## 1.0.5

### Patch Changes

- Updated dependencies [f551e5e]
  - @sarcoinswap/swap-sdk-core@1.2.0
  - @sarcoinswap/swap-sdk-evm@1.0.5

## 1.0.4

### Patch Changes

- Updated dependencies [9a16780]
  - @sarcoinswap/chains@0.4.6
  - @sarcoinswap/swap-sdk-evm@1.0.4

## 1.0.3

### Patch Changes

- Updated dependencies [b9c91d1]
  - @sarcoinswap/chains@0.4.5
  - @sarcoinswap/swap-sdk-evm@1.0.3

## 1.0.2

### Patch Changes

- edc3f30: Upgrade viem and wagmi
- Updated dependencies [edc3f30]
  - @sarcoinswap/swap-sdk-evm@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [edf4640]
  - @sarcoinswap/chains@0.4.4
  - @sarcoinswap/swap-sdk-evm@1.0.1

## 1.0.0

### Major Changes

- e99c216: Introduce v2-sdk and swap-sdk-evm

### Patch Changes

- Updated dependencies [e99c216]
  - @sarcoinswap/swap-sdk-evm@1.0.0
