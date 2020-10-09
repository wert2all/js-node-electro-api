import ServerConfig from "../../server/ServerConfig";
import path from "path";

/**
 * @class ServerConfigFactory
 */
export default class ServerConfigFactory {
    /**
     *
     * @return {ServerConfig}
     */
    static create() {
        return new ServerConfig(
            path.normalize(__dirname + path.sep + ".." + path.sep + ".." + path.sep + ".." + path.sep),
            path.normalize(
                // eslint-disable-next-line max-len
                __dirname + path.sep + ".." + path.sep + ".." + path.sep + ".." + path.sep + ".." + path.sep
            ),
            "logs" + path.sep
        );
    }
}
