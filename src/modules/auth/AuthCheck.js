import GoogleAccount from "../../data/GoogleAccount";

const { OAuth2Client } = require("google-auth-library");

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
        this.client = new OAuth2Client(apiKey, "", "");
    }

    /**
     *
     * @param {AuthParams} params
     * @return {Promise<GoogleAccount>}
     */
    check(params) {
        return this.client
            .verifyIdToken({
                idToken: params.token,
                audience: this.apiKey,
            })
            .then((ticket) => GoogleAccount.create(ticket.getPayload()));
    }
}
