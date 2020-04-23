// eslint-disable-next-line max-len
import DefinitionSQLBuilderInterface from '../../../db-definition/DefinitionSQLBuilderInterface';

/**
 * @class SQLiteSelectSQLBuilder
 * @type DefinitionSQLBuilderInterface
 * @extends DefinitionSQLBuilderInterface
 */
export default class SQLiteSelectSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return string
     */
    buildSQL(definition, data) {
        const whereCond = Object.keys(data).map(key => {
            return ' ' + key + ' ' + data[key];
        });
        return 'Select * from '
            + definition.getTableName()
            + this._buildWhere(whereCond)
            + this._buildOrder()
            + this._buildLimit();
    }

    /**
     *
     * @param {Array<string>} whereCond
     * @return {string}
     * @private
     */
    _buildWhere(whereCond) {
        return whereCond.length > 0 ? ' where ' + whereCond.join(' and ') : '';
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildOrder() {
        //TODO
        return '';
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildLimit() {
        //TODO
        return ' ';
    }
}
