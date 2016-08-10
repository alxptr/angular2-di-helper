# angular2-di-helper

An implementation of the helper for DI at Angular2.

## Installation

First you need to install the npm module:
```sh
npm install angular2-di-helper --save
```

## Use

**main.ts**

We should integrate the DI providers at first.

```typescript
import {DI_PROVIDERS} from 'angular2-di-helper';

export function main() {
    return bootstrap(App, [
        DI_PROVIDERS,
        ...
    ]);
}
```

## Publish

```sh
npm deploy
```

## License

Licensed under MIT.