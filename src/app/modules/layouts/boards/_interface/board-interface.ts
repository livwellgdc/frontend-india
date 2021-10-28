declare namespace Board {
  export interface BoardData extends CommonInterface.Id {
    name: {
      en: string;
      vi: string;
    }
    description: {
      en: string;
      vi: string;
    }
    image: string;
    created?: number;
    status: string;
  }

  export interface BoardDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: BoardData;
  }

};
