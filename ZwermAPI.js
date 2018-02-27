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
     * @param {!string} apiUrl
     * @param {?string} apiToken
     */
    constructor(apiUrl, apiToken) {
        /**
         *
         * @type {!string}
         * @private
         */
        this._apiUrl = apiUrl;
        /**
         *
         * @type {?string}
         * @private
         */
        this._apiToken = apiToken;
    }

    // region getters & setters
    // region apiUrl (get & set)
    /**
     *
     * @return {!string}
     */
    get apiUrl() {
        return this._apiUrl;
    }

    /**
     *
     * @param {!string} apiUrl
     */
    set apiUrl(apiUrl) {
        this._apiUrl = apiUrl;
    }

    // endregion
    // region apiToken (get & set)
    /**
     *
     * @return {?string}
     */
    get apiToken() {
        return this._apiToken;
    }

    /**
     *
     * @param {?string} apiToken
     */
    set apiToken(apiToken) {
        this._apiToken = apiToken;
    }

    // endregion
    /**
     *
     * @return {AxiosInstance}
     * @private
     */
    get _zwermRequest() {
        return axios.create({
            baseURL: this._apiUrl,
            headers: {
                Authorization: `Bearer ${this._apiToken}`
            }
        });
    }

    // endregion
    // region bots
    // region bot users
    /**
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {?number} [limit]
     * @param {Zwerm.API.SortOrder} [sort='desc']
     *
     * @return {Promise<Zwerm.API.DynamoResult<Zwerm.Database.EvaluatedUserKeys, Zwerm.Database.UserEntry>>}
     */
    listBotUsers(teamSlug, botId, { limit, sort = 'desc' } = {}) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users`, { params: { limit, sort } })
                   .then(response => response.data);
    }

    /**
     * Filter users of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {Zwerm.API.DynamoFilter<Zwerm.Database.UserEntry>} filterObj
     * @param {?number} [limit]
     * @param {Zwerm.API.SortOrder} [sort='desc']
     *
     * @return {Promise<Zwerm.API.DynamoResult<Zwerm.Database.EvaluatedUserKeys, Zwerm.Database.UserEntry>>}
     */
    filterBotUsers(teamSlug, botId, filterObj, { limit, sort = 'desc' } = {}) {
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users`, filterObj, { params: { limit, sort } })
                   .then(response => response.data);
    }

    /**
     * Get a single user of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     *
     * @return {Promise<Zwerm.Database.UserEntry>}
     */
    getBotUser(teamSlug, botId, userId) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}`)
                   .then(response => response.data['Item']);
    }

    // endregion
    // region bot conversations
    /**
     * Filters conversations of a specific user of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {Zwerm.API.DynamoFilter<Zwerm.Database.ConversationEntry>} filterObj
     * @param {?number} [limit]
     * @param {Zwerm.API.SortOrder} [sort='desc']
     *
     * @return {Promise<Zwerm.API.DynamoResult<null, Zwerm.Database.ConversationEntry>>}
     */
    filterBotUserConversations(teamSlug, botId, userId, filterObj, { limit, sort = 'desc' } = {}) {
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/conversations`, filterObj, { params: { limit, sort } })
                   .then(response => response.data);
    }

    /**
     * Lists conversations of a specific bot user.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {?number} [limit]
     * @param {Zwerm.API.SortOrder} [sort='desc']
     *
     * @return {Promise<Zwerm.API.DynamoResult<null, Zwerm.Database.TransactionEntry>>}
     */
    listBotUserConversations(teamSlug, botId, userId, { limit, sort = 'desc' } = {}) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}/conversations`, { params: { limit, sort } })
                   .then(response => response.data);
    }

    // endregion
    // region bot transactions
    /**
     * Filters transactions of a specific user of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {Zwerm.API.DynamoFilter<Zwerm.Database.TransactionEntry>} filterObj
     * @param {?number} [limit]
     * @param {Zwerm.API.SortOrder} [sort='desc']
     *
     * @return {Promise<Zwerm.API.DynamoResult<Zwerm.Database.EvaluatedTransactionKeys, Zwerm.Database.TransactionEntry>>}
     */
    filterBotUserTransactions(teamSlug, botId, userId, filterObj, { limit, sort = 'desc' } = {}) {
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/transactions`, filterObj, { params: { limit, sort } })
                   .then(response => response.data);
    }

    /**
     * Lists transactions of a specific bot user.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {?number} [limit]
     * @param {Zwerm.API.SortOrder} [sort='desc']
     *
     * @return {Promise<Zwerm.API.DynamoResult<Zwerm.Database.EvaluatedTransactionKeys, Zwerm.Database.TransactionEntry>>}
     */
    listBotUserTransactions(teamSlug, botId, userId, { limit, sort = 'desc' } = {}) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}/transactions`, { params: { limit, sort } })
                   .then(response => response.data);
    }

    // endregion
    /**
     * List your bots.
     *
     * @return {Promise<{ bots: Array<Zwerm.API.BotInfo> }>}
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
     * @return {Promise<Zwerm.API.Team>}
     */
    listTeamBots(teamSlug) {
        return this._zwermRequest.get(`/teams/${teamSlug}/bots`)
                   .then(response => response.data);
    }

    // todo: createBot(botDetails)
    // todo: getBot(teamSlug, botId)

    /**
     *
     * @return {Promise<{ bots: Array<Zwerm.API.BotInfo>, config: BotsSchema.Bots }>}
     */
    listAllBots() {
        return this._zwermRequest.get('/bots')
                   .then(response => response.data);
    }

    // endregion
    // region teams
    /**
     * List your teams
     *
     * @return {Promise<Zwerm.API.Team>}
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
     * @return {Promise<Zwerm.API.User>}
     */
    getUser() {
        return this._zwermRequest.get('/user')
                   .then(response => response.data);
    }

    /**
     * Update the authenticated user.
     *
     * @param {Zwerm.API.PartialUser} partialUser
     *
     * @return {Promise<Zwerm.API.User>}
     */
    updateUser(partialUser) {
        return this._zwermRequest.patch('/user', partialUser)
                   .then(response => response.data);
    }

    // endregion
}

module.exports = ZwermAPI;
