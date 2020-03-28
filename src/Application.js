const bodyParser = require('body-parser');
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
        
        this.routersProvider = routersProvider;
    }

    run() {
        this._applyRouters();
        this._run();
    }

    _applyRouters() {
        const routers = this.routersProvider.fetch();

        for (const key in routers) {
            if (routers.hasOwnProperty(key)) {
                const route = routers[key];
                if (route.method === 'get') {
                    this.app.get(routers[key].getURL(), this._generateRun(routers[key].getRequest()));
                } else {
                    this.app.post(routers[key].getURL(), this._generateRun(routers[key].getRequest()));
                }
            }
        }
    }

    _run() {
        this.app.listen(3000, () => console.log('Server running on port 3000'));
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
