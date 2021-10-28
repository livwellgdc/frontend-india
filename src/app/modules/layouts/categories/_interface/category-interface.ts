declare namespace Category {

  export interface CategoryData extends CommonInterface.Id {
    name: CommonInterface.Language;
    image: string;
    status: string;
    created: number;
    description?: string;
  }

  export interface CategoryDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: CategoryData;
  }

};
