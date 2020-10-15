import RequestInterface from "../../routers/request/RequestInterface";
import DI from "../../lib/di/DI";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import ConnectionInterface from "../../lib/db-connection/ConnectionInterface";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import AbstractAdminRequest from "../../routers/request/AbstractAdminRequest";
import RequestDataFactory from "./request/RequestDataFactory";
import ErrorLogEventFactory from "./request/ErrorLogEventFactory";
import ResponseResult from "../../routers/response/ResponseResult";

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
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {MLLogsGetRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        super.setConnection(DI.getInstance().get(ConnectionInterface));
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
        response.setData("logs", []);
        response.setData("entityId", requestData.getEntityId());
        return Promise.resolve(response);
    }
}
