import DefinitionTableSQLFactoryInterface from '../../db-definition/DefinitionTableSQLFactoryInterface';

/**
 * @class SQLiteTableSQLFactory
 * @type DefinitionTableSQLFactoryInterface
 * @extends DefinitionTableSQLFactoryInterface
 */
export default class SQLiteTableSQLFactory extends DefinitionTableSQLFactoryInterface {
    /**
     * @param {DefinitionTableInterface} definition
     * @return string
     */
    createSQL(definition) {
        return 'CREATE TABLE IF NOT EXISTS ' + definition.getTableName() + ' (\n' +
            definition.getColumns().map(column => {
                return ' ' + column.getColumnName() + ' ' + column.getType() + ' '
                + (!column.isNull()) ? ' not null ' : ' '
                + (column.getDefault() !== false) ? ' default ' + column.getDefault() : ' '
                + (column.isPrimary()) ? ' primary key ' : ' ';
            }).join(',\n')
            + ') ';
    }
}
