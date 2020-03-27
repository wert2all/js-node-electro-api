import express from 'express';

import Application from './src/Application';
import RoutersProvider from './src/routers/RoutersProvider';

new Application(express(), new RoutersProvider())
    .run();
