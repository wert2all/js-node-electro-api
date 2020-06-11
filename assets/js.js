import UIInit from './js/UIInit';
import UIConfig from './js/config/UIConfig';
import GApiConfig from './js/google/GApiConfig';
import GApiAuthConfig from './js/google/auth/GApiAuthConfig';

const config = new UIConfig(
    new GApiConfig(
        new GApiAuthConfig(
            '755367666560-pjv5gmfipr38211grj6vfchkmmvl527l.apps.googleusercontent.com',
            'https://www.googleapis.com/auth/drive.metadata.readonly'
        ),
        'https://apis.google.com/js/api.js?onload=onGApiLoad'
    )
);
new UIInit(config)
    .init(window);

