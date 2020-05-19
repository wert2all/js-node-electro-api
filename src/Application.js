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
     */
    constructor(expressApp, routersFactory, storageProvider, dispatcher) {
        super();
        this.app = expressApp;
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(fileUpload({
            createParentPath: true
        }));
        Sentry.init({
            dsn: storageProvider.getSecretStorage().fetch('sentry:api:dsn')
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
     * @param request
     * @return {function(...[*]=)}
     * @private
     */
    _generateRun(request) {
        return (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            request
                .createResponse(req)
                .then(result => res.json(result));
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
