import DefinitionSQLBuilderInterface from "../../../../db-definition/builder/DefinitionSQLBuilderInterface";

/**
 * @class MysqlIndexSQLBuilder
 * @extends DefinitionSQLBuilderInterface
 * @type DefinitionSQLBuilderInterface
 */
export default class MysqlIndexSQLBuilder extends DefinitionSQLBuilderInterface {
    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} index
     * @return {string}
     */
    buildSQL(definition, index) {
        return (
            "Alter table " +
            definition.getTableName() +
            " add " +
            (index.unique ? "unique" : "") +
            "(" +
            index.fields.join(", ") +
            ")"
        );
    }
}
