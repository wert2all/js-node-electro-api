'use strict';
/**
 * @class ResponseDataClass
 *
 */
export default class ResponseDataClass {
    constructor() {
        this.status = false;
        this.message = '';
        this.dump = null;
    }

    toHash() {
        const ret = {
            status: this.status,
            message: this.message
        };
        if (this.dump) {
            ret.dump = this.dump;
        }
        return ret;
    }
}
