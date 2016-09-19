# angular2-di-helper

An implementation of the dependency injection helpers at Angular2 (2.0.0 compatible).

## Installation

First you need to install the npm module:
```sh
npm install angular2-di-helper --save
```

## Use

In general, you **don't need** configure the providers in the main application module. You must configure your providers at the main AppModule **only if you use the Singleton annotation** 
or you have a special configuration of providers, for example:  

```typescript
class DiClass {
    constructor() {
        console.log('DiClass is instantiated');
    }
}

class DiClass1 extends DiClass {
    constructor() {
        console.log('DiClass1 is instantiated');
    }
}

@NgModule({
    imports: [DIModule, ...],
    providers: []               // Empty providers section at the main AppModule!
})
export class AppModule {
    constructor(@Inject(ServiceLocator) serviceLocator:IServiceLocator) {
        serviceLocator.configure([{     // Configures only the service locator!
            provide: DiClass,
            useClass: DiClass1
        }]);
    }
}

@Component(...)
export class AppComponent {
    constructor(@Inject(ServiceLocator) private serviceLocator:IServiceLocator) {
        this.serviceLocator.createService(DiClass);     // console output: "DiClass1 is instantiated"
        this.serviceLocator.createService(DiClass);     // console output: "DiClass1 is instantiated"
    }
```

**main.ts**

We should integrate the DI module at first.

```typescript
import {DIModule} from 'angular2-di-helper';

@NgModule({
    bootstrap: [ApplicationComponent],
    imports: [
        DIModule,
        ...
    ],
    providers: [Action],      // Put here your Action **if you use the Singleton annotation**
    ...
})
export class ApplicationModule {
}
```

**Action.ts**

Create the Action as **a singleton instance** via the factory using **@Singleton** [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html).

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

Create the Action2 instance **every time as a new instance** via the factory.

```typescript
@Injectable()
export class Action2 {

    constructor(...) {
    }
}
```

**ActionFactory.ts**

```typescript
@Injectable()
export class ActionFactory {

    constructor(@Inject(ServiceLocator) protected serviceLocator:IServiceLocator) {
    }

    public createAction<TAction>(ctor:{new (...type:Type<any>[]):TAction}):TAction {
        return this.serviceLocator.getService<TAction>(ctor);
    }
}
```

## Publish

```sh
npm run deploy
```

## License

Licensed under MIT.