
declare namespace Banner {
  export interface BannerData extends CommonInterface.Id {
    image: string;
    title: string;
    bannerLink: string;
    created?: number;
  }

  export interface BannerDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: BannerData;
  }

};
