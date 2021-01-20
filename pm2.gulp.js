/* eslint-disable */
module.exports = {
    apps: [
        {
            name: "electro-watch",
            script: "gulp -f ./dist/_infra/prod/gulpfile.babel.js watch:images",
            watch: false,
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
            instances: "1",
            exec_mode: "cluster",
        },
    ],
};
