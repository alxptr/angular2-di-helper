import {
    Inject,
    Injector,
    Injectable
} from '@angular/core';

import {ReflectiveInjector} from '@angular/core/src/di';

import {DecoratorsHelper} from './DecoratorsHelper';
import {SingletonMetadata} from './decorators';

@Injectable()
export class DependencyInjectionHelper {

    constructor(@Inject(Injector) protected injector:Injector,
                @Inject(DecoratorsHelper) protected decoratorsHelper:DecoratorsHelper) {
    }

    public getInstance<TInstance>(ctor:{new (...Type):TInstance}):TInstance {
        return this.decoratorsHelper.hasDecorator(ctor, SingletonMetadata)
            ? this.injector.get(ctor)                                               // Get a current singleton instance
            : ReflectiveInjector.resolveAndCreate([ctor], this.injector).get(ctor); // Create a new instance every time using existing dependencies.
    }
}
