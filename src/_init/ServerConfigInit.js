import ServerConfig from '../server/ServerConfig';
import path from 'path';

console.log(__dirname);
const serverConfig = new ServerConfig(
    path.normalize(__dirname + path.sep + '..' + path.sep + '..' + path.sep),
    path.normalize(
        __dirname + path.sep + '..' + path.sep + '..' + path.sep + '..' + path.sep
    )
);

export default serverConfig;

