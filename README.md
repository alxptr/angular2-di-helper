# angular2-di-helper

An implementation of the dependency injection helpers at Angular2 (2.0.0 compatible).

## Installation

First you need to install the npm module:
```sh
npm install angular2-di-helper --save
```

## Use  

In general, you **don't need** configure the providers at the main application module.  

## Use case #1  

So, we should integrate the DI module at first.

```typescript
import {DIModule} from 'angular2-di-helper';

@NgModule({
    imports: [
        DIModule,
        ...
    ],
    providers: [Action],      // Put here your Action if you use the Singleton annotation
    ...
})
export class ApplicationModule {
}
```

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

Create the Action2 instance **every time as a new instance** via the factory.

```typescript
@Injectable()
export class Action2 {

    constructor(...) {
    }
}
```

```typescript
@Injectable()
export class ActionFactory {

    constructor(@Inject(ServiceLocator) private serviceLocator:IServiceLocator) {
    }

    public createAction<TAction>(ctor:{new (...type:Type<any>[]):TAction}):TAction {
        return this.serviceLocator.getService<TAction>(ctor);
    }
}
```

## Use case #2 

You must configure your providers at the main application module **only if you use the Singleton annotation** or **you have a special configuration of providers**, for example:  

```typescript
class DiClass {
    constructor() {
    }
}

class DiClass1 extends DiClass {
    constructor() {
        super();
    }

    methodOfClass1():void {
        console.log('Method is called');
    }
}

@NgModule({
    imports: [DIModule, ...],
    providers: []               // Empty providers section at the main application module!
})
export class ApplicationModule {
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
        const instance1:DiClass1 = this.serviceLocator.getService(DiClass);
        const instance2:DiClass1 = this.serviceLocator.getService(DiClass);
    
        instance1.methodOfClass1();                             // Console output: "Method is called"
        instance2.methodOfClass1();                             // Console output: "Method is called"
        console.log(instance1 === instance2);                   // Console output: "false"
    }
```

## Publish

```sh
npm run deploy
```

## License

Licensed under MIT.