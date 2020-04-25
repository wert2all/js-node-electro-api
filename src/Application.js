import ServerApplicationInterface from './server/ServerApplicationInterface';

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
     */
    constructor(expressApp, routersFactory, storageProvider) {
        super();
        this.app = expressApp;
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(fileUpload({
            createParentPath: true
        }));

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
    }

    /**
     * @param connection
     * @return ServerApplicationInterface
     */
    init(connection) {
        this._storageProvider.getConnection().setServer(connection);
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
        const routers = this._routersFactory.create(this._storageProvider).fetch();

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
