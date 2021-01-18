import DI from "../../lib/di/DI";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import AbstractAdminRequest from "../../routers/request/AbstractAdminRequest";
import RequestDataFactory from "./request/RequestDataFactory";
import ErrorLogEventFactory from "./request/ErrorLogEventFactory";
import ResponseResult from "../../routers/response/ResponseResult";
import MLModelLoggingRepository from "../../db/repository/ml/MLModelLoggingRepository";
import MLLoggingEntity from "../../data/entity/ml/MLLoggingEntity";
import DefinitionOrder from "../../lib/db-definition/implementation/DefinitionOrder";
import MLModelLoggingDefinition from "../../db/definition/ml/MLModelLoggingDefinition";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";

/**
 * @class MLLogsGetRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class MLLogsGetRequest extends AbstractAdminRequest {
    /**
     *
     */
    constructor() {
        super(
            new RequestDataFactory(),
            DI.getInstance().get(StorageConfiguration),
            DI.getInstance().get(LoggerInterface),
            new ErrorLogEventFactory()
        );
        /**
         *
         * @type {MLModelLoggingRepository}
         * @private
         */
        this._mlLoggingRepository = new MLModelLoggingRepository();
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {MLLogsGetRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        /**
         *
         * @type {ReadConnectionInterface}
         */
        const readConnection = DI.getInstance().get(ReadConnectionInterface);
        super.setConnection(readConnection);
        this._mlLoggingRepository.setConnection(readConnection);

        return this;
    }

    /**
     *
     * @return {string}
     * @private
     */
    _getResponseType() {
        return ResponseResult.TYPE_JSON;
    }

    /**
     * @param {MLLogsGetDataClass} requestData
     * @param {ResponseDataClass} response
     * @return {Promise<ResponseDataClass>}
     * @protected
     */
    async _processRequest(requestData, response) {
        const logs = (await this._loadLogs(requestData)).map((entity) => entity.getData());
        response.setData("logs", logs);
        return Promise.resolve(response);
    }

    /**
     *
     * @param {MLLogsGetDataClass} requestData
     * @return {Promise<EntityInterface[]>}
     * @private
     */
    async _loadLogs(requestData) {
        const entity = new MLLoggingEntity().setEntityId(requestData.getEntityId());
        return this._mlLoggingRepository.fetchData(
            entity,
            new DefinitionOrder(MLModelLoggingDefinition.COLUMN_ID, DefinitionOrder.TYPE_DESC)
        );
    }
}
