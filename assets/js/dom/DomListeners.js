/**
 * @class DomListeners
 */
export default class DomListeners {
    /**
     *
     * @param {Node} element
     * @return {Node}
     */
    removeEventListeners(element) {
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        return newElement;
    }
}
