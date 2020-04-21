import express from 'express';

import Application from '../Application';
import RoutersProvider from '../routers/RoutersProvider';
import StorageProvider from '../storage/Provider';
import SecretStorage from '../storage/Secret';
import SQLiteConnection from '../lib/db-connection/adapter/SQLiteConnection';

export default new Application(
    express(),
    new RoutersProvider(
        new StorageProvider(
            new SecretStorage('./../../secret.json'),
            new SQLiteConnection('./../secret.sqlite')
        )
    ))
    .run()
    .app;

