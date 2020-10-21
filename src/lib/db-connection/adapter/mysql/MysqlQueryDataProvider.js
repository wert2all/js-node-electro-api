/**
 * @class MysqlQueryDataProvider
 */
export default class MysqlQueryDataProvider {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>}data
     * @return {[]}
     */
    buildQueryData(definition, data) {
        const ret = [];
        Object.keys(data).forEach((key) => {
            if (definition.isColumn(key)) {
                ret.push(data[key]);
            }
        });
        return ret;
    }
}
