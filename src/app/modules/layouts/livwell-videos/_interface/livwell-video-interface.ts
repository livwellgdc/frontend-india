declare namespace LivwellVideo {
  export interface LivwellVideoData extends CommonInterface.Id {
    title: CommonInterface.Language;
    description: CommonInterface.Language;
    points: number;
    videoLink: string;
    created: number;
    status: string;
    categoryId: {
      _id: string;
      name: CommonInterface.Language;
    }
  }

  export interface LivwellVideoDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: LivwellVideoData;
  }

};
