import ServerApplicationInterface from "./server/ServerApplicationInterface";
import * as Sentry from "@sentry/node";
import StorageConfiguration from "./storage/configuration/StorageConfiguration";
import DI from "./lib/di/DI";
import LoggerInterface from "./lib/logger/LoggerInterface";
import AppLogEvent from "./extended/logger/events/AppLogEvent";

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
/**
 * @class Application
 * @extends ServerApplicationInterface
 * @type ServerApplicationInterface
 */
export default class Application extends ServerApplicationInterface {
    /**
     *
     * @param {Express} expressApp
     * @param {RoutersProviderFactory} routersFactory
     * @param {DispatchInterface} dispatcher
     * @param {ResponseFactory} responseFactory
     */
    constructor(expressApp, routersFactory, dispatcher, responseFactory) {
        super();
        this.app = expressApp;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(
            fileUpload({
                createParentPath: true,
            })
        );
        Sentry.init({
            dsn: DI.getInstance().get(StorageConfiguration).getSecretStorage().fetch("sentry:api:dsn"),
        });

        /**
         *
         * @type {RoutersProviderFactory}
         * @private
         */
        this._routersFactory = routersFactory;

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
     * @return ServerApplicationInterface
     */
    init() {
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
        const routers = this._routersFactory.create(this._dispatcher).fetch();

        for (const key in routers) {
            if (routers.hasOwnProperty(key)) {
                const route = routers[key];
                if (route.method === "get") {
                    this.app.get(routers[key].getURL(), this._generateRun(routers[key].getRequest()));
                } else {
                    this.app.post(routers[key].getURL(), this._generateRun(routers[key].getRequest()));
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
            try {
                request
                    .createResponse(req)
                    .then((responseResult) => {
                        return new Promise((done) =>
                            done(this._responseFactory.create(responseResult).send(res))
                        ).catch((e) => {
                            this._logError(e);
                            this._responseFactory.create(responseResult).sendError(e, res);
                        });
                    })
                    .catch((e) => this._logError(e));
            } catch (e) {
                this._logError(e);
            }
        };
    }

    /**
     *
     * @return {*}
     */
    getRequestListener() {
        return this.app;
    }

    _logError(error) {
        DI.getInstance().get(LoggerInterface).error(new AppLogEvent(error.message));
    }
}
