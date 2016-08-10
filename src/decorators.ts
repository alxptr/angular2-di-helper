import {makeDecorator} from '@angular/core/src/util/decorators';

export class SingletonMetadata {
    constructor() {
    }
}

export const Singleton = makeDecorator(SingletonMetadata);
