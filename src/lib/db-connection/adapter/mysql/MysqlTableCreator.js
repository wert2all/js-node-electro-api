import MysqlTableSQLBuilder from "./builder/MysqlTableSQLBuilder";
import TableCreatorInterface from "../../tables/TableCreatorInterface";
import MysqlIndexSQLBuilder from "./builder/MysqlIndexSQLBuilder";

/**
 * @class MysqlTableCreator
 * @extends TableCreatorInterface
 * @type TableCreatorInterface
 */
export default class MysqlTableCreator extends TableCreatorInterface {
    /**
     *
     * @param {MysqlQueryExecutor} queryExecutor
     */
    constructor(queryExecutor) {
        super();
        /**
         *
         * @type {MysqlQueryExecutor}
         * @private
         */
        this._queryExecutor = queryExecutor;
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderCreateTable = new MysqlTableSQLBuilder();
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderIndex = new MysqlIndexSQLBuilder();
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @return {Promise<void>}

     */
    async createTable(definition) {
        return new Promise((resolve) => {
            this._checkExist(definition)
                .then(() => this._queryExecutor.exec(this._builderCreateTable.buildSQL(definition, null), []))
                .then(() => {
                    const indexes = definition
                        .getIndexes()
                        .map((index) => this._builderIndex.buildSQL(definition, index.toHash()))
                        .filter((sql) => sql !== "");
                    if (indexes.length > 0) {
                        return Promise.all(indexes.map((indexSql) => this._queryExecutor.exec(indexSql, [])));
                    }
                    return null;
                })
                .then(resolve)
                .catch(resolve);
        });
    }

    /**
     *
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._queryExecutor.setServer(serverConnection);
    }

    /**
     *
     * @param  {DefinitionTableInterface} definition
     * @return {Promise<void>}
     * @private
     */
    async _checkExist(definition) {
        return new Promise((resolve, reject) => {
            const sql =
                'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME IN ("' +
                definition.getTableName() +
                '") AND TABLE_SCHEMA=database()';
            this._queryExecutor.exec(sql, []).then((result) => {
                if (result.length === 0) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
}
