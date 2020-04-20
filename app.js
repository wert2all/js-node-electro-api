import express from 'express';

import Application from './src/Application';
import RoutersProvider from './src/routers/RoutersProvider';
import StorageProvider from './src/storage/Provider';
import SecretStorage from './src/storage/Secret';
import SQLiteConnection from './src/lib/db-connection/adapter/SQLiteConnection';

new Application(
    express(),
    new RoutersProvider(
        new StorageProvider(
            new SecretStorage('./../../secret.json'),
            new SQLiteConnection( './../../secret.sqlite')
        )
    ))
    .run();
