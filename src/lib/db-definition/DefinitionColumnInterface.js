import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class DefinitionColumnInterface
 */
export default class DefinitionColumnInterface {
    /**
     * @abstract
     * @return {string}
     */
    getColumnName() {
        throw new ImplementationError(this, 'getColumnName');
    }
}
