'use strict';

/** @type {AxiosStatic} */
const axios = require('axios');

// var testZwerm = require('./env.js')

/**
 *
 */
class ZwermAPI {

    /**
     *
     * @param {string} [zwermUrl=process.env.ZWERM_URL]
     * @param {string} [bearerToken=process.env.ZWERM_BEARER_TOKEN]
     */
    constructor(zwermUrl = process.env.ZWERM_URL, bearerToken = process.env.ZWERM_BEARER_TOKEN) {
        /**
         *
         * @type {string}
         * @private
         */
        this._zwermUrl = zwermUrl;
        /**
         *
         * @type {string}
         * @private
         */
        this._bearerToken = bearerToken;
    }

    /**
     *
     * @return {AxiosInstance}
     * @private
     */
    get _zwermRequest() {
        return axios.create({
            baseURL: this._zwermUrl,
            headers: {
                Authorization: `Bearer ${this._bearerToken}`
            }
        });
    }

    // region bots
    // region bot users
    // endregion
    // region bot conversations
    // endregion
    // region bot transactions
    // endregion
    /**
     * List your bots.
     *
     * @return {Promise<ZwermAPI.Team>}
     */
    listUserBots() {
        return this._zwermRequest.get('/user/bots')
                   .then(response => response.data);
    }

    /**
     * List your bots.
     *
     * @param {string} teamSlug
     *
     * @return {Promise<ZwermAPI.Team>}
     */
    listTeamBots(teamSlug) {
        return this._zwermRequest.get(`/teams/${teamSlug}/bots`)
                   .then(response => response.data);
    }

    // todo: createBot(botDetails)
    // todo: getBot(teamSlug, botId)

    // endregion
    // region teams
    /**
     * List your teams
     *
     * @return {Promise<ZwermAPI.Team>}
     */
    listUserTeams() {
        return this._zwermRequest.get('/user/teams')
                   .then(response => response.data);
    }

    // endregion
    // region authenticated user
    /**
     * Get the authenticated user.
     *
     * @return {Promise<ZwermAPI.User>}
     */
    getUser() {
        return this._zwermRequest.get('/user')
                   .then(response => response.data);
    }

    /**
     * Update the authenticated user.
     *
     * @param {ZwermAPI.PartialUser} partialUser
     *
     * @return {Promise<ZwermAPI.User>}
     */
    updateUser(partialUser) {
        return this._zwermRequest.patch('/user', partialUser)
                   .then(response => response.data);
    }

    // endregion
}

module.exports = ZwermAPI;
