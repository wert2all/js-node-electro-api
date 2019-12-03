/**
 * @class VersionFactory
 */
export default class VersionFactory {

    constructor(version, tariffRepository) {
        this.tariffRepository = tariffRepository;
        this.className = 'Api_' + version;
        this.latest = tariffRepository => ({
            result: params => tariffRepository.get(params.getYearMon()),
            all: () => tariffRepository.all()
        });
        this.classes = {
            Api_1: this.latest,
            Api_latest: this.latest
        };
    }

    create() {
        return this.classes.hasOwnProperty(this.className)
            ? new this.classes[this.className](this.tariffRepository)
            : new this.classes['Api_latest'](this.tariffRepository);
    }

}
