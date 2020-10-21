import TablesFactoryInterface from "./TablesFactoryInterface";

/**
 * @class TablesFactory
 * @extends TablesFactoryInterface
 * @type TablesFactoryInterface
 */
export default class TablesFactory extends TablesFactoryInterface {
    /**
     *
     * @param {DefinitionTableInterface[]} definitions
     * @param {TableCreatorInterface} tableCreator
     */
    constructor(definitions, tableCreator) {
        super();
        /**
         *
         * @type {TableCreatorInterface}
         * @private
         */
        this._tableCreator = tableCreator;
        /**
         *
         * @type {DefinitionTableInterface[]}
         * @private
         */
        this._definitions = definitions;
    }

    /**
     *
     * @return {Promise<void>}
     */
    async create() {
        return Promise.all(this._definitions.map((definition) => this._tableCreator.createTable(definition)))
            .then(() => null)
            .catch((err) => {
                throw err;
            });
    }

    /**
     *
     * @param serverConnection
     * @return {TablesFactoryInterface}
     */
    setServer(serverConnection) {
        this._tableCreator.setServer(serverConnection);
        return this;
    }
}
