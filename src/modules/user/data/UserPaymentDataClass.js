import DataValue from "../../../lib/data-value/DataValue";

/**
 * @class UserPaymentDataClass
 * @extends DataValue
 * @type DataValue
 */
export default class UserPaymentDataClass extends DataValue {
    constructor() {
        super();
        this.setData("company_name", "");
        this.setData("iban", "");
        this.setData("bic", "");
        this.setData("edrpou", "");
        this.setData("personal_number", "");
        this.setData("cs", "");
    }
}
