// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from "../../../../db-definition/builder/DefinitionSQLBuilderInterface";
import ErrorConnection from "../../../error/ErrorConnection";

/**
 * @class MysqlUpdateSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class MysqlUpdateSQLBuilder extends DefinitionSQLBuilderInterface {
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
            let sql = "update " + definition.getTableName() + " set ";
            sql += definition
                .getColumns()
                .map((column) => {
                    if (definition.getPrimaryColumn().getColumnName() === column.getColumnName()) {
                        return false;
                    }
                    if (!data.hasOwnProperty(column.getColumnName())) {
                        return false;
                    }
                    return column.getColumnName() + " = ?";
                })
                .filter((index) => !!index)
                .join(",");
            sql += " where " + definition.getPrimaryColumn().getColumnName() + " = ?";
            return sql;
        } else {
            throw new ErrorConnection();
        }
    }
}
