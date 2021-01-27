/* eslint-disable */
module.exports = {
    apps: [
        {
            name: "electro",
            script: "./dist/src/runOne.js",
            watch: ["./dist/src/"],
            watch_delay: 3000,
            env_production: {
                NODE_ENV: "production",
            },
            instances: "max",
            exec_mode: "cluster",
        },
    ],
};
