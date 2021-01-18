import DIFactory from "./factories/DIFactory";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";
import TablesFactoryInterface from "../lib/db-connection/tables/TablesFactoryInterface";

export default class Runner {
    /**
     *
     * @param {function} onConnect
     */
    constructor(onConnect = Function.prototype) {
        this._onConnect = onConnect;
    }

    /**
     *
     */
    run() {
        const di = DIFactory.create(ServerConfigFactory);
        di.get(TablesFactoryInterface)
            .create()
            .then(() => this._onConnect(di))
            .catch((err) => di.get(LoggerInterface).error(new AppLogEvent(err.message)));
    }
}
