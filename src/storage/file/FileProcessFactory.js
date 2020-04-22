/**
 * @class FileProcessFactory
 */
import ImplementationError from '../../lib/implementation-error/ImplementationError';

export default class FileProcessFactory {
    /**
     *
     * @param {FileTypeInterface} type
     * @return {FileProcessInterface|boolean}
     */
    create(type) {
        throw new ImplementationError(this, 'create');
        return false;
    }
}
