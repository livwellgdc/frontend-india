import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMemberShip'
})
export class FormatMemberShipPipe implements PipeTransform {

  transform(value: string): any {
    return MEMBERSHIP_TYPE[value] ? MEMBERSHIP_TYPE[value].DISPLAY_NAME : false;
  }

}

export const MEMBERSHIP_TYPE = {
  CENTURYON: {
    ID: 1,
    TYPE: "CENTURYON",
    DISPLAY_NAME: "Centuryon"
  },
  GOLD: {
    ID: 2,
    TYPE: "GOLD",
    DISPLAY_NAME: "Gold"
  },
  PLATINUM: {
    ID: 3,
    TYPE: "PLATINUM",
    DISPLAY_NAME: "Platinum"
  },
  UFC_GOLD: {
    ID: 4,
    TYPE: "UFC_GOLD",
    DISPLAY_NAME: "UFC Gold"
  },
  YOGA_PLUS: {
    ID: 5,
    TYPE: "YOGA_PLUS",
    DISPLAY_NAME: "Yoga Plus"
  },
  NON_MEMBER: {
    ID: 6,
    TYPE: "NON_MEMBER",
    DISPLAY_NAME: "Non Member"
  },
  DUES_RECURRENT: {
    ID: 7,
    TYPE: "DUES_RECURRENT",
    DISPLAY_NAME: "Dues Recurrent"
  },
  DELTA: {
    ID: 8,
    TYPE: "DELTA",
    DISPLAY_NAME: "Delta"
  },
  PREMIUM: {
    ID: 9,
    TYPE: "PREMIUM",
    DISPLAY_NAME: "Premium"
  },
  PRESTIGE: {
    ID: 10,
    TYPE: "PRESTIGE",
    DISPLAY_NAME: "Prestige"
  },
  PREMIER: {
    ID: 11,
    TYPE: "PREMIER",
    DISPLAY_NAME: "Premier"
  },
  SAPHIRRE: {
    ID: 12,
    TYPE: "SAPHIRRE",
    DISPLAY_NAME: "Saphirre"
  },
  GYM_CREDIT: {
    ID: 13,
    TYPE: "GYM_CREDIT",
    DISPLAY_NAME: "Gym Credit"
  },
  DUES_MEMBERSHIP: {
    ID: 14,
    TYPE: "DUES_MEMBERSHIP",
    DISPLAY_NAME: "Dues Membership"
  },
  STAFF: {
    ID: 15,
    TYPE: "STAFF",
    DISPLAY_NAME: "Staff"
  },
  PRESALE: {
    ID: 16,
    TYPE: "PRESALE",
    DISPLAY_NAME: "Presale"
  },
  SILVER: {
    ID: 17,
    TYPE: "SILVER",
    DISPLAY_NAME: "Silver"
  },
  DIAMOND: {
    ID: 18,
    TYPE: "DIAMOND",
    DISPLAY_NAME: "Diamond"
  },
  TITANIUM: {
    ID: 19,
    TYPE: "TITANIUM",
    DISPLAY_NAME: "Titanium"
  },
  SUNSHINE: {
    ID: 20,
    TYPE: "SUNSHINE",
    DISPLAY_NAME: "Sunshine"
  },
  ROYALE: {
    ID: 21,
    TYPE: "ROYALE",
    DISPLAY_NAME: "Royale"
  },
  EXCELSIOR: {
    ID: 22,
    TYPE: "EXCELSIOR",
    DISPLAY_NAME: "Excelsior"
  },
  ALTUS: {
    ID: 23,
    TYPE: "ALTUS",
    DISPLAY_NAME: "Altus"
  },
  RUBY: {
    ID: 24,
    TYPE: "RUBY",
    DISPLAY_NAME: "Ruby"
  },
  LOTUS: {
    ID: 25,
    TYPE: "LOTUS",
    DISPLAY_NAME: "Lotus"
  },
  ORCHID: {
    ID: 26,
    TYPE: "ORCHID",
    DISPLAY_NAME: "Orchid"
  },
  LILY: {
    ID: 27,
    TYPE: "LILY",
    DISPLAY_NAME: "Lily"
  },
  JASMINE: {
    ID: 28,
    TYPE: "JASMINE",
    DISPLAY_NAME: "Jasmine"
  },
  LAVENDER: {
    ID: 29,
    TYPE: "LAVENDER",
    DISPLAY_NAME: "Lavender"
  },
  UFC: {
    ID: 30,
    TYPE: "UFC",
    DISPLAY_NAME: "UFC"
  }
};
