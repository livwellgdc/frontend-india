
declare namespace ProfileInterest {
  export interface ProfileInterestData extends CommonInterface.Id {
    name: CommonInterface.Language;
    created?: number;
    categoryName: string;
  }

  export interface ProfileInterestDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: ProfileInterestData;
  }

};
