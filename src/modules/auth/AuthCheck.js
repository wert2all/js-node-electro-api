const {OAuth2Client} = require('google-auth-library');

/**
 * @class AuthCheck
 */
export default class AuthCheck {
    /**
     *
     * @param {string} apiKey
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.client = new OAuth2Client(apiKey, '', '');
    }

    /**
     *
     * @param {AuthParams} params
     */
    check(params) {
        /**
         *
         * @param {AuthCheck} self
         * @param {AuthParams} params
         * @return {Promise<void>}
         */
        async function verify(self, params) {
            const ticket = await self.client.verifyIdToken({
                idToken: params.token,
                audience: self.apiKey,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            //const domain = payload['hd'];
        }

        console.log(verify(this, params));
        // verify(this, params).catch(console.error);
    }
}
