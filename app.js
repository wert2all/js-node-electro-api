import express from 'express';

import VersionFactory from './src/VersionFactory';
import RequestParams from './src/RequestParams';
import TariffDB from './src/db/TariffDB';
import TariffRepository from './src/db/TariffRepository';

const app = express();

app.get('/', (req, res) => {
    const params = new RequestParams(req.query);
    const api = new VersionFactory(params.getVersion(), new TariffRepository(new TariffDB()))
        .create();

    res.setHeader('Content-Type', 'application/json');
    res.json(
        (req.query.hasOwnProperty('all') && req.query.all === '1')
            ? api.all()
            : api.result(params)
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
