declare namespace CommonInterface {

  export interface Id {
    _id: string;
  }

  export interface Language {
    en: string;
    vi: string;
  }

  export interface Location {
    address: string;
    coordinates: string[];
  }

  export interface ResponseStatusCodeMsg {
    statusCode: number;
    message: string;
    data: object | any;
  }

}

