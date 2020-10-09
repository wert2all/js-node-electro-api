import RequestInterface from "../../routers/request/RequestInterface";
import AuthParamsFactory from "./params/Factory";
import ApiKeyProvider from "./key/KeyProvider";
import AuthCheck from "./AuthCheck";
import ResponseResult from "../../routers/response/ResponseResult";
import DataValue from "../../lib/data-value/DataValue";

/**
 * @class AuthRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class AuthRequest extends RequestInterface {
    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    createResponse(request) {
        return new Promise((result) => {
            const ret = {
                status: true,
                error: "",
                token: "",
            };
            try {
                this._checkRequestMethod(request);
                const params = new AuthParamsFactory().create(request);
                new AuthCheck(ApiKeyProvider.getDefault())
                    .check(params)
                    .then((res) => {
                        ret.token = res.getGoogleUserId();
                        result(new ResponseResult(ResponseResult.TYPE_JSON, DataValue.create(ret)));
                    })
                    .catch((e) => {
                        ret.status = false;
                        ret.error = e.message;
                        result(new ResponseResult(ResponseResult.TYPE_JSON, DataValue.create(ret)));
                    });
            } catch (e) {
                ret.status = false;
                ret.error = e.message;
                result(new ResponseResult(ResponseResult.TYPE_JSON, DataValue.create(ret)));
            }
        });
    }

    /**
     *
     * @param request
     * @private
     */
    _checkRequestMethod(request) {
        if (request.method !== "POST") {
            throw new Error("Bad request");
        }
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return RequestInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        return this;
    }
}
