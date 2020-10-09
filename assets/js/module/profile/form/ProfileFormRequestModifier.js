import DomFormRequestModifierInterface from "../../../dom/form/DomFormRequestModifierInterface";

/**
 * @class ProfileFormRequestModifier
 * @extends DomFormRequestModifierInterface
 * @type DomFormRequestModifierInterface
 */
export default class ProfileFormRequestModifier extends DomFormRequestModifierInterface {
    /**
     *
     * @param {Object<string,Object<string,string>|string>} map
     */
    constructor(map) {
        super();
        /**
         *
         * @type {Object<string,Object<string,string>|string>}
         * @private
         */
        this._map = map;
    }

    /**
     * @param {FormData} formData
     * @return {Object<string, string>}
     */
    modify(formData) {
        const returnValue = {};
        Object.keys(this._map).forEach((rootKey) => {
            if (typeof this._map[rootKey] == "string") {
                returnValue[rootKey] = formData.get(this._map[rootKey]);
            } else {
                returnValue[rootKey] = {};
                Object.keys(this._map[rootKey]).forEach(
                    (key) => (returnValue[rootKey][key] = formData.get(this._map[rootKey][key]))
                );
            }
        });
        return returnValue;
    }
}
