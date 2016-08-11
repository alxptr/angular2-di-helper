import {
    Inject,
    Injector,
    Injectable
} from '@angular/core';

import {ReflectiveInjector} from '@angular/core/src/di';

import {DecoratorsHelper} from './DecoratorsHelper';
import {SingletonMetadata} from './decorators';

export interface IServiceLocator {
    getService<TService>(ctor:{new (...Type):TService}):TService;
}

@Injectable()
export class ServiceLocator implements IServiceLocator {

    constructor(@Inject(Injector) protected injector:Injector,
                @Inject(DecoratorsHelper) protected decoratorsHelper:DecoratorsHelper) {
    }

    /**
     * @override
     */
    public getService<TService>(ctor:{new (...Type):TService}):TService {
        return this.decoratorsHelper.hasDecorator(ctor, SingletonMetadata)
            ? this.injector.get(ctor)                                               // Get a current singleton instance
            : ReflectiveInjector.resolveAndCreate([ctor], this.injector).get(ctor); // Create a new instance every time using existing dependencies.
    }
}
