// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from '../../../db-definition/DefinitionSQLBuilderInterface';
import ErrorConnection from '../../error/ErrorConnection';

/**
 * @class SQLiteUpdateSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class SQLiteUpdateSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    buildSQL(definition, data) {
        const primaryValue = (
            data.hasOwnProperty(
                definition.getPrimaryColumn().getColumnName()
            )
        )
            ? data[definition.getPrimaryColumn().getColumnName()]
            : false;
        if (primaryValue !== false) {
            let sql = 'update ' + definition.getTableName() + ' set ';
            sql += definition.getColumns()
                .map(column => {
                    return column.getColumnName() + ' = ?';
                })
                .join(',');
            sql += ' where ' + definition.getPrimaryColumn().getColumnName() + ' = ?';
            return sql;
        } else {
            throw new ErrorConnection();
        }
    }
}
