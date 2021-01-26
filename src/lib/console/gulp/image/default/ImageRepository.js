import ImageRepositoryInterface from "../ImageRepositoryInterface";
import FilesRepository from "../../../../../db/repository/FilesRepository";
import ExtendedValuesRepository from "../../../../../db/repository/ExtendedValuesRepository";
import ExtendedValuesEntity from "../../../../../data/entity/ExtendedValuesEntity";
import UserFilesDefinition from "../../../../../db/definition/UserFilesDefinition";
import ImageManager from "./ImageManager";

export default class ImageRepository extends ImageRepositoryInterface {
    /**
     *
     * @param {ReadConnectionInterface} readConnection
     * @param {ExtendedValuesEntityManager} em
     * @param {ImageFilterEntityFactoryInterface} entityFilterFactory
     */
    constructor(readConnection, em, entityFilterFactory) {
        super();
        /**
         *
         * @type {ImageFilterEntityFactoryInterface}
         * @private
         */
        this._entityFilterFactory = entityFilterFactory;
        /**
         *
         * @type {FilesRepository}
         * @private
         */
        this._filesRepository = new FilesRepository();
        /**
         *
         * @type {ExtendedValuesRepository}
         * @private
         */
        this._extRepository = new ExtendedValuesRepository();

        this._filesRepository.setConnection(readConnection);
        this._extRepository.setConnection(readConnection);

        /**
         *
         * @type {ExtendedValuesEntityManager}
         * @private
         */
        this._em = em;
    }

    /**
     *
     * @return {ExtendedValuesEntityManager}
     */
    getExtendedEM() {
        return this._em;
    }

    /**
     *
     * @return {ImageManagerInterface[]}
     */
    async getImages() {
        const returnValues = [];
        const entity = this._entityFilterFactory.factory();
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

    /**
     *
     * @param {string} entityId
     * @return {Promise<UserFilesEntity>}
     */
    getImage(entityId) {
        const entity = this._entityFilterFactory.factory();
        entity.setValue(UserFilesDefinition.COLUMN_ID, entityId);
        return this._filesRepository
            .fetchData(entity)
            .then((imageEntities) => {
                if (imageEntities.length === 1 && imageEntities[0] != null) {
                    return imageEntities[0];
                } else {
                    throw new Error("Image not found.");
                }
            })
            .then((imageEntity) => {
                const extEntity = new ExtendedValuesEntity();
                extEntity.setEntityType("file").setEntityId(imageEntity.getValue(UserFilesDefinition.COLUMN_ID));
                return this._extRepository
                    .fetchData(extEntity)
                    .then((extEntities) => {
                        extEntity.fillData(extEntities);
                        return extEntity;
                    })
                    .then((extEntity) => {
                        imageEntity.setExtensionEntity(extEntity);
                        return imageEntity;
                    });
            });
    }
}
