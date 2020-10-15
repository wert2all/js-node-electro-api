/**
 * @interface
 * @class RequestDataFactoryInterface
 */
export default class RequestDataFactoryInterface {
    /**
     * @abstract
     * @param request
     * @return {RequestDataInterface}
     */
    static factory(request) {}
}
