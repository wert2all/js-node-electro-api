/**
 * @class DomStyles
 */
export default class DomStyles {
    /**
     *
     * @param {HTMLElement} element
     * @param {string} style
     * @return {HTMLElement}
     */
    removeClass(element, style) {
        element.className = element.className.replace(new RegExp("/\b" + style + "\b/g"), "");
        return element;
    }

    /**
     *
     * @param {HTMLElement} element
     * @param {string} style
     * @return {HTMLElement}
     */
    addClass(element, style) {
        element.className = element.className + " " + style;
        return element;
    }
}
