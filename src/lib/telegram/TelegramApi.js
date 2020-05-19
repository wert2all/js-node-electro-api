/**
 * @class TelegramApi
 */
import TelegramMessage from './TelegramMessage';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

export default class TelegramApi {
    /**
     *
     * @param {string} token
     * @param {string} chatId
     */
    constructor(token, chatId) {
        /**
         *
         * @type {string}
         * @private
         */
        this._botToken = token;
        /**
         *
         * @type {string}
         * @private
         */
        this._chatId = chatId;
    }

    /**
     *
     * @param {string} text
     * @return {Promise<TelegramMessage>}
     */
    sendMessage(text) {
        const url = this._createUrl('sendMessage', {text: encodeURIComponent(text)});
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(new TelegramMessage(data)))
                .catch(e => reject(e));
        });
    }

    /**
     *
     * @param {string} path
     * @param {string} caption
     * @return {Promise<TelegramMessage>}
     */
    sendPhoto(path, caption = '') {
        const url = this._createUrl('sendPhoto', {});
        const formData = new FormData();
        formData.append('chat_id', this._chatId);
        formData.append('photo', fs.createReadStream(path));
        formData.append('caption', caption);

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => resolve(new TelegramMessage(data)))
                .catch(e => reject(e));
        });
    }

    /**
     *
     * @param {string} apiName
     * @param {Object<string, string>} params
     * @return {string}
     * @private
     */
    _createUrl(apiName, params) {
        const queryValues = params;
        queryValues['chat_id'] = this._chatId;
        return 'https://api.telegram.org/bot' + this._botToken + '/' + apiName +
            '?' + Object.keys(queryValues)
                .map(key => key + '=' + queryValues[key])
                .join('&');
    }
}
