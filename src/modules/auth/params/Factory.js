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
        if (request.body.hasOwnProperty('token')) {
            return new AuthParams(request.body.token);
        }
        throw new Error('Bad request: token');
    }
}
