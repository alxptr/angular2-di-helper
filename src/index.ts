import {ServiceLocator, DecoratorsHelper} from './ServiceLocator';
export {ServiceLocator, IServiceLocator, DecoratorsHelper} from './ServiceLocator';
export {Singleton} from './decorators';
export const DI_PROVIDERS:any[] = [ServiceLocator, DecoratorsHelper];
export {DIModule} from './DIModule';
