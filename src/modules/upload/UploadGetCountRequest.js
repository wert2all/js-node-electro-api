import RequestInterface from "../../routers/request/RequestInterface";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import ApiKeyProvider from "../auth/key/KeyProvider";
import AuthCheck from "../auth/AuthCheck";
import AuthParams from "../auth/params/Params";
import UploadGetCountRequestDataClass from "./data/UploadGetCountRequestDataClass";
import FilesRepository from "../../db/repository/FilesRepository";
import UserEntity from "../../data/entity/UserEntity";
import UserFilesEntity from "../../data/entity/UserFilesEntity";
import DI from "../../lib/di/DI";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";

/**
 * @class UploadGetCountRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UploadGetCountRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {FilesRepository}
         * @private
         */
        this._repository = new FilesRepository();
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {UploadGetCountRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._repository.setConnection(DI.getInstance().get(ReadConnectionInterface));
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseDataClass>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            const userData = await this._fetchUserData(requestData);
            response.setData("counts", this._groupData(userData));
            response.setStatus(true);
        } catch (e) {
            console.log(e);
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(response.toHash());
    }

    /**
     *
     * @param request
     * @return {Promise<UploadGetCountRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UploadGetCountRequestDataClass.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UploadGetCountRequestDataClass} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        return await new AuthCheck(ApiKeyProvider.getDefault()).check(new AuthParams(requestData.token));
    }

    /**
     *
     * @param {UploadGetCountRequestDataClass} requestData
     * @returns {Promise<EntityInterface[]>}
     * @private
     */
    async _fetchUserData(requestData) {
        const userEntity = new UserEntity().setGoogleAccount(requestData.getGoogleAccount());
        const userFilesEntity = new UserFilesEntity().setUser(userEntity).setYearMon(requestData.getYearMon());
        return Promise.resolve(this._repository.fetchData(userFilesEntity));
    }

    /**
     *
     * @param {UserFilesEntity[]}userData
     * @returns {{meter: number, bill: number}}
     * @private
     */
    _groupData(userData) {
        const ret = {
            bill: 0,
            meter: 0,
        };
        userData.forEach((fileData) => {
            if (ret.hasOwnProperty(fileData.getValue("type"))) {
                ret[fileData.getValue("type")]++;
            }
        });
        return ret;
    }
}
