declare namespace User {

  export interface UserData extends CommonInterface.Id {
    firstName?: string;
    lastName?: string;
    fullName: string;
    email: string;
    status: string;
    countryCode: string;
    gender: string;
    mobileNo: string;
    profilePicture?: string;
    fullMobileNo?: string;
    club?: string;
    pack?: string;
    pointsEarned?: number;
    badgeEarned?: number;
    rewardEarned?: number;
    uid: string;
    created?: number;
    flgJoinedDate?: number;
    dob?: any;
    bmi: {
      value: string;
      category: string;
    };
    height: {
      value: string;
      type: string;
    };
    weight: {
      value: string;
      type: string;
    };
    defaultHealthApplication: string;
  }

  export interface UserDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: UserData;
  }

};
