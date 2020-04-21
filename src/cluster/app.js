import express from 'express';

import Application from '../Application';
import StorageProvider from '../storage/Provider';
import SecretStorage from '../storage/Secret';
import SQLiteConnection from '../lib/db-connection/adapter/SQLiteConnection';
import RoutersProviderFactory from '../routers/RoutersProviderFactory';
import TariffRequest from '../modules/tariff/TariffRequest';
import RouteDefinition from '../routers/RouteDefinition';
import AuthRequest from '../modules/auth/AuthRequest';
import UploadRequest from '../modules/upload/UploadRequest';

export default new Application(
    express(),
    new RoutersProviderFactory(
        [
            new RouteDefinition('/', 'get', new TariffRequest()),
            new RouteDefinition('/auth/', 'post', new AuthRequest()),
            new RouteDefinition('/upload/', 'post', new UploadRequest()),
        ])
        .create(
            new StorageProvider(
                new SecretStorage('./../../secret.json'),
                new SQLiteConnection('./../secret.sqlite')
            )
        ))
    .run()
    .app;

