/**
 * @interface
 * @abstract
 * @class ICropperActionInterface
 */
export default class ICropperActionInterface {
    /**
     * @abstract
     * @param {Cropper} cropper
     * @return ICropperActionInterface
     */
    // eslint-disable-next-line no-unused-vars
    setCropper(cropper) {
    }

    /**
     * @abstract
     * @return {Cropper}
     */
    getCropper() {
    }
}
