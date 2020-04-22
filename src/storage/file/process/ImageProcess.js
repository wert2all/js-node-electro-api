import FileProcessInterface from './FileProcessInterface';
import FileTypeImage from '../../../data/files/types/FileTypeImage';

/**
 * @class ImageProcess
 * @type FileProcessInterface
 * @extends FileProcessInterface
 */
export default class ImageProcess extends FileProcessInterface {
    /**
     * @param {FileTypeInterface} type
     * @return {boolean}
     */
    checkType(type) {
        return (FileTypeImage.TYPE === type.getType());
    }
}
