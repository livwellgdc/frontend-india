declare namespace SpinWheel {
  export interface SpinWheelData extends CommonInterface.Id {
    value: Number,
    title?: String,
    description?: {
      en: string;
      vi: string;
    };
    weight: Number,
    isEdit?: boolean;
  }

  export interface SpinWheelDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: SpinWheelData;
  }
};