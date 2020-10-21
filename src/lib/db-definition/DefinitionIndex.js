import DefinitionIndexInterface from "./DefinitionIndexInterface";

/**
 * @class DefinitionIndex
 * @extends DefinitionIndexInterface
 * @type DefinitionIndexInterface
 */
export default class DefinitionIndex extends DefinitionIndexInterface {
    /**
     *
     * @param {string[]} fields
     * @param {boolean} isUnique
     */
    constructor(fields, isUnique = false) {
        super();
        /**
         *
         * @type {string[]}
         * @private
         */
        this._fields = fields;
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isUnique = isUnique;
    }

    /**
     *
     * @return {{unique: boolean, fields: string[]}}
     */
    toHash() {
        return {
            fields: this._fields,
            unique: this._isUnique,
        };
    }
}
