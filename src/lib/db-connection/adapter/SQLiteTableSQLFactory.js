// eslint-disable-next-line max-len
import TableSQLFactoryInterface from '../../db-definition/DefinitionTableSQLFactoryInterface';

/**
 * @class SQLiteTableSQLFactory
 * @type TableSQLFactoryInterface
 * @extends TableSQLFactoryInterface
 */
export default class SQLiteTableSQLFactory extends TableSQLFactoryInterface {
    /**
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    createSQL(definition) {
        return `CREATE TABLE IF NOT EXISTS ${definition.getTableName()}
            (
                ${this._columnsSQL(definition)}
            )`;
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    _columnsSQL(definition) {
        return definition.getColumns().map(column => {
            let columnSQL = ' ' + column.getColumnName() + ' ' + column.getType() + ' ';
            columnSQL += (!column.isNull()) ? ' not null ' : ' ';
            columnSQL += (column.getDefault() !== false)
                ? ' default ' + column.getDefault()
                : ' ';
            columnSQL += (column.isPrimary()) ? ' primary key ' : ' ';
            return columnSQL;
        }).join(',\n');
    }
}
