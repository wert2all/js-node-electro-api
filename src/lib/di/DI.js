let _instance = null;
/**
 * @class DI
 */
export default class DI {
    constructor() {
        /**
         *
         * @type {Object<string, Object>}
         * @private
         */
        this._objects = {};
    }

    /**
     *
     * @param {string|function} className
     * @return {null|Object}
     */
    get(className) {
        return this._get(this._getKey(className));
    }

    /**
     *
     * @param {string|function} className
     * @param {Object} classObject
     * @return {DI}
     */
    register(className, classObject) {
        this._objects[this._getKey(className)] = classObject;
        return this;
    }

    /**
     *
     * @param {Object<string, Object>} objects
     * @return {DI}
     */
    setup(objects) {
        Object.keys(objects).forEach((className) => this.register(className, objects[className]));
        return this;
    }

    /**
     *
     * @param {string|null} key
     * @return {*}
     * @private
     */
    _get(key) {
        return this._objects.hasOwnProperty(key) ? this._objects[key] : null;
    }

    /**
     *
     * @param {string|function} className
     * @return {null|string}
     * @private
     */
    _getKey(className) {
        let key = null;
        if (typeof className == "function") {
            key = className.name;
        }
        if (typeof className === "string") {
            key = className;
        }
        if (key != null) {
            return this._modifyClassName(key);
        }
        return null;
    }

    /**
     *
     * @param {string} value
     * @return {string}
     * @private
     */
    _upperCamelCaseToSnakeCase(value) {
        return (
            value
                // first char to lower case
                .replace(/^([A-Z])/, ($1) => $1.toLowerCase())
                // following upper chars get preceded with a dash
                .replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase())
        );
    }

    /**
     *
     * @param {string} key
     * @return {string}
     * @private
     */
    _modifyClassName(key) {
        return this._upperCamelCaseToSnakeCase(key);
    }

    /**
     *
     * @return {DI}
     */
    static getInstance() {
        if (_instance == null) {
            _instance = new DI();
        }
        return _instance;
    }
}
