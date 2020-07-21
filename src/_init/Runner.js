import DIFactory from './factories/DIFactory';
import SQLConnectionFactory from './factories/SQLConnectionFactory';
import ConnectionInterface from '../lib/db-connection/ConnectionInterface';

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
        const di = DIFactory.create();

        SQLConnectionFactory
            .create(di)
            .then(connection => di.get(ConnectionInterface).setServer(connection))
            .then(() => {
                this._onConnect(di);
            })
            .catch(err => console.log(err));
    }
}

