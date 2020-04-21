import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @class FilterFactoryInterface
 * @interface
 * @abstract
 */
export default class FilterFactoryInterface {
    /**
     *
     * @param {EntityInterface} entity
     * @return FilterInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    create(entity) {
        throw new ImplementationError(this, 'create');
    }
}
