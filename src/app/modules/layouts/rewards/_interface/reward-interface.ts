declare namespace Reward {
  export interface RewardData extends CommonInterface.Id {
    name: CommonInterface.Language;
    categoryId: {
      _id: string;
      name: CommonInterface.Language;
    },
    description: CommonInterface.Language;
    notes?: CommonInterface.Language;
    created?: number;
    points?: number;
    validity: number;
    sponsorLink: string;
    sponsorName?: string;
    type: string;
    image: string;
    isEdited?: boolean;
    status: string;
    totalUsers: number;
    totalRedemption?: number;
    isDisabled: boolean;
    isFeatured: boolean;
    hasScanner: boolean;
    couponCodeType: string;
    redemptionValidity: number;
    discountPercent: number;
    totalPoints: number;
    privacy: string;
    totalAvailableCoupons: number;
    couponCodes: string[]
    hasExternalLink: boolean;
    hasExternalLinkWithCode: boolean;
  }

  export interface RewardDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: RewardData;
  }

};
