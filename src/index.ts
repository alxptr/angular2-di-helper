import {DecoratorsHelper} from './DecoratorsHelper';
import {ServiceLocator} from './ServiceLocator';
export {ServiceLocator, IServiceLocator} from './ServiceLocator';
export {DecoratorsHelper} from './DecoratorsHelper';
export {Singleton} from './decorators';
export const DI_PROVIDERS:any[] = [ServiceLocator, DecoratorsHelper];
