import { StaMP } from '@stampit/stamp';

export declare namespace Zwerm {

    type DISABLED_ROUTING = '/dev/null';
    type ROUTE_DELIMITER = '/';

    // region namespace: Database
    namespace Database {
        type ZwermDateTime = string;

        type TransactionTypes =
            | 'StaMP'
            | 'event'
            ;

        type ChannelService =
            | 'stamp'
            | 'facebook'
            | 'webchat'
            | 'kik'
            | 'skype'
            | string
            ;

        // region entry interfaces
        interface UserEntry {
            botId: string;
            userId: string;
            creation: ZwermDateTime;

            channels?: UserChannels;
            route?: Zwerm.DISABLED_ROUTING | string;
            store?: UserStore;
            markup?: UserMarkup;

            firstConversation: ConversationEntry;
            firstConversationTime: ZwermDateTime;
            lastConversation: ConversationEntry;
            lastConversationTime: ZwermDateTime;

            lastTransaction: TransactionEntry
            lastTransactionTime: ZwermDateTime;
        }

        interface ConversationEntry {
            botUserId: string;
            conversationId: string;
            creation: ZwermDateTime;

            store?: ConversationStore;

            expiration?: ZwermDateTime;
            lifetime?: number;

            route?: Zwerm.DISABLED_ROUTING | string;

            firstTransaction: TransactionEntry;
            firstTransactionTime: ZwermDateTime;
            lastTransaction: TransactionEntry;
            lastTransactionTime: ZwermDateTime;
        }

        interface TransactionEntry {
            botUserId: string;
            transactionId: string;
            conversationId: string;
            timestamp: ZwermDateTime;

            type: TransactionTypes;
            message: StaMP.Protocol.Messages.StaMPMessage;
            metaMessage: StaMP.Protocol.Messages.StaMPMessage | null;

            channel?: TransactionChannel;
            route?: Zwerm.DISABLED_ROUTING | string;

            conversationStore?: ConversationStore;
            markup?: TransactionMarkup;
            model?: TransactionModel;
        }

        // endregion
        // region channels interfaces
        type UserChannels = {
            [key: string]: UserChannel
        };

        interface UserChannel {
            service: ChannelService;
            userId?: string;
            store?: ChannelStore;
            markup?: ChannelMarkup;
        }

        interface TransactionChannel {
            service: ChannelService;
            id: string;
            userId?: string;
        }

        // endregion
        // region store interfaces
        interface DataStore {
            [key: string]: any;
        }

        type UserStore = DataStore;
        type ChannelStore = DataStore;
        type ConversationStore = DataStore;
        // endregion
        // region markup interfaces
        type UserMarkup = {
            firstName?: string;
            lastName?: string;
            profilePicUrl?: string;
            timezone?: string;
            language?: string;
            local?: string;
            language?: string;
            email?: string;
            phone?: string;

            conversationCount?: number;
            messageCount?: number;
        }
        type ChannelMarkup = {
            [key: string]: any;
        };
        type TransactionMarkup = {
            lang?: AWS.Comprehend.Language;
            languages?: Array<AWS.Comprehend.Language>;
            entities?: Array<AWS.Comprehend.Entity>;
            keyPhrases?: Array<AWS.Comprehend.KeyPhrase>;
            sentiment?: AWS.Comprehend.Sentiment;
        };
        // endregion

        type TransactionModel = {
            [key: string]: any;
        };

        interface EvaluatedUserKeys {
            userId: string;
            botId: string;
            lastTransactionTIme: string;
        }

        interface EvaluatedTransactionKeys {
            botUserId: string;
            transactionId: string;
            timestamp: string;
        }

        interface StaMPTransactionEntry<TypeOfStaMPMessage extends StaMP.Protocol.Messages.StaMPMessage> extends TransactionEntry {
            botUserId: string;
            conversationId: string;
            transactionId: string;
            type: 'StaMP';
            timestamp: string;
            message: TypeOfStaMPMessage;
        }

        interface EventTransactionEntry<TypeOfEventMessage extends StaMP.Protocol.EventMessage> extends TransactionEntry {
            botUserId: string;
            conversationId: string;
            transactionId: string;
            type: 'event';
            timestamp: string;
            message: TypeOfEventMessage;
        }
    }
    // endregion
    // region namespace: AWS
    namespace AWS {
        type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED' | string;

        namespace Comprehend {
            type Language = {
                LanguageCode?: string
                Score?: number
            }
            type Entity = {
                BeginOffset?: number;
                EndOffset?: number;
                Score?: number;
                Text?: string;
                Type?: string;
            }
            type KeyPhrase = {
                BeginOffset?: number;
                EndOffset?: number;
                Score?: number;
                Text?: string;
            }
            type Sentiment = {
                Sentiment: SentimentType;
                SentimentScore: SentimentScore
            }
            type SentimentScore = {
                Mixed?: number;
                Positive?: number;
                Neutral?: number;
                Negative?: number
            }
        }
    }
    // endregion
    // region namespace: API
    namespace API {
        interface DynamoFilter<Entry> {
            condition: string;
            filter?: string;
            names?: { [key: string]: keyof Entry }
            values?: { [key: string]: string; }
        }

        interface DynamoResult<LastEvaluatedKeyProperties, ResultItemType> {
            Count: number;
            ScannedCount: number;
            LastEvaluatedKey: LastEvaluatedKeyProperties;
            Items: Array<ResultItemType>
        }

        type SortOrder = 'desc' | 'asc';

        interface Team {
            id: number;
            owner_id: number;
            name: string;
            slug: string;
            photo_url: string;
            stripe_id: string;
            current_billing_plan: string;
            vat_id: string;
            trial_ends_at: string;
            created_at: string;
            updated_at: string;
            pivot: {
                user_id: number;
                team_id: number;
                role: string;
            },
            subscriptions: Array;
            tax_rate: number;
        }

        interface User {
            id: number;
            name: string;
            email: string;
            photo_url: string;
            uses_two_factor_auth: boolean;
            country_code: string;
            phone: string;
            two_factor_reset_code: string,
            current_team_id: number;
            stripe_id: string;
            current_billing_plan: string;
            card_brand: string;
            card_last_four: string;
            card_country: string;
            billing_address: string;
            billing_address_line_2: string;
            billing_city: string;
            billing_state: string;
            billing_zip: string;
            billing_country: string;
            vat_id: string;
            extra_billing_information: string;
            trial_ends_at: string;
            last_read_announcements_at: string;
            created_at: string;
            updated_at: string;
            subscriptions: Array,
            owned_teams: Array,
            teams: Array<Team>,
            tax_rate: number;
        }

        interface BotInfo {
            /**
             * The name of this bot.
             */
            name: string;
            /**
             * The id of this bot.
             */
            botId: string;
            /**
             * The name of the team that this bot belongs to.
             */
            team: string;
            /**
             * The canonical url for accessing this bot, that can be used to easily api calls against this specific bot
             *
             * A bots canonical url is made up of their team, followed by their id.
             */
            canonical: string;
            /**
             * Timestamp of when this bot was created at.
             */
            createdAt: string;
            /**
             * Timestamp of when this bot was last updated.
             *
             * A update is considered to be the changing of any of the bots configuration properties.
             */
            updatedAt: string;
        }

        // not needed due to the type, but helps WebStorm until a bug gets fixed
        interface PartialUser {
            id?: number;
            name?: string;
            email?: string;
            photo_url?: string;
            uses_two_factor_auth?: boolean;
            country_code?: string;
            phone?: string;
            two_factor_reset_code?: string,
            current_team_id?: number;
            stripe_id?: string;
            current_billing_plan?: string;
            card_brand?: string;
            card_last_four?: string;
            card_country?: string;
            billing_address?: string;
            billing_address_line_2?: string;
            billing_city?: string;
            billing_state?: string;
            billing_zip?: string;
            billing_country?: string;
            vat_id?: string;
            extra_billing_information?: string;
            trial_ends_at?: string;
            last_read_announcements_at?: string;
            created_at?: string;
            updated_at?: string;
            subscriptions?: Array,
            owned_teams?: Array,
            teams?: Array<Team>,
            tax_rate?: number;
        }

        type PartialUser = Partial<User>
    }
    // endregion
    // region namespace: events
    namespace Events {

        // region namespace: UnknownMessageEvent
        type UNKNOWN_MESSAGE = 'zwerm.unknown';
        type UnknownMessageEvent = UnknownMessageEvent.UnknownMessageEvent;

        namespace UnknownMessageEvent {
            interface UnknownMessageEvent extends StaMP.Protocol.Messages.StandardisedEventMessage<UnknownMessageEventData> {
                event: UNKNOWN_MESSAGE;
                payload: UnknownMessageEventData;
            }

            interface UnknownMessageEventData {
                /**
                 * JSON string of the original message
                 */
                originalMessage: string;
            }
        }
        // endregion
        // region namespace: NewUserEvent
        type NEW_USER = 'zwerm.users.new';
        type NewUserEvent = NewUserEvent.NewUserEvent;

        namespace NewUserEvent {
            interface NewUserEvent extends StaMP.Protocol.Messages.StandardisedEventMessage<Zwerm.Database.UserEntry> {
                event: NEW_USER;
                payload: Zwerm.Database.UserEntry;
            }
        }
        // endregion
        // region namespace: UpdateUserRouteEvent
        type UPDATE_USER_ROUTE = 'zwerm.users.route.update';
        type UpdateUserRouteEvent = UpdateUserRouteEvent.UpdateUserRouteEvent;

        namespace UpdateUserRouteEvent {
            interface UpdateUserRouteEvent extends StaMP.Protocol.Messages.StandardisedEventMessage<UpdateUserRouteEventData> {
                event: UPDATE_USER_ROUTE;
                payload: UpdateUserRouteEventData;
            }

            interface UpdateUserRouteEventData {
                /**
                 * The canonical url of the user who updates the route
                 */
                updatedBy: string;
                /**
                 * The users new route
                 */
                newRoute: string;
            }
        }
        // endregion
        // region namespace: NewConversationEvent
        type NEW_CONVERSATION = 'zwerm.conversations.new';
        type NewConversationEvent = NewConversationEvent.NewConversationEvent;

        namespace NewConversationEvent {
            interface NewConversationEvent extends StaMP.Protocol.Messages.StandardisedEventMessage<Zwerm.Database.ConversationEntry> {
                event: NEW_CONVERSATION;
                payload: Zwerm.Database.ConversationEntry;
            }
        }
        // endregion
        // region namespace: UpdateConversationRouteEvent
        type UPDATE_CONVERSATION_ROUTE = 'zwerm.conversations.route.update';
        type UpdateConversationRouteEvent = UpdateUserRouteEvent.UpdateUserRouteEvent;

        namespace UpdateConversationRouteEvent {
            interface UpdateConversationRouteEvent extends StaMP.Protocol.Messages.StandardisedEventMessage<UpdateConversationRouteEventData> {
                event: UPDATE_CONVERSATION_ROUTE;
                payload: UpdateConversationRouteEventData;
            }

            interface UpdateConversationRouteEventData {
                /**
                 * The canonical url of the user who updates the route
                 */
                updatedBy: string;
                /**
                 * The conversations new route
                 */
                newRoute: string;
            }
        }
        // endregion
        // region namespace: EngineErrorEvent
        type ENGINE_ERROR = 'zwerm.engines.error';
        type EngineErrorEvent<ErrorShape extends object> = EngineErrorEvent.EngineErrorEvent<ErrorShape>;

        namespace EngineErrorEvent {
            interface EngineErrorEvent<ErrorShape extends object> extends StaMP.Protocol.Messages.StandardisedEventMessage<EngineErrorEventData> {
                event: ENGINE_ERROR;
                payload: EngineErrorEventData<ErrorShape>;
            }

            interface EngineErrorEventData<ErrorShape extends object> {
                /**
                 * The id of the engine that had the error
                 */
                engineId: string;
                /**
                 * A message describing the error
                 */
                errorMessage: string;
                /**
                 * The details behind the error.
                 *
                 * Usually this is the original error, in one form or another.
                 */
                errorDetails: ErrorShape;
            }
        }
        // endregion
        // region namespace: ChannelErrorEvent
        type CHANNEL_ERROR = 'zwerm.channels.error';
        type ChannelErrorEvent<ErrorShape extends object> = ChannelErrorEvent.ChannelErrorEvent<ErrorShape>;

        namespace ChannelErrorEvent {
            interface ChannelErrorEvent<ErrorShape extends object> extends StaMP.Protocol.Messages.StandardisedEventMessage<ChannelErrorEventData> {
                event: CHANNEL_ERROR;
                payload: ChannelErrorEventData<ErrorShape>;
            }

            interface ChannelErrorEventData<ErrorShape extends object> {
                /**
                 * The id of the channel that had the error
                 */
                channelId: string;
                /**
                 * A message describing the error
                 */
                errorMessage: string;
                /**
                 * The details behind the error.
                 *
                 * Usually this is the original error, in one form or another.
                 */
                errorDetails: ErrorShape;
            }
        }
        // endregion
    }
    // endregion
}
