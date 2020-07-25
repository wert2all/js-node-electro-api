import UIElementInterface from './UIElementInterface';
import ImplementationError from '../../../../../src/lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class UIElementListInterface
 */
export default class UIElementListInterface extends UIElementInterface {
    /**
     * @abstract
     */
    refresh() {
        throw new ImplementationError(this, 'refresh');
    }
}
