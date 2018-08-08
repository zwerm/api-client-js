'use strict';

/** @type {AxiosStatic} */
const axios = require('axios').default;
const qs = require('qs');

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

    // region getter constants
    // region routes
    /**
     * @return {Zwerm.DISABLED_ROUTING}
     * @static
     */
    static get DISABLED_ROUTING() {
        return '/dev/null';
    }

    /**
     * @return {Zwerm.ROUTE_DELIMITER}
     * @static
     */
    static get ROUTE_DELIMITER() {
        return '/';
    }

    // endregion
    // region event constants
    // region system events
    // region connect events
    /**
     * @return {Zwerm.Events.UNKNOWN_MESSAGE}
     * @static
     */
    static get UNKNOWN_MESSAGE_EVENT() {
        return 'zwerm.unknown';
    }

    /**
     * @return {Zwerm.Events.ENGINE_ERROR}
     * @static
     */
    static get ENGINE_ERROR_EVENT() {
        return 'zwerm.engines.error';
    }

    /**
     * @return {Zwerm.Events.CHANNEL_ERROR}
     * @static
     */
    static get CHANNEL_ERROR_EVENT() {
        return 'zwerm.channels.error';
    }

    // endregion
    // region user events
    /**
     * @return {Zwerm.Events.NEW_USER}
     * @static
     */
    static get NEW_USER_EVENT() {
        return 'zwerm.users.new';
    }

    /**
     * @return {Zwerm.Events.UPDATE_USER_ROUTE}
     * @static
     */
    static get UPDATE_USER_ROUTE_EVENT() {
        return 'zwerm.users.route.update';
    }

    // endregion
    // region conversation events
    /**
     * @return {Zwerm.Events.NEW_CONVERSATION}
     * @static
     *
     * @deprecated in favor of {@link NEW_CONVERSATION_EVENT}
     */
    static get NEW_CONVESRATION_EVENT() {
        return ZwermAPI.NEW_CONVERSATION_EVENT;
    }

    /**
     * @return {Zwerm.Events.NEW_CONVERSATION}
     * @static
     */
    static get NEW_CONVERSATION_EVENT() {
        return 'zwerm.conversations.new';
    }

    /**
     * @return {Zwerm.Events.UPDATE_CONVERSATION_ROUTE}
     * @static
     */
    static get UPDATE_CONVERSATION_ROUTE_EVENT() {
        return 'zwerm.conversations.route.update';
    }

    /**
     * @return {Zwerm.Events.CONVERSATION_SENTIMENT_NEGATIVE}
     * @static
     */
    static get CONVERSATION_SENTIMENT_NEGATIVE_EVENT() {
        return 'zwerm.conversations.sentiment.negative';
    }

    // endregion
    // endregion
    // region conversational events
    // region welcome events
    /**
     * @return {Zwerm.Events.WELCOME}
     * @static
     */
    static get WELCOME_EVENT() {
        return 'zwerm.welcome';
    }
    /**
     * @return {Zwerm.Events.WELCOME_BACK}
     * @static
     */
    static get WELCOME_BACK_EVENT() {
        return 'zwerm.welcome-back';
    }
    // endregion
    // region timer events
    /**
     * @return {Zwerm.Events.TIMER_START}
     * @static
     */
    static get TIMER_START_EVENT() {
        return 'zwerm.timer.start';
    }
    /**
     * @return {Zwerm.Events.TIMER_CANCEL}
     * @static
     */
    static get TIMER_CANCEL_EVENT() {
        return 'zwerm.timer.cancel';
    }
    // endregion
    // endregion
    // endregion
    // endregion
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
                Authorization: `Bearer ${this._apiToken}`,
                'X-Clacks-Overhead': 'GNU Terry Pratchett'
            }
        });
    }

    // endregion
    // region configuration
    /**
     *
     * @param {string} apiUrl
     * @param {string} apiToken
     *
     * @return {ZwermAPI}
     */
    use({ apiUrl = this.apiUrl, apiToken = this.apiToken } = {}) {
        this.apiUrl = apiUrl;
        this.apiToken = apiToken;

        return this;
    }

    /**
     * Sets the api url in a chain-able manner
     *
     * @param {string} apiUrl
     *
     * @return {ZwermAPI}
     */
    useUrl(apiUrl) {
        this.apiUrl = apiUrl;

        return this;
    }

    /**
     * Sets the api token in a chain-able manner
     *
     * @param {string} apiToken
     *
     * @return {ZwermAPI}
     */
    useToken(apiToken) {
        this.apiToken = apiToken;

        return this;
    }

    //endregion
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
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/filter`, filterObj, { params: { limit, sort } })
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

    /**
     * Get the markup for the a user of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     *
     * @return {Promise<Zwerm.Database.UserMarkup>}
     */
    getBotUserMarkup(teamSlug, botId, userId) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}/markup`)
                   .then(response => response.data);
    }

    /**
     * Update the markup for the a user of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     *
     * @return {Promise<Zwerm.Database.UserMarkup>}
     */
    updateBotUserMarkup(teamSlug, botId, userId) {
        return this._zwermRequest.put(`bots/${teamSlug}/${botId}/users/${userId}/markup`)
                   .then(response => response.data);
    }

    /**
     * Get the markup for the a user of a bot. Force update if no data is returned.
     * We recommend this method as the most efficient way to retrieve user markup data unless the most up to data is needed.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     *
     * @return {Promise<Zwerm.Database.UserMarkup>}
     */
    getOrUpdateBotUserMarkup(teamSlug, botId, userId) {
        return this.getBotUserMarkup(teamSlug, botId, userId)
                   .then(markup => {
                       if (!markup || Object.keys(markup).length === 0) {
                           return this.updateBotUserMarkup(teamSlug, botId, userId);
                       }
                       return markup;
                   });
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
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/conversations/filter`, filterObj, { params: { limit, sort } })
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

    /**
     * Get a single conversation of a user of a bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {string} conversationId
     *
     * @return {Promise<Zwerm.Database.ConversationEntry>}
     */
    getBotUserConversation(teamSlug, botId, userId, conversationId) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}/conversations/${conversationId}`)
                   .then(response => response.data['Item']);
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
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/transactions/filter`, filterObj, { params: { limit, sort } })
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
    // region list bots
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
    /**
     * @param {string} teamSlug
     * @param {string} botId
     *
     * @return {Promise<Zwerm.API.BotInfo>}
     */
    getSingleBot(teamSlug, botId) {
        return this._zwermRequest.get(`/bots/${teamSlug}/${botId}`)
                   .then(response => response.data);
    }

    /**
     *
     * @return {Promise<{ bots: Array<Zwerm.API.BotInfo>, config: BotsSchema.Bots }>}
     */
    listAllBots() {
        return this._zwermRequest.get('/bots')
                   .then(response => response.data);
    }

    // endregion
    // endregion
    // region bot routing
    // region user routing
    /**
     * Gets the current route of the given user for the given bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     *
     * @return {Promise<string>}
     */
    getCurrentRouteForUser(teamSlug, botId, userId) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}/route`)
                   .then(response => response.data['route']);
    }

    /**
     * Puts the given route as the current route of the given user for the given bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {string} route
     *
     * @return {Promise<string>}
     */
    putCurrentRouteForUser(teamSlug, botId, userId, route) {
        return this._zwermRequest.put(`bots/${teamSlug}/${botId}/users/${userId}/route`, { route })
                   .then(response => response.data['route']);
    }

    /**
     * Deletes the current route of the given user for the given bot.
     *
     * This will restore the routing back to it's original, default value.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     *
     * @return {Promise<string>}
     */
    deleteCurrentRouteForUser(teamSlug, botId, userId) {
        return this._zwermRequest.delete(`bots/${teamSlug}/${botId}/users/${userId}/route`)
                   .then(response => response.data);
    }

    // endregion
    // region conversation routing
    /**
     * Gets the current route of the given conversation for the given user of the given bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {string} conversationId
     *
     * @return {Promise<string>}
     */
    getCurrentRouteForConversation(teamSlug, botId, userId, conversationId) {
        return this._zwermRequest.get(`bots/${teamSlug}/${botId}/users/${userId}/conversations/${conversationId}/route`)
                   .then(response => response.data['route']);
    }

    /**
     * Puts the given route as the current route of the given conversation for the given user for the given bot.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {string} conversationId
     * @param {string} route
     *
     * @return {Promise<string>}
     */
    putCurrentRouteForCoversation(teamSlug, botId, userId, conversationId, route) {
        return this._zwermRequest.put(`bots/${teamSlug}/${botId}/users/${userId}/conversations/${conversationId}/route`, { route })
                   .then(response => response.data['route']);
    }

    /**
     * Deletes the current route of the given conversation for the given user for the given bot.
     *
     * This will restore the routing back to it's original, default value.
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {string} conversationId
     *
     * @return {Promise<string>}
     */
    deleteCurrentRouteForCoversation(teamSlug, botId, userId, conversationId) {
        return this._zwermRequest.delete(`bots/${teamSlug}/${botId}/users/${userId}/conversations/${conversationId}/route`)
                   .then(response => response.data);
    }

    // endregion
    // endregion
    // region metrics
    /**
     * Request a set of metrics for a bot.
     *
     * @example <caption>Request the same metric multiple times with different configurations.</caption>
     * zwerm.getBotMetrics('my-team', 'my-bot',
     *     {activeUsers: {interval: '1d', start: '2018-04-01T00:00:00.000Z', end: '2018-05-01T00:00:00.000Z'}},
     *     {activeUsers: {start: '2018-04-01T00:00:00.000Z', end: '2018-04-02T00:00:00.000Z'}}
     * ).then(console.log);
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {Object<string, Object<string, string>>} [metrics=[]]
     *
     * @return {Promise<AxiosResponse<Object>>}
     */
    getBotMetrics(teamSlug, botId, ...metrics) {
        let index = 0;
        const keys = {};
        const options = {};

        // For all requested metric objects
        metrics.forEach(metric => {
            // go through all keys (they can have more than one, event though it is not recommended)
            Object.keys(metric).forEach(key => {
                // store the metric key name with the matching index
                keys[index] = key;

                // go through all the options
                Object.keys(metric[key]).forEach(option => {
                    // store the option with the matching index
                    options[option] = options[option] || {};
                    options[option][index] = metric[key][option];
                });

                // up the index for the next round.
                index++;
            });
        });

        return this._zwermRequest
                   .get(`metrics/${teamSlug}/${botId}`, {
                       params: Object.assign(options, { metrics: keys }),
                       // we need to use a serializer that converts the objects to arrays, instead of encoding them
                       paramsSerializer: params => qs.stringify(params, { encode: false })
                   })
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
    // region send letter
    /**
     *
     * @param {string} teamSlug
     * @param {string} botId
     * @param {string} userId
     * @param {string} conversationId
     * @param {string} channelId
     * @param {StaMP.Protocol.Letter} letter
     *
     * @return {Promise}
     */
    postLetter(teamSlug, botId, userId, conversationId, channelId, letter) {
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/conversations/${conversationId}/transaction`, {
                       channelId,
                       letter
                   })
                   .then(response => response.data);
    }

    // endregion
    // region event sending
    /**
     * Posts an event to Zwerm, where it'll be logged, and be routed onto the appropriate engine.
     *
     * If no `conversationId` is given, the event will be sent directly to the user,
     * meaning that the most current conversation for the user in question will be used,
     * with one being created if there isn't a current conversation.
     *
     * @param {string} teamSlug the team that owns the bot that the event is being in regards to.
     * @param {string} botId the id of the bot that the event is being sent in regards to.
     * @param {string} userId the id of the user that the event is being sent in regards to.
     * @param {string} event the name of the event.
     * @param {Object} payload the payload of the event. This cannot be more than 5 levels deep.
     * @param {string} [conversationId] the id of the conversation that the event is being sent in regards to.
     * @param {string} [channelId] id of the channel to scope this event as coming from.
     * @param {string} [route] the engine route to send this event down.
     * @param {number} [value] a value.
     * @param {string} [timestamp] ISO Datetime for when the event should get triggered
     *
     * @return {Promise}
     *
     * @see postEventToUser postEventToUser method
     * @see postEventToConversation postEventToConversation method
     */
    postEvent(teamSlug, botId, userId, event, payload, { conversationId, channelId, route, value, timestamp }) {
        if (conversationId) {
            return this.postEventToConversation(teamSlug, botId, userId, conversationId, event, payload, { channelId, route, value, timestamp });
        }

        return this.postEventToUser(teamSlug, botId, userId, event, payload, { channelId, route, value, timestamp });
    }

    /**
     * Posts an event to Zwerm, where it'll be logged, and be routed onto the appropriate engine.
     *
     * @param {string} teamSlug the team that owns the bot that the event is being in regards to.
     * @param {string} botId the id of the bot that the event is being sent in regards to.
     * @param {string} userId the id of the user that the event is being sent in regards to.
     * @param {string} event the name of the event.
     * @param {Object} payload the payload of the event. This cannot be more than 5 objects deep.
     * @param {string} [channelId] id of the channel to scope this event as coming from.
     * @param {string} [route] the engine route to send this event down.
     * @param {number} [value] a value.
     * @param {string} [timestamp] ISO Datetime for when the event should get triggered
     *
     * @return {Promise}
     */
    postEventToUser(teamSlug, botId, userId, event, payload, { channelId, route, value, timestamp }) {
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/event`, {
                       event,
                       payload,
                       channelId,
                       route,
                       value,
                       timestamp
                   })
                   .then(response => response.data);
    }

    /**
     * Posts an event to Zwerm, where it'll be logged, and be routed onto the appropriate engine.
     *
     * @param {string} teamSlug the team that owns the bot that the event is being in regards to.
     * @param {string} botId the id of the bot that the event is being sent in regards to.
     * @param {string} userId the id of the user that the event is being sent in regards to.
     * @param {string} conversationId  the id of the conversation that the event is being sent in regards to.
     * @param {string} event the name of the event.
     * @param {Object} payload the payload of the event. This cannot be more than 5 objects deep.
     * @param {string} [channelId] id of the channel to scope this event as coming from.
     * @param {string} [route] the engine route to send this event down.
     * @param {number} [value] a value.
     * @param {string} [timestamp] ISO Datetime for when the event should get triggered
     *
     * @return {Promise}
     */
    postEventToConversation(teamSlug, botId, userId, conversationId, event, payload, { channelId, route, value, timestamp }) {
        return this._zwermRequest.post(`bots/${teamSlug}/${botId}/users/${userId}/conversations/${conversationId}/event`, {
                       event,
                       payload,
                       channelId,
                       route,
                       value,
                       timestamp
                   })
                   .then(response => response.data);
    }

    // endregion
}

module.exports = ZwermAPI;
