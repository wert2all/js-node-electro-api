export default class DomScript {
    /**
     *
     * @param {Document} document
     */
    constructor(document) {
        /**
         *
         * @type {Document}
         * @private
         */
        this._document = document;
    }

    create(url) {
        const scriptElement = this._document.createElement("script");
        scriptElement.src = url;
        this._document.body.appendChild(scriptElement);
    }
}
