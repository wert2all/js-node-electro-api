import ImageRepositoryInterface from "../ImageRepositoryInterface";
import FilesRepository from "../../../db/repository/FilesRepository";
import UserFilesEntity from "../../../data/entity/UserFilesEntity";
import ExtendedValuesRepository from "../../../db/repository/ExtendedValuesRepository";
import ExtendedValuesEntity from "../../../data/entity/ExtendedValuesEntity";
import UserFilesDefinition from "../../../db/definition/UserFilesDefinition";
import ImageManager from "./ImageManager";

export default class ImageRepository extends ImageRepositoryInterface {
    /**
     *
     * @param {ConnectionInterface} connection
     * @param {ExtendedValuesEntityManager} em
     */
    constructor(connection, em) {
        super();
        this._filesRepository = new FilesRepository();
        this._extRepository = new ExtendedValuesRepository();

        this._filesRepository.setConnection(connection);
        this._extRepository.setConnection(connection);

        /**
         *
         * @type {ExtendedValuesEntityManager}
         * @private
         */
        this._em = em;
    }

    /**
     *
     * @return {ImageManagerInterface[]}
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
            returnValues.push(new ImageManager(fileEntity, this._em));
        }
        return returnValues;
    }
}
