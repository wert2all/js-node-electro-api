import ReaderInterface from './ReaderInterface';

/**
 * @class MergeReader
 * @extends ReaderInterface
 * @type ReaderInterface
 */
export default class MergeReader extends ReaderInterface {
    /**
     *
     * @param {ReaderInterface} defaultReader
     * @param {ReaderInterface} extendReader
     */
    constructor(defaultReader, extendReader) {
        super();
        /**
         *
         * @type {ReaderInterface}
         * @private
         */
        this._defaultReader = defaultReader;
        /**
         *
         * @type {ReaderInterface}
         * @private
         */
        this._extendReader = extendReader;
    }

    /**
     * @return {Object<string, string>}
     * TODO on error SOLID fix
     */
    read() {
        let defaultValues = {};
        let extendedValues = {};

        try {
            defaultValues = this._defaultReader.read();
            extendedValues = this._extendReader.read();
        } catch (e) {

        }
        if (defaultValues === null) {
            defaultValues = {};
        }

        return Object.assign(defaultValues, extendedValues);
    }
}
