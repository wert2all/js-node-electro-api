/**
 * @class FileProcessFactory
 */
import ImageProcess from "./process/ImageProcess";

export default class FileProcessFactory {
    /**
     *
     * @param {FileTypeInterface} type
     * @return {FileProcessInterface|boolean}
     */
    create(type) {
        if (new ImageProcess().checkType(type)) {
            return new ImageProcess();
        }
        return false;
    }
}
