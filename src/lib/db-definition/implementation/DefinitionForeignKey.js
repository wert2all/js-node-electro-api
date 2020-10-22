import DefinitionForeignKeyInterface from "../keys/DefinitionForeignKeyInterface";

/**
 * @class DefinitionForeignKey
 * @extends DefinitionForeignKeyInterface
 * @type DefinitionForeignKeyInterface
 */
export default class DefinitionForeignKey extends DefinitionForeignKeyInterface {
    /**
     *
     * @param {string[]} fields
     * @param {DefinitionTableInterface} table
     * @param {string[]} mainFields
     * @param {{action: string, actionName: string}[]} actions
     */
    constructor(fields, table, mainFields, actions = []) {
        super();
        /**
         *
         * @type {string[]}
         * @private
         */
        this._mainFields = mainFields;
        /**
         *
         * @type {DefinitionTableInterface}
         * @private
         */
        this._table = table;
        /**
         *
         * @type {string[]}
         * @private
         */
        this._fields = fields;
        /**
         *
         * @type {{action: string, actionName: string}[]}
         * @private
         */
        this._actions = actions;
    }

    /**
     *
     * @return {{action: string, actionName: string}[]}
     */
    getActions() {
        return this._actions;
    }

    /**
     *
     * @return {string[]}
     */
    getFields() {
        return this._fields;
    }

    /**
     *
     * @return {string[]}
     */
    getMainFields() {
        return this._mainFields;
    }

    /**
     *
     * @return {DefinitionTableInterface}
     */
    getTable() {
        return this._table;
    }
}
