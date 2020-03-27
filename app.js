import express from 'express';

import TariffRequest from './src/request/TariffRequest';

const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(
        new TariffRequest().createResponse(req)
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
