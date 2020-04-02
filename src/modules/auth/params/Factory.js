import AuthParams from './Params';

/**
 * @class AuthParamsFactory
 */
export default class AuthParamsFactory {
    /**
     *
     * @param request
     * @return {AuthParams}
     */
    create(request) {
        return new AuthParams(Buffer.from(request.body.token, 'base64'));
    }
}
