declare namespace SubscriptionFeature {

    interface Feature {
        subscriptionPlanType: string,
        value: string | boolean,
        display: string
        description: string,
    }

    export interface SubscriptionFeatureData extends CommonInterface.Id {
        feature: string;
        featureConfig: Feature[];
        isEdited: boolean;
    }

    export interface SubscriptionFeatureDetail extends CommonInterface.ResponseStatusCodeMsg {
        data: SubscriptionFeatureData;
    }

};