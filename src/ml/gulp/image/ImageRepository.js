import IImageRepository from "./IImageRepository";
import FilesRepository from "../../../db/repository/FilesRepository";
import UserFilesEntity from "../../../data/entity/UserFilesEntity";
import ExtendedValuesRepository from "../../../db/repository/ExtendedValuesRepository";
import ExtendedValuesEntity from "../../../data/entity/ExtendedValuesEntity";
import UserFilesDefinition from "../../../db/definition/UserFilesDefinition";
import ImageManager from "./ImageManager";

export default class ImageRepository extends IImageRepository {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection) {
        super();
        this._filesRepository = new FilesRepository();
        this._extRepository = new ExtendedValuesRepository();

        this._filesRepository.setConnection(connection);
        this._extRepository.setConnection(connection);
    }

    /**
     *
     * @return {IImageManager[]}
     */
    async getImages() {
        const returnValues = [];
        const entity = new UserFilesEntity().setReady(true);
        const files = await this._filesRepository.fetchData(entity);

        for (const fileEntity of files) {
            const extEntity = new ExtendedValuesEntity();
            extEntity
                .setEntityType("file")
                .setEntityId(fileEntity.getValue(UserFilesDefinition.COLUMN_ID))
                .fillData(await this._extRepository.fetchData(extEntity));
            fileEntity.setExtensionEntity(extEntity);
            returnValues.push(new ImageManager(fileEntity));
        }
        return returnValues;
    }
}
