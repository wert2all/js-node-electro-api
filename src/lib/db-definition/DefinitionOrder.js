/**
 * @class DefinitionOrder
 */
export default class DefinitionOrder {
    static TYPE_DESC = 'desc';
    static TYPE_ASC = 'asc';

    /**
     *
     * @param {string} field
     * @param {string} type
     */
    constructor(field, type) {
        /**
         *
         * @type {string}
         * @private
         */
        this._field = field;
        /**
         *
         * @type {string}
         * @private
         */
        this._type = type === DefinitionOrder.TYPE_DESC
            ? DefinitionOrder.TYPE_DESC
            : DefinitionOrder.TYPE_ASC;
    }

    /**
     *
     * @return {string}
     */
    getOrderField() {
        return this._field;
    }

    /**
     *
     * @return {string}
     */
    getOrderType() {
        return this._type;
    }
}
