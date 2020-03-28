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
                this.app.get(routers[key].getURL(), (req, res) => {
                    res.setHeader('Content-Type', 'application/json');
                    routers[key]
                        .getRequest()
                        .createResponse(req)
                        .then(result => res.json(result));
                });
            }
        }
    }

    _run() {
        this.app.listen(3000, () => console.log('Server running on port 3000'));
    }
}
