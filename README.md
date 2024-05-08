# Utility Types

Collection of utility types

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](https://gtw-utility-types.vercel.app/)

## Installation

```bash
# npm
npm install --save-dev @chore/utility-types
```

```bash
# yarn
yarn add -D @chore/utility-types
```

```bash
# pnpm
pnpm add -D @chore/utility-types
```

## Usage

Using `DeepGetType` as an example:

```typescript
import {DeepGetType} from '@chore/utility-types';

type DeepObject = {
  a: {
    b: {
      c: {
        d: string;
      };
    };
  };
};

type DeepType = DeepGetType<DeepObject, 'a.b.c.d'>; // string
```

## Documentation

See [documentation](https://gtw-utility-types.vercel.app/) for more details.
