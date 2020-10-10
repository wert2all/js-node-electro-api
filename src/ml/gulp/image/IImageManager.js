/**
 * @interface
 * @abstract
 * @class IImageManager
 */
export default class IImageManager {
    /**
     * @abstract
     * @return boolean
     */
    canProcess() {}

    /**
     * @abstract
     * @return IImageManager
     */
    startProcess() {}

    /**
     * @abstract
     * @return IImageManager
     */
    stopProcess() {}
}
