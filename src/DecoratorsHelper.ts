import {
    Inject,
    Injectable,
    Type
} from '@angular/core';

import {Reflector} from '@angular/core/src/reflection/reflection';

@Injectable()
export class DecoratorsHelper {

    constructor(@Inject(Reflector) private reflector:Reflector) {
    }

    public hasDecorator(type:Type, annotation:Type):boolean {
        return !!this.findDecorator(type, annotation);
    }

    public findDecorator(type:Type, annotation:Type):boolean {
        return this.reflector.annotations(type)
            .find((type:Type) => type instanceof annotation);
    }
}
