// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from '../../../db-definition/DefinitionSQLBuilderInterface';
import DefinitionColumn from '../../../db-definition/DefinitionColumn';

/**
 * @class SQLiteTableSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class SQLiteTableSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    // eslint-disable-next-line no-unused-vars
    buildSQL(definition, data) {
        return 'CREATE TABLE IF NOT EXISTS ' + definition.getTableName() +
            '(' + this._columnsSQL(definition) + ')';
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    _columnsSQL(definition) {
        console.log();
        return definition.getColumns().map(column => {
            let columnSQL = ' ' + column.getColumnName() + ' ' + column.getType() + ' ';
            columnSQL += (!column.isNull()) ? ' not null ' : ' ';
            columnSQL += this._createDefault(column);
            columnSQL += (column.isPrimary()) ? ' primary key ' : ' ';
            return columnSQL;
        }).join(',\n');
    }

    /**
     *
     * @param {DefinitionColumnInterface} column
     * @return {string}
     * @private
     */
    _createDefault(column) {
        return (column.getDefault() !== false)
            ? (' default ' + this._wrapValue(column, column.getDefault()))
            : ' ';
    }

    /**
     *
     * @param {DefinitionColumnInterface} column
     * @param {*} value
     * @return {string}
     * @private
     */
    _wrapValue(column, value) {
        return (column.getType() === DefinitionColumn.COLUMN_TYPE_VARCHAR)
            ? '"' + value + '"'
            : value;
    }
}