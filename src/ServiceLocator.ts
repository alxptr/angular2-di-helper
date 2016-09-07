import {
    Inject,
    Injector,
    Injectable,
    Type
} from '@angular/core';

import {ReflectiveInjector} from '@angular/core/src/di';
import {Reflector} from '@angular/core/src/reflection/reflection';

import {SingletonMetadata} from './decorators';

@Injectable()
export class DecoratorsHelper {

    constructor(@Inject(Reflector) private reflector:Reflector) {
    }

    public hasDecorator(type:Type<any>, annotation:Type<any>):boolean {
        return !!this.findDecorator(type, annotation);
    }

    public findDecorator(type:Type<any>, annotation:Type<any>):boolean {
        return this.reflector.annotations(type)
            .find((type:Type<any>) => type instanceof annotation);
    }
}

export interface IServiceLocator {
    getService<TService>(ctor:{new (...Type):TService}):TService;
    createService<TService>(ctor:{new (...Type):TService}):TService;
}

@Injectable()
export class ServiceLocator implements IServiceLocator {

    constructor(@Inject(Injector) protected injector:Injector,
                @Inject(DecoratorsHelper) protected decoratorsHelper:DecoratorsHelper) {
    }

    /**
     * @override
     */
    public getService<TService>(ctor:{new (...type:Type<any>[]):TService}):TService {
        return this.decoratorsHelper.hasDecorator(ctor, SingletonMetadata)
            ? this.injector.get(ctor)                                               // Get a current singleton instance
            : this.createService<TService>(ctor);
    }

    /**
     * @override
     */
    public createService<TService>(ctor:{new (...Type):TService}):TService {
        return ReflectiveInjector.resolveAndCreate([ctor], this.injector).get(ctor); // Create a new instance every time using existing dependencies.
    }
}
