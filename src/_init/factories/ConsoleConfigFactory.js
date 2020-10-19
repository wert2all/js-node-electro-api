import ServerConfig from "../../server/ServerConfig";
import path from "path";

/**
 * @class ConsoleConfigFactory
 */
export default class ConsoleConfigFactory {
    /**
     *
     * @return {ServerConfig}
     */
    static create() {
        const __suff = process.env._SUFF ? process.env._SUFF : "..";
        return new ServerConfig(
            path.normalize(
                __dirname + path.sep + ".." + path.sep + ".." + path.sep + ".." + path.sep + "dist" + path.sep + __suff
            ) + path.sep,
            path.normalize(
                // eslint-disable-next-line max-len
                __dirname + path.sep + ".." + path.sep + ".." + path.sep + ".." + path.sep + __suff
            ) + path.sep,
            "logs" + path.sep
        );
    }
}
