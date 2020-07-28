import ObserverInterface from '../../../../lib/dispatcher/ObserverInterface';
import UserFilesDefinition from '../../../../db/definition/UserFilesDefinition';
import UserDefinition from '../../../../db/definition/UserDefinition';
import EntityInterface from '../../../../lib/db-entity/EntityInterface';
import LoggerInterface from '../../../../lib/logger/LoggerInterface';
import UploadEvent from '../../logger/UploadEvent';
import DI from '../../../../lib/di/DI';

/**
 * @class FileUploadedObserver
 * @extends ObserverInterface
 * @type ObserverInterface
 */
export default class FileUploadedObserver extends ObserverInterface {
    /**
     *
     * @param {TelegramApi}telegram
     */
    constructor(telegram) {
        super();
        /**
         *
         * @type {TelegramApi}
         * @private
         */
        this._telegram = telegram;
        /**
         *
         * @type {LoggerInterface}
         * @private
         */
        this._logger = DI.getInstance().get(LoggerInterface);
    }

    /**
     *
     *  @param {EventInterface} event
     */
    notify(event) {
        return this._telegram
            .sendPhoto(this._getPhotoPath(event), this._createMessageText(event))
            .then(() => this._logger.info(new UploadEvent('Send image.')))
            .then(() => true)
            .catch((error) => this._logger.error(new UploadEvent(error.message)));
    }

    /**
     *
     * @param {EventInterface} event
     * @return {string}
     * @private
     */
    _createMessageText(event) {
        /**
         *
         * @type {UserFilesEntity}
         */
        const userFilesEntity = event.getEventData();
        /**
         *
         * @type {UserEntity}
         */
        const user = userFilesEntity.getUser();
        return `User ${user.getValue(UserDefinition.COLUMN_GOOGLE_NAME)}
        (id: ${user.getValue(UserDefinition.COLUMN_GOOGLE_ID)} )
        send a ${userFilesEntity.getValue(UserFilesDefinition.COLUMN_TYPE)} file
        (
            path: ${userFilesEntity.getValue(UserFilesDefinition.COLUMN_PATH)}
            rowId: ${userFilesEntity.getValue(EntityInterface.ROW_ID)}
        )`;
    }

    _getPhotoPath(event) {
        /**
         *
         * @type {UserFilesEntity}
         */
        const userFilesEntity = event.getEventData();
        return userFilesEntity.getValue(UserFilesDefinition.COLUMN_PATH);
    }
}
