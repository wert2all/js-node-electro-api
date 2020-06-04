import ServerApplicationInterface from './server/ServerApplicationInterface';
import * as Sentry from '@sentry/node';

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
/**
 * @class Application
 */
export default class Application extends ServerApplicationInterface {
    /**
     *
     * @param expressApp
     * @param {RoutersProviderFactory} routersFactory
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @param {ResponseFactory} responseFactory
     */
    constructor(expressApp,
                routersFactory,
                storageProvider,
                dispatcher,
                responseFactory
    ) {
        super();
        this.app = expressApp;
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(fileUpload({
            createParentPath: true
        }));
        Sentry.init({
            dsn: storageProvider
                .getConfiguration()
                .getSecretStorage()
                .fetch('sentry:api:dsn')
        });

        /**
         *
         * @type {RoutersProviderFactory}
         * @private
         */
        this._routersFactory = routersFactory;
        /**
         *
         * @type {StorageProvider}
         * @private
         */
        this._storageProvider = storageProvider;

        /**
         *
         * @type {DispatchInterface}
         * @private
         */
        this._dispatcher = dispatcher;
        /**
         *
         * @type {ResponseFactory}
         * @private
         */
        this._responseFactory = responseFactory;
    }

    /**
     * @param connection
     * @return ServerApplicationInterface
     */
    init(connection) {
        this._storageProvider
            .getConnection()
            .setServer(connection);
        return this;
    }

    /**
     * @return ServerApplicationInterface
     */
    run() {
        this._applyRouters();
        return this;
    }

    /**
     *
     * @private
     */
    _applyRouters() {
        const routers = this._routersFactory
            .create(this._storageProvider, this._dispatcher)
            .fetch();

        for (const key in routers) {
            if (routers.hasOwnProperty(key)) {
                const route = routers[key];
                if (route.method === 'get') {
                    this.app.get(
                        routers[key].getURL(),
                        this._generateRun(routers[key].getRequest())
                    );
                } else {
                    this.app.post(
                        routers[key].getURL(),
                        this._generateRun(routers[key].getRequest())
                    );
                }
            }
        }
    }

    /**
     *
     * @param {RequestInterface} request
     * @return {function(...[*]=)}
     * @private
     */
    _generateRun(request) {
        return (req, res) => {
            request
                .createResponse(req)
                .then(result =>
                    this._responseFactory
                        .create(result)
                        .send(res)
                );
        };
    }

    /**
     *
     * @return {*}
     */
    getRequestListener() {
        return this.app;
    }
}
