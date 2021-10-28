declare namespace Faq {
  export interface FaqData extends CommonInterface.Id {
    question: CommonInterface.Language;
    enAnswer: string;
    viAnswer: string;
    created?: number;
    position: number;
  }

  export interface FaqDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: FaqData;
  }

};
