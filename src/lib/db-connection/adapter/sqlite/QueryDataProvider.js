/**
 * @class QueryDataProvider
 */
export default class QueryDataProvider {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>}data
     * @return {Object<string, string>}
     */
    buildQueryData(definition, data) {
        const ret = {};
        Object.keys(data).forEach((key) => {
            if (definition.isColumn(key)) {
                ret[":" + key] = data[key];
            }
        });
        return ret;
    }
}
