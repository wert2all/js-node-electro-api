import express from 'express';

export default function (serverConfig) {
    const expressInstance = express();
    // static middleware
    expressInstance.use(
        '/images',
        express.static(serverConfig.getApplicationDirectory() + 'data/files/images/')
    );
    expressInstance.use(
        '/assets',
        express.static(serverConfig.getApplicationDirectory() + 'dist/assets/')
    );
    expressInstance.use(
        '/error.html',
        express.static(serverConfig.getWebserverDirectory() + 'templates/error.html')
    );
    return expressInstance;
}
