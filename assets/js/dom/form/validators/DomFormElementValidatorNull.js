import DomFormElementValidatorInterface from '../DomFormElementValidatorInterface';

/**
 * @class DomFormElementValidatorNull
 * @extends DomFormElementValidatorInterface
 * @type DomFormElementValidatorInterface
 */
// eslint-disable-next-line max-len
export default class DomFormElementValidatorNull extends DomFormElementValidatorInterface {
    /**
     *
     * @return {boolean}
     */
    validate() {
        return true;
    }
}
