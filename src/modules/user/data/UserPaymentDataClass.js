import DataValue from '../../../lib/data-value/DataValue';

/**
 * @class UserPaymentDataClass
 * @extends DataValue
 * @type DataValue
 */
export default class UserPaymentDataClass extends DataValue {
    constructor() {
        super();
        this.setData('company_name', '');
        this.setData('payment_account', '');
        this.setData('bic', '');
        this.setData('edrpou', '');
        this.setData('recipient_payment_account', '');
        this.setData('cs', '');
    }
}
