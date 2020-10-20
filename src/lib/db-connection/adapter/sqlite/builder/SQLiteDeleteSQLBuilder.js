import DefinitionSQLBuilderInterface from "../../../../db-definition/builder/DefinitionSQLBuilderInterface";
import ErrorConnection from "../../../error/ErrorConnection";

/**
 * @class SQLiteDeleteSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class SQLiteDeleteSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    buildSQL(definition, data) {
        const primaryValue = data.hasOwnProperty(definition.getPrimaryColumn().getColumnName())
            ? data[definition.getPrimaryColumn().getColumnName()]
            : false;
        if (primaryValue !== false) {
            let sql = "delete from " + definition.getTableName();
            sql +=
                " where " +
                definition.getPrimaryColumn().getColumnName() +
                " = :" +
                definition.getPrimaryColumn().getColumnName();
            return sql;
        } else {
            throw new ErrorConnection();
        }
    }
}
