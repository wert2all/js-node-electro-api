import express from 'express';

import TariffRequest from './src/request/TariffRequest';
import Application from './src/Application';
import Route from './src/routers/Route';

new Application(express(), [new Route('/', new TariffRequest())])
    .run();
