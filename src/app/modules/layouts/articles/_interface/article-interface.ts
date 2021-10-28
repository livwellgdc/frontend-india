declare namespace Article {
  export interface ArticleData extends CommonInterface.Id {
    categoryId: {
      _id: string,
      name: CommonInterface.Language
    },
    title: string;
    description?: string;
    isRecommended: boolean;
    created?: number;
    articleLink: string;
    authorName?: string;
    image: string;
  }

  export interface ArticleDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: ArticleData;
  }

};
