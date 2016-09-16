import {__core_private__ as core} from '@angular/core';

export const Singleton:(...args:any[]) => (cls:any) => any = core.makeDecorator('Singleton', {});
