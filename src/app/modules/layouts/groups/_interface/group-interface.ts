declare namespace Group {
  export interface GroupData extends CommonInterface.Id {
    name: {
      en: string;
      vi: string;
    }
    created?: number;
    image: string;
    shortName: string;
    userLimit: number;
    description: {
      en: string;
      vi: string;
    }
    privacy: string;
    totalParticipant: number;
    totalSteps: number;
  }

  export interface GroupDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: GroupData;
  }

};
