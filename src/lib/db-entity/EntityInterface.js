import ImplementationError from '../implementation-error/ImplementationError';

export default class EntityInterface {
    /**
     * @abstract
     * @param {{}}value
     * @return EntityInterface
     */
    create(value) {
        throw new ImplementationError(this, 'create');
    }
}
