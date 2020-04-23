// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from '../../../db-definition/DefinitionSQLBuilderInterface';

/**
 * @class SQLiteInsertSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class SQLiteInsertSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    buildSQL(definition, data) {
        let sql = ' insert into ' + definition.getTableName() + ' ( ';
        sql += definition.getColumns().map(column =>
            data.hasOwnProperty(column.getColumnName())
                ? column.getColumnName()
                : false
        )
            .filter(value => !!value)
            .join(',');
        sql += ' ) values (';
        sql += Object.keys(data).map(() => ' ?').join(',');
        sql += ' )';
        return sql;
    }
}
