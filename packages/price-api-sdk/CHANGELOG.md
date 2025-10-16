# @sarcoinswap/price-api-sdk

## 11.1.1

### Patch Changes

- Updated dependencies [edc65d4]
  - @sarcoinswap/swap-sdk-core@1.5.1
  - @sarcoinswap/smart-router@7.5.4
  - @sarcoinswap/pcsx-sdk@1.0.10
  - @sarcoinswap/permit2-sdk@1.1.7

## 11.1.0

### Minor Changes

- d6de8ef: minor update

### Patch Changes

- Updated dependencies [d6de8ef]
  - @sarcoinswap/chains@0.7.0
  - @sarcoinswap/pcsx-sdk@1.0.9
  - @sarcoinswap/permit2-sdk@1.1.6
  - @sarcoinswap/smart-router@7.5.3

## 11.0.2

### Patch Changes

- @sarcoinswap/smart-router@7.5.2

## 11.0.1

### Patch Changes

- @sarcoinswap/smart-router@7.5.1

## 11.0.0

### Minor Changes

- cd589e1: support solana chain

### Patch Changes

- Updated dependencies [cd589e1]
- Updated dependencies [1f6c9ec]
  - @sarcoinswap/swap-sdk-core@1.5.0
  - @sarcoinswap/smart-router@7.5.0
  - @sarcoinswap/chains@0.6.0
  - @sarcoinswap/pcsx-sdk@1.0.8
  - @sarcoinswap/permit2-sdk@1.1.5

## 10.0.0

### Patch Changes

- Updated dependencies [979f5e0]
  - @sarcoinswap/smart-router@7.4.0
  - @sarcoinswap/chains@0.5.3
  - @sarcoinswap/pcsx-sdk@1.0.7
  - @sarcoinswap/permit2-sdk@1.1.4

## 9.0.0

### Patch Changes

- Updated dependencies [ea1da46]
  - @sarcoinswap/smart-router@7.3.0

## 8.0.5

### Patch Changes

- Updated dependencies [7270ffa]
- Updated dependencies [2f165c8]
  - @sarcoinswap/smart-router@7.2.5

## 8.0.4

### Patch Changes

- Updated dependencies [5b4135c]
  - @sarcoinswap/smart-router@7.2.4

## 8.0.3

### Patch Changes

- Updated dependencies [36fdc2a]
  - @sarcoinswap/smart-router@7.2.3

## 8.0.2

### Patch Changes

- Updated dependencies [1718057]
  - @sarcoinswap/smart-router@7.2.2

## 8.0.1

### Patch Changes

- Updated dependencies [3de0443]
  - @sarcoinswap/chains@0.5.2
  - @sarcoinswap/smart-router@7.2.1
  - @sarcoinswap/pcsx-sdk@1.0.6
  - @sarcoinswap/permit2-sdk@1.1.3

## 8.0.0

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
  - @sarcoinswap/smart-router@7.2.0
  - @sarcoinswap/pcsx-sdk@1.0.5
  - @sarcoinswap/permit2-sdk@1.1.2

## 7.0.3

### Patch Changes

- Updated dependencies [5f264c5]
- Updated dependencies [0436fec]
  - @sarcoinswap/chains@0.5.1
  - @sarcoinswap/pcsx-sdk@1.0.4
  - @sarcoinswap/permit2-sdk@1.1.1
  - @sarcoinswap/smart-router@7.1.3

## 7.0.2

### Patch Changes

- Updated dependencies [9fa225f]
  - @sarcoinswap/smart-router@7.1.2

## 7.0.1

### Patch Changes

- @sarcoinswap/smart-router@7.1.1

## 7.0.0

### Patch Changes

- Updated dependencies [6a6acdb]
  - @sarcoinswap/chains@0.5.0
  - @sarcoinswap/permit2-sdk@1.1.0
  - @sarcoinswap/smart-router@7.1.0
  - @sarcoinswap/pcsx-sdk@1.0.3

## 6.0.2

### Patch Changes

- Updated dependencies [8578d8f]
  - @sarcoinswap/smart-router@7.0.2

## 6.0.1

### Patch Changes

- Updated dependencies [4181a79]
  - @sarcoinswap/smart-router@7.0.1

## 6.0.0

### Patch Changes

- Updated dependencies [36f8955]
  - @sarcoinswap/smart-router@7.0.0
  - @sarcoinswap/permit2-sdk@1.0.12
  - @sarcoinswap/pcsx-sdk@1.0.2

## 5.0.1

### Patch Changes

- @sarcoinswap/smart-router@6.2.1

## 5.0.0

### Minor Changes

- 176eb10: Add v4 pool types
- 176eb10: Introduce v4 liquidity pools

### Patch Changes

- Updated dependencies [176eb10]
- Updated dependencies [176eb10]
- Updated dependencies [176eb10]
- Updated dependencies [176eb10]
  - @sarcoinswap/swap-sdk-core@1.3.0
  - @sarcoinswap/smart-router@6.2.0
  - @sarcoinswap/pcsx-sdk@1.0.1
  - @sarcoinswap/permit2-sdk@1.0.11

## 4.0.3

### Patch Changes

- @sarcoinswap/smart-router@6.1.6

## 4.0.2

### Patch Changes

- Updated dependencies [3e83a9c]
  - @sarcoinswap/smart-router@6.1.5

## 4.0.1

### Patch Changes

- @sarcoinswap/smart-router@6.1.4

## 4.0.0

### Patch Changes

- Updated dependencies [c227943]
  - @sarcoinswap/pcsx-sdk@1.0.0
  - @sarcoinswap/smart-router@6.1.3

## 3.0.2

### Patch Changes

- @sarcoinswap/smart-router@6.1.2

## 3.0.1

### Patch Changes

- Updated dependencies [618ad06]
  - @sarcoinswap/smart-router@6.1.1

## 3.0.0

### Patch Changes

- Updated dependencies [6418fde]
- Updated dependencies [b1d1eaf]
  - @sarcoinswap/pcsx-sdk@0.0.13
  - @sarcoinswap/smart-router@6.1.0

## 2.0.0

### Patch Changes

- Updated dependencies [f551e5e]
  - @sarcoinswap/swap-sdk-core@1.2.0
  - @sarcoinswap/pcsx-sdk@0.0.12
  - @sarcoinswap/smart-router@6.0.17
  - @sarcoinswap/permit2-sdk@1.0.10

## 1.2.18

### Patch Changes

- @sarcoinswap/smart-router@6.0.16

## 1.2.17

### Patch Changes

- @sarcoinswap/smart-router@6.0.15

## 1.2.16

### Patch Changes

- @sarcoinswap/smart-router@6.0.14

## 1.2.15

### Patch Changes

- Updated dependencies [42be6fc]
  - @sarcoinswap/pcsx-sdk@0.0.11

## 1.2.14

### Patch Changes

- Updated dependencies [9a16780]
  - @sarcoinswap/chains@0.4.6
  - @sarcoinswap/pcsx-sdk@0.0.10
  - @sarcoinswap/permit2-sdk@1.0.9
  - @sarcoinswap/smart-router@6.0.13

## 1.2.13

### Patch Changes

- Updated dependencies [b9c91d1]
  - @sarcoinswap/chains@0.4.5
  - @sarcoinswap/pcsx-sdk@0.0.9
  - @sarcoinswap/permit2-sdk@1.0.8
  - @sarcoinswap/smart-router@6.0.12

## 1.2.12

### Patch Changes

- Updated dependencies [edc3f30]
  - @sarcoinswap/smart-router@6.0.11
  - @sarcoinswap/permit2-sdk@1.0.7
  - @sarcoinswap/pcsx-sdk@0.0.8

## 1.2.11

### Patch Changes

- Updated dependencies [edf4640]
  - @sarcoinswap/chains@0.4.4
  - @sarcoinswap/pcsx-sdk@0.0.7
  - @sarcoinswap/permit2-sdk@1.0.6
  - @sarcoinswap/smart-router@6.0.10

## 1.2.10

### Patch Changes

- @sarcoinswap/smart-router@6.0.9
- @sarcoinswap/permit2-sdk@1.0.5
- @sarcoinswap/pcsx-sdk@0.0.6

## 1.2.9

### Patch Changes

- @sarcoinswap/smart-router@6.0.8

## 1.2.8

### Patch Changes

- Updated dependencies [0f4281c]
- Updated dependencies [63a63d8]
  - @sarcoinswap/chains@0.4.3
  - @sarcoinswap/pcsx-sdk@0.0.5
  - @sarcoinswap/permit2-sdk@1.0.4
  - @sarcoinswap/smart-router@6.0.7

## 1.2.7

### Patch Changes

- @sarcoinswap/smart-router@6.0.6

## 1.2.6

### Patch Changes

- c1f1288: Update tyeps

## 1.2.5

### Patch Changes

- @sarcoinswap/smart-router@6.0.5

## 1.2.4

### Patch Changes

- Updated dependencies [8c52665]
  - @sarcoinswap/pcsx-sdk@0.0.4

## 1.2.3

### Patch Changes

- @sarcoinswap/smart-router@6.0.4

## 1.2.2

### Patch Changes

- @sarcoinswap/smart-router@6.0.3

## 1.2.1

### Patch Changes

- Updated dependencies [72c834c]
- Updated dependencies [d4283e5]
  - @sarcoinswap/smart-router@6.0.2
  - @sarcoinswap/permit2-sdk@1.0.3
  - @sarcoinswap/pcsx-sdk@0.0.3
  - @sarcoinswap/chains@0.4.2

## 1.2.0

### Minor Changes

- 03bd2a9: Introduce human readable pool type parser

## 1.1.1

### Patch Changes

- Updated dependencies [b4b38b9]
  - @sarcoinswap/pcsx-sdk@0.0.2

## 1.1.0

### Minor Changes

- 94fdd2a: Add price api parsers

## 1.0.1

### Patch Changes

- 4a296c0: Typings not found with nodenext

## 1.0.0

### Major Changes

- dd5b38f: Introduce price api sdk
