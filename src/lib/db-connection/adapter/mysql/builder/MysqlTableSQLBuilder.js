// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from "../../../../db-definition/builder/DefinitionSQLBuilderInterface";
import DefinitionColumn from "../../../../db-definition/implementation/DefinitionColumn";

/**
 * @class MysqlTableSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class MysqlTableSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string,string>}data
     * @return string
     */
    // eslint-disable-next-line no-unused-vars
    buildSQL(definition, data) {
        return (
            "CREATE TABLE IF NOT EXISTS " +
            definition.getTableName() +
            "(" +
            this._columnsSQL(definition) +
            "" +
            this._addForeignKeys(definition) +
            ")"
        );
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    _columnsSQL(definition) {
        return definition
            .getColumns()
            .map((column) => {
                let columnSQL =
                    " " + column.getColumnName() + " " + column.getType() + "( " + column.getColumnSize() + ")";
                columnSQL += !column.isNull() ? " not null " : " ";
                columnSQL += this._createDefault(column);
                columnSQL += this._addAttributes(column);
                columnSQL += column.isPrimary() ? " primary key " : " ";
                return columnSQL;
            })
            .join(",\n");
    }

    /**
     *
     * @param {DefinitionColumnInterface} column
     * @return {string}
     * @private
     */
    _createDefault(column) {
        return column.getDefault() !== false ? " default " + this._wrapValue(column, column.getDefault()) : " ";
    }

    /**
     *
     * @param {DefinitionColumnInterface} column
     * @param {*} value
     * @return {string}
     * @private
     */
    _wrapValue(column, value) {
        return column.getType() === DefinitionColumn.COLUMN_TYPE_VARCHAR ? '"' + value + '"' : value;
    }

    /**
     *
     * @param {DefinitionColumnInterface} column
     * @return {string}
     * @private
     */
    _addAttributes(column) {
        let ret = "";
        if (column.getAttributes().hasOwnProperty("autoincrement")) {
            ret += " auto_increment ";
        }
        return ret;
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @return {string}
     * @private
     */
    _addForeignKeys(definition) {
        let ret = "";
        if (definition.getForeignKeys().length > 0) {
            ret +=
                ", " +
                definition
                    .getForeignKeys()
                    .map((key) => {
                        return (
                            " FOREIGN KEY " +
                            "(" +
                            key.getFields().join(",") +
                            " ) " +
                            " REFERENCES  " +
                            key.getTable().getTableName() +
                            "( " +
                            key.getMainFields().join(", ") +
                            ") " +
                            this._addOnActions(key).join(" ")
                        );
                    })
                    .join(", ");
        }
        return ret;
    }

    /**
     *
     * @param {DefinitionForeignKeyInterface} key
     * @return {string[]}
     * @private
     */
    _addOnActions(key) {
        return key.getActions().map((action) => "on " + action.actionName + " " + action.action);
    }
}
