import RendererInterface from "../RendererInterface";
import pug from "pug";
import DataValue from "../../data-value/DataValue";

/**
 * @class PugAdapter
 * @extends RendererInterface
 * @type RendererInterface
 */
export default class PugAdapter extends RendererInterface {
    /**
     *
     * @param {string} template
     * @param {Options} options
     */
    constructor(template, options = {}) {
        super();
        /**
         *
         * @type {DataValueInterface}
         * @private
         */
        this._values = new DataValue();
        /**
         * @type {Options}
         * @private
         */
        this._options = options;
        /**
         *
         * @type {string}
         * @private
         */
        this._template = template;
    }

    /**
     * @return RendererInterface
     */
    init() {
        return this;
    }

    /**
     *
     * @return {string}
     */
    render() {
        const fn = pug.compileFile(this._template, this._options);
        return fn(this._values.toHash());
    }

    /**
     *
     * @param  {DataValueInterface} values
     * @return RendererInterface
     */
    setValues(values) {
        this._values = values;
        return this;
    }
}
