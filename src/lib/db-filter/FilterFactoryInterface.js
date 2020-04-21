import ImplementationError from '../implementation-error/ImplementationError';

export default class FilterFactoryInterface {
    /**
     *
     * @param {EntityInterface} entity
     * @return FilterInterface
     * @abstract
     */
    create(entity) {
        throw new ImplementationError(this, 'create');
    }
}
