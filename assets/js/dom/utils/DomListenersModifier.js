/**
 * @class DomListenersModifier
 */
export default class DomListenersModifier {
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
