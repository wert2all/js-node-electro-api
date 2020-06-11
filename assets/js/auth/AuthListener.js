import OnSignInChangedInterface from '../google/auth/listeners/OnSignInChangedInterface';

/**
 * @class AuthListener
 * @type OnSignInChangedInterface
 * @extends OnSignInChangedInterface
 */
export default class AuthListener extends OnSignInChangedInterface {

    onAuth() {
        console.log( 'auth')
    }

    onNonAuth() {
        console.log( 'no auth')
    }
}
