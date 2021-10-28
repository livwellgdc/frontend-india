declare namespace SpecialOffer {
  export interface SpecialOfferData extends CommonInterface.Id {
    name: string;
    discountPercent: number;
    discountCodes: string[];
    usedCoupons: string[];
    availableCoupons: string[];
    validity: number;
    status: string;
    isDisabled: boolean;
    totalAvailableCoupons: number;
    created: number;
    limit: number;
    type: string;
  }

  export interface SpecialOfferDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: SpecialOfferData;
  }

};
