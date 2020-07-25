import LoggerInterface from '../LoggerInterface';
import path from 'path';

export default class FileLogger extends LoggerInterface {
    /**
     *
     * @param {string} filePath
     * @param {LogFormatterInterface} formatter
     */
    constructor(filePath, formatter) {
        super();
        /**
         *
         * @type {LogFormatterInterface}
         * @private
         */
        this._formatter = formatter;
        /**
         *
         * @type {string}
         * @private
         */
        this._filePath = filePath;
        /**
         *
         * @type {string}
         * @private
         */
        this._newLine = /^win/.test(process.platform) ? '\r\n' : '\n';
        /**
         *
         * @type {null|WriteStream}
         * @private
         */
        this._writer = null;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    debug(logEvent) {
        this._log(
            this._formatter
                .format(logEvent, LoggerInterface.DEBUG)
        );
        return this;
    }

    /**
     *
     * @param {string} message
     * @private
     */
    _log(message) {
        this._createWriter();
        this._writer.write(message);
        this._writer.end(this._newLine);
    }

    /**
     *
     * @private
     */
    _createWriter() {
        if (!this._writer) {
            const file = path.normalize(this._filePath);
            const opts = {
                flags: 'a',
                encoding: 'utf8'
            };

            this._writer = fs.createWriteStream(file, opts);
        }
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    error(logEvent) {
        this._log(
            this._formatter
                .format(logEvent, LoggerInterface.ERROR)
        );
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    fatal(logEvent) {
        this._log(
            this._formatter
                .format(logEvent, LoggerInterface.FATAl)
        );
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    info(logEvent) {
        this._log(
            this._formatter
                .format(logEvent, LoggerInterface.INFO)
        );
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    trace(logEvent) {
        this._log(
            this._formatter
                .format(logEvent, LoggerInterface.TRACE)
        );
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    warn(logEvent) {
        this._log(
            this._formatter
                .format(logEvent, LoggerInterface.WARN)
        );
        return this;
    }
}

