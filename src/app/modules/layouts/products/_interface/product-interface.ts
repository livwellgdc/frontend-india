declare namespace Product {
    export interface ProductData extends CommonInterface.Id {
      name: CommonInterface.Language;
      description: CommonInterface.Language;
      image: string;
      price: number;
      discount: number;
      code: string;
      manufacturer: string;
      variants: [Product.variants];
      offers: CommonInterface.Language;
      returnAndExchange: CommonInterface.Language;
      warranty: CommonInterface.Language;
      benifits: CommonInterface.Language;
      fetures: CommonInterface.Language;
      isLWCApplicable: boolean;
      lwcOfferList: [Product.lwcOfferList];
      specifications: [Product.specifications];
      media?: Media[];
      finalPrice?: number;
      availableLWC?: any;
      paymentMethods?: any;
    }
  
    export interface ProductDetail extends CommonInterface.ResponseStatusCodeMsg {
      data: ProductData;
    }

    export interface Media {
      url: string;
      type: string;
    }

    export interface specifications {
        title: string;
        value: string;
    }

    export interface variants {
      color: string;
      assets: [Product.assets]
      quantity: number;
    }
  
    export interface assets {
      type: string;
      url: string;
      thumbnail: string;
    }
  
    export interface lwcOfferList {
      lwc: number;
      price: number;
    }
  
};
  