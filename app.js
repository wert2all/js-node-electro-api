import express from 'express';

import Application from './src/Application';
import RoutersProvider from './src/routers/RoutersProvider';
import StorageProvider from './src/storage/Provider';
import SecretStorage from './src/storage/Secret';

new Application(
    express(),
    new RoutersProvider(
        new StorageProvider(
            new SecretStorage('./../../secret.json')
        )
    ))
    .run();
