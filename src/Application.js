const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
/**
 * @class Application
 */
export default class Application {
    /**
     *
     * @param expressApp
     * @param {RoutersProvider} routersProvider
     */
    constructor(expressApp, routersProvider) {
        this.app = expressApp;
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(fileUpload({
            createParentPath: true
        }));

        this.routersProvider = routersProvider;
    }

    run() {
        this._applyRouters();
        return this;
    }

    _applyRouters() {
        const routers = this.routersProvider.fetch();

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

    _generateRun(request) {
        return (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            request
                .createResponse(req)
                .then(result => res.json(result));
        };
    }
}
