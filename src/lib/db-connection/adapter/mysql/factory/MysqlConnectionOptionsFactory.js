import { URL } from "url";
import MysqlConnectionOptions from "../data/MysqlConnectionOptions";

export default class MysqlConnectionOptionsFactory {
    /**
     *
     * @param {string} urlString
     * @return {MysqlConnectionOptions}
     */
    create(urlString) {
        const url = new URL(urlString);
        return new MysqlConnectionOptions(url.hostname, url.port, url.pathname.substr(1), url.username, url.password);
    }
}
