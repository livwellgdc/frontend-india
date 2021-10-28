declare namespace Challenge {
  export interface ChallengeData extends CommonInterface.Id {
    name: CommonInterface.Language;
    image: string;
    startDate: number;
    endDate: number;
    categoryId: {
      _id: string;
      name: CommonInterface.Language;
    },
    classCategoryId: {
      _id: string;
      name: CommonInterface.Language;
    },
    badgeId: {
      _id: string;
      name: string;
    },
    benefitsCategoryId: {
      _id: string;
      name: CommonInterface.Language;
    },
    rewardId?: {
      _id: string;
      name: CommonInterface.Language;
    }
    description: CommonInterface.Language;
    totalWinner: number;
    created?: number;
    points?: number;
    sponsorName?: string;
    status: string;
    type: string;
    totalParticipant: number;
    isEdited: boolean;
    frequencyType: string;
    value: number;
    joinedDate: number;
    accessType: string;
    visibleUpTo: number;
    entryFee: number;
  }

  export interface ChallengeDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: ChallengeData;
  }

};
