/**
 * @class FilesRepository
 *
 */
import RepositoryAbstract from '../../lib/db-repository/ReposytoryAbstract';

export default class FilesRepository extends RepositoryAbstract {

    /**
     *
     * @param {EntityInterface} userFilesEntity
     * @return {Promise<EntityInterface[]>}
     */
    async fetchData(userFilesEntity) {
        return super.fetchData(userFilesEntity);
    }
}
