import Application from '../../Application';
import RoutersProviderFactory from '../../routers/RoutersProviderFactory';
import RouteDefinition from '../../routers/RouteDefinition';
import TariffRequest from '../../modules/tariff/TariffRequest';
import AuthRequest from '../../modules/auth/AuthRequest';
import UploadGetCountRequest from '../../modules/upload/UploadGetCountRequest';
import UploadPostRequest from '../../modules/upload/UploadPostRequest';
import UserProfileGetRequest from '../../modules/user/UserProfileGetRequest';
import UserProfileUpdatePostRequest from '../../modules/user/UserProfileUpdatePostRequest';
import UploadGetFilesRequest from '../../modules/upload/UploadGetFilesRequest';
import ImagesGetRequest from '../../modules/images/ImagesGetRequest';
import UIRequest from '../../modules/ui/UIRequest';
import DispatchInterface from '../../lib/dispatcher/DispatchInterface';
import ResponseFactory from '../../routers/response/ResponseFactory';
import DI from '../../lib/di/DI';
import ImagesDeleteRequest from '../../modules/images/ImagesDeleteRequest';

export default class ApplicationFactory {
    constructor() {

        /**
         *
         * @type {Express}
         * @private
         */
        this._expressInstance = DI.getInstance().get('Express');
    }

    /**
     *
     * @param {DI} di
     * @return {Application}
     */
    create(di) {
        return new Application(
            this._expressInstance,
            new RoutersProviderFactory(
                [
                    new RouteDefinition('/', 'get', new TariffRequest()),
                    new RouteDefinition('/auth/', 'post', new AuthRequest()),
                    new RouteDefinition(
                        '/upload/count/',
                        'get',
                        new UploadGetCountRequest()
                    ),
                    new RouteDefinition('/upload/',
                        'post',
                        new UploadPostRequest()
                    ),
                    new RouteDefinition('/user/profile/',
                        'get',
                        new UserProfileGetRequest()
                    ),
                    new RouteDefinition('/user/profile/update/',
                        'post',
                        new UserProfileUpdatePostRequest()
                    ),
                    new RouteDefinition('/upload/files/',
                        'get',
                        new UploadGetFilesRequest()
                    ),
                    new RouteDefinition('/imagelist/get/',
                        'get',
                        new ImagesGetRequest()
                    ),
                    new RouteDefinition('/imagelist/delete/',
                        'post',
                        new ImagesDeleteRequest()
                    ),
                    new RouteDefinition('/ui/',
                        'get',
                        new UIRequest()
                    ),
                ]),
            di.get(DispatchInterface),
            new ResponseFactory()
        );
    }
}
