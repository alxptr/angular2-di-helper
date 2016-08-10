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

**Action.ts**

Create the Action as singleton instance via the factory.

```typescript
import {Singleton} from 'angular2-di-helper';

@Singleton()
@Injectable()
export class Action {

    constructor(...) {
    }
}
```

**Action2.ts**

Create the Action2 every time as a new instance via the factory.

```typescript
@Injectable()
export class Action {

    constructor(...) {
    }
}
```

**ActionFactory.ts**

```typescript
@Injectable()
export class ActionFactory {

    constructor(@Inject(DependencyInjectionHelper) protected dependencyInjectionHelper:DependencyInjectionHelper) {
    }

    public createAction<TAction>(ctor:{new (...Type): TAction}):TAction {
        return this.dependencyInjectionHelper.getInstance<TAction>(ctor);
    }
}
```

## Publish

```sh
npm deploy
```

## License

Licensed under MIT.