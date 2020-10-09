import FileTypeInterface from "./FileTypeInterface";

/**
 * @class FileTypeImage
 */
export default class FileTypeImage extends FileTypeInterface {
    static TYPE = "image";

    constructor(mimeType) {
        super();
        this._mimeType = mimeType;
    }

    static fabric(mimeType) {
        switch (mimeType) {
            case "image/jpeg":
                return new FileTypeImage(mimeType);
            default:
                return false;
        }
    }

    getType() {
        return FileTypeImage.TYPE;
    }
}
