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
            const buff = new Buffer(request.body.token, 'base64');
            return new AuthParams(buff.toString('ascii'));
        }
        throw new Error('Bad request: token');
    }
}
