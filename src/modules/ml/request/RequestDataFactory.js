import RequestDataFactoryInterface from "../../../routers/request/data/RequestDataFactoryInterface";
import StringExt from "../../../lib/utils/StringExt";
import AuthNoToken from "../../auth/error/AuthNoToken";
import MLLogsGetDataClass from "../data/MLLogsGetDataClass";

/**
 * @class RequestDataFactory
 * @extends RequestDataFactoryInterface
 * @type RequestDataFactoryInterface
 */
export default class RequestDataFactory extends RequestDataFactoryInterface {
    /**
     * @param request
     * @return {RequestDataInterface}
     */
    factory(request) {
        let authToken = null;
        let returnRequest = null;
        if (request.query.token) {
            authToken = Buffer.from(new StringExt(request.query.token).replaceAll('"', ""), "base64").toString();
        }
        if (authToken !== null) {
            returnRequest = new MLLogsGetDataClass(authToken);
            if (request.query.entityid) {
                const entityId = parseInt(request.query.entityid, 10);
                returnRequest.setEntityId(entityId);
            }
        } else {
            throw new AuthNoToken();
        }

        return returnRequest;
    }
}
