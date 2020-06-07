import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @class RendererInterface
 * @abstract
 * @interface
 */
export default class RendererInterface {
    /**
     * @abstract
     * @return RendererInterface
     */
    init() {
        throw new ImplementationError(this, 'init');
    }

    /**
     *
     * @param  {DataValueInterface} values
     * @return RendererInterface
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    setValues(values) {
        throw new ImplementationError(this, 'setValues');
    }

    /**
     * @abstract
     * @return {string}
     */
    render() {
        throw new ImplementationError(this, 'render');
    }
}
