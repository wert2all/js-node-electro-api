/* eslint-disable */
module.exports = {
    apps: [
        {
            name: "electro-consumers",
            script: "node ./dist/_infra/prod/consumers.js",
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
