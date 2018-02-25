namespace Zwerm {
    namespace BotChannels {
        type Channels = {
            botsocket?: BotSocket
            facebook?: Facebook,

            [key: string]: any;
        }

        interface BotSocket {
        }

        interface Facebook {
            userId: string;
            store: {
                first_name?: string,
                last_name?: string,

                [key: string]: any;
            }
        }
    }

    namespace Database {
        type UserCategory = {
            name: string;
            count: number;
        };

        type UserStore = {
            location?: string,
            categories?: Array<UserCategory>,
            lat?: number,
            lng?: number,

            [key: string]: any;
        }

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

        interface ConversationEntry {
            botUserId: string;
            conversationId: string;
            firstTransactionTime: string;
            firstTransaction: Zwerm.Database.TransactionEntry,
            lastTransaction: Zwerm.Database.TransactionEntry,
            lastTransactionTime: string;
            creation: string;
            lifetime: number
            expiration: string;
            data: Array,
        }

        interface TransactionEntry {
            transactionId: string;
            conversationId: string;
            botUserId: string;
            channel: [keyof BotChannels.Channels];
            type: string;
            timestamp: string;
        }

        /**
         * @deprecated
         */
        type STaMPTransaction = StaMPTransaction;

        class StaMPTransaction<ChildOfStaMPMessage extends StaMP.Protocol.Messages.StaMPMessage> implements TransactionEntry {
            conversationId: string;
            transactionId: string;
            channel: [keyof Zwerm.BotChannels.Channels];
            botUserId: string;
            type: 'StaMP';
            timestamp: string;
            message: ChildOfStaMPMessage;
        }

        interface UserEntry {
            userId: string;
            botId: string;
            channels: BotChannels.Channels;
            creation: string;
            lastTransactionTime: string;
            lastTransaction: TransactionEntry
            store: UserStore;
        }
    }

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
}
