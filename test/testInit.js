import ServerConfig from '../src/server/ServerConfig';
import path from 'path';
import diInit from '../src/_init/DIInit';

export default diInit(new ServerConfig(
    path.normalize(__dirname + path.sep),
    path.normalize(__dirname + path.sep + '..' + path.sep)
));
