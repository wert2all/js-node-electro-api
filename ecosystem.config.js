/* eslint-disable */
module.exports = {
    apps: [
        {
            name: "electro",
            script: "./dist/src/runOne.js",
            watch: ["./dist"],
            env: {
                NODE_ENV: "development",
            },
            ignore_watch: ["logs"],
            env_production: {
                NODE_ENV: "production",
            },
            instances: "max",
            exec_mode: "cluster",
        },
    ],
};
