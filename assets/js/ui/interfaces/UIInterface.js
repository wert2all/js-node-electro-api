/**
 * @class UIInterface
 * @interface
 * @abstract
 */
export default class UIInterface {
    /**
     * @abstract
     * @return {UIAuthElementInterface}
     */
    getAuthElement() {}

    /**
     * @abstract
     * @return {UIGridElementInterface}
     */
    getGrid() {}

    /**
     * @abstract
     * @return {UIElementInterface}
     */
    getLoader() {}

    /**
     * @abstract
     * @return {UIContentElementInterface}
     */
    getContent() {}

    /**
     * @abstract
     * @return {UINotifyInterface}
     */
    getNotify() {}

    /**
     * @abstract
     * @return {UIkit}
     */
    getUIKit() {}

    /**
     * @abstract
     * @return {UIPager}
     */
    getPager() {}

    /**
     * @abstract
     * @return {void}
     */
    init() {}

    /**
     * @abstract
     * @return {void}
     */
    clean() {}
}
