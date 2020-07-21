module.exports = {
    apps: [{
        name: 'electro',
        script: './dist/src/runOne.js',
        watch: true,
        env: {
            'NODE_ENV': 'development',
        },
        env_production: {
            'NODE_ENV': 'production'
        },
        instances: 'max',
        exec_mode: 'cluster'
    }]
};
