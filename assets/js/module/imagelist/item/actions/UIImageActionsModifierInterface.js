/**
 * @class UIImageActionsModifierInterface
 * @interface
 * @abstract
 */
export default class UIImageActionsModifierInterface {
    /**
     * @abstract
     * @param {ParentNode} node
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     */
    // eslint-disable-next-line no-unused-vars
    applyData(node, imageData, elementList = null) {}
}
