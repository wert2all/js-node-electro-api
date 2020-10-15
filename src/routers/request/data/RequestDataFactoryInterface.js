/**
 * @interface
 * @abstract
 * @class RequestDataFactoryInterface
 */
export default class RequestDataFactoryInterface {
    /**
     * @abstract
     * @param request
     * @return {RequestDataInterface}
     */
    factory(request) {}
}
