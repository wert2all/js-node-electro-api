/**
 * @class Application
 */
export default class Application {
    /**
     *
     * @param expressApp
     * @param {RoutersInterface[]} routers
     */
    constructor(expressApp, routers) {
        this.routers = routers;
        this.app = expressApp;
    }

    run() {
        this._applyRouters();
        this._run();
    }

    _applyRouters() {
        for (const key in this.routers) {
            this.app.get(this.routers[key].getURL(), (req, res) => {
                res.setHeader('Content-Type', 'application/json');
                res.json(
                    this.routers[key]
                        .getRequest()
                        .createResponse(req)
                );
            });
        }
    }

    _run() {
        this.app.listen(3000, () => console.log('Server running on port 3000'));
    }
}
