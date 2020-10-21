// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from "../../../../db-definition/builder/DefinitionSQLBuilderInterface";

/**
 * @class MysqlInsertSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class MysqlInsertSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    buildSQL(definition, data) {
        let sql = " insert into " + definition.getTableName() + " ( ";
        const columns = {};
        definition.getColumns().map((col) => {
            columns[col.getColumnName()] = true;
        });

        const cols = Object.keys(data)
            .map((key) => (columns.hasOwnProperty(key) ? key : false))
            .filter((index) => !!index);
        sql += cols.join(",");
        sql += " ) values (";
        sql += cols.map((key) => " ?").join(",");
        sql += " )";
        return sql;
    }
}
