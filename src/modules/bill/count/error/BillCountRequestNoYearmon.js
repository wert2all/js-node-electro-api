export default class BillCountRequestNoYearMon extends Error {
    constructor() {
        super('Bad request: No yearMon');
    }
}
