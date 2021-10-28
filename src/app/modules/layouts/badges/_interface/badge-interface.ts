declare namespace Badge {
  export interface BadgeData extends CommonInterface.Id {
    name: string;
    created?: number;
    image: string;
    points: number;
    description: {
      en: string;
      vi: string;
    }
    type: string;
  }

  export interface BadgeDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: BadgeData;
  }

};
