import AfterEditControl from "./AfterEditControl";

/**
 * @class AfterEditControlFabric
 */
export default class AfterEditControlFabric {
    /**
     *
     * @param {UIElementListInterface} list
     * @return {UIAfterControlInterface}
     */
    create(list) {
        return new AfterEditControl(list);
    }
}
