import {
    Inject,
    Injector,
    Injectable,
    Type,
    Provider, 
    ValueProvider
} from '@angular/core';

import {ReflectiveInjector} from '@angular/core';
import {__core_private__ as core} from '@angular/core';

import {Singleton} from './decorators';

export interface IReflector {
    annotations(type:Type<any>):Array<Type<any>>;
}

@Injectable()
export class DecoratorsHelper {

    constructor(@Inject(core.Reflector) private reflector:IReflector) {
    }

    public hasDecorator(type:Type<any>, annotation:(...args:any[]) => (cls:any) => any):boolean {
        return !!this.findDecorator(type, annotation);
    }

    public findDecorator(type:Type<any>, annotation:(...args:any[]) => (cls:any) => any):boolean {
        return !!this.reflector.annotations(type)
            .find((type:Type<any>) => type instanceof annotation);
    }
}

export interface IServiceLocator {
    getService<TService>(ctor:{new (...Type):TService}):TService;
    createService<TService>(ctor:{new (...Type):TService}):TService;
}

@Injectable()
export class ServiceLocator implements IServiceLocator {

    private providers:Provider[];

    constructor(@Inject(Injector) protected injector:Injector,
                @Inject(DecoratorsHelper) protected decoratorsHelper:DecoratorsHelper) {
    }

    /**
     * @override
     */
    public configure(providers:Provider[]) {
        this.providers = providers;
    }

    /**
     * @override
     */
    public getService<TService>(ctor:{new (...type:Type<any>[]):TService}):TService {
        return this.decoratorsHelper.hasDecorator(ctor, Singleton)
            ? this.injector.get(ctor)                                               // Get a current singleton instance
            : this.createService<TService>(ctor);
    }

    /**
     * @override
     */
    public createService<TService>(ctor:{new (...type:Type<any>[]):TService}):TService {
        let ctorProviders:Provider[] = [];

        if (Array.isArray(this.providers)) {
            ctorProviders = ctorProviders.concat(this.providers);

            if (this.providers.find((provider:Provider)=> (provider === ctor) || (provider as ValueProvider).provide === ctor)) {
                // User has defined custom provider for this class, therefore, we do not put input class as provider
            } else {
                ctorProviders.push(ctor);
            }
        } else {
            ctorProviders.push(ctor);
        }
        return ReflectiveInjector.resolveAndCreate(ctorProviders, this.injector).get(ctor); // Create a new instance every time using existing dependencies.
    }
}
