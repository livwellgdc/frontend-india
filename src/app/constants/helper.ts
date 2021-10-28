export const dateToMs = (date: any, endDate?: any) => {
  if (!date) { return null }
  if (endDate) {
    let eDate = new Date(date);
    return +eDate.setHours(23, 59, 59)
  } else {
    return +new Date(date);
  }
}

export const timeWithDateMs = (time: any, date?: any) => {
  if (!time || time.length > 15) { return time; }
  if (date) {
    let formatDate = new Date(date);
    formatDate.setHours(new Date(time).getHours());
    formatDate.setMinutes(new Date(time).getMinutes());
    if (formatDate instanceof Date) {
      return + (new Date(formatDate.toUTCString())).setSeconds(0, 0);
    }
  }
}

export const getRandomStringsArray = (howManyStrings = 100) => {
  let randomResult = "";
  let stringsArray = [];
  for (let i = 0; i < howManyStrings; i++) {
    randomResult = `${generateRandomCombination(4, false)}${generateRandomCombination()}`;
    stringsArray.push(randomResult);
  }
  return removeDuplicates(stringsArray);
}

export const isDuplicate = (arrayOfData = []) => {
  let result = false;
  result = arrayOfData.some((element, index) => { return arrayOfData.indexOf(element) !== index });
  return result;
}

export const removeDuplicates = (arrayOfData = []) => {
  return arrayOfData.filter((value, index) => arrayOfData.indexOf(value) === index);
}

export const splitAt = index => x => [x.slice(0, index), x.slice(index)];

export const generateRandomCombination = (length = 4, isNoCombination = true) => {
  let result = "";
  let characters = isNoCombination ? "0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const autoGenerateCode = (codeValue, quantity) => {
  let result = [];
  let codeValueLength = String(codeValue).split('').length;
  let spiltedValueFirstPart = splitAt(codeValueLength - 4)(String(codeValue))[0];
  let spiltedValueSecondPart = Number(splitAt(codeValueLength - 4)(String(codeValue))[1]);
  for (let i = 0; i < quantity; i++) {
    result.push(`${spiltedValueFirstPart}` + `${spiltedValueSecondPart + i}`);
  }
  return result;
}

export const removePrefixFromArrayValues = (array = []) => {
  for (let i = 0, len = array.length; i < len; i++) {
    array[i] = array[i].toString().replace(/^S/, ''); //remove prefix
  }
  return array;
}

export const isObjEmpty = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const titleCase = (str: string) => {
  if (str) {
    return str.toLowerCase().split(' ').map((word) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  } else {
    return '';
  }
}

export const toUpperCase = (str: string) => {
  if (str) {
    return str.toUpperCase();
  } else {
    return '';
  }
}

export const encryptEmailPhone = (type: string, fieldValue: string) => {
  if (fieldValue) {
    switch (type) {
      case 'EMAIL':
        let begPart = fieldValue.split('@')[0];
        let lastPart = fieldValue.split('@')[1];
        let begPartLength = begPart.split('').length;
        let firstLetterOfBegPart = begPart.split('')[0];
        let lastLetterOfBegPart = begPart.split('')[begPartLength - 1];
        return `${firstLetterOfBegPart}******${lastLetterOfBegPart}@${lastPart}`;

      case 'PHONE':
        let fieldLength = fieldValue.split('').length;
        let spiltedValue = splitAt(fieldLength - 3)(fieldValue)[1];
        return `******${spiltedValue}`;

      default:
        return '';
    }
  } else {
    return '';
  }
}

export const dataURLtoFile = (dataurl: any, filename?, calback?) => {
  filename = (filename ? filename : filename = new Date().getTime() + ".png");
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], filename, { type: mime });
  calback(file);
}

export const isReadyToEndClass = (time: number, countDownTime: number) => {
  /**
   * @15=> 15 Min, @60=>60 Min By Default
   */
  switch (countDownTime) {
    case 15:
      if ((time - Date.now()) <= 15 * 60 * 1000) {
        return false;
      } else {
        return true;
      }
    default:
      if ((time - Date.now()) <= 60 * 60 * 1000) {
        return false;
      } else {
        return true;
      }
  }
}

export const checkSpaceAtStartEnd = (value: string) => {
  if (/^\s+|\s+$/g.test(value)) {
    return true;
  } else {
    return false;
  }
}

export const formatClassType = (value: string) => {
  switch (value) {
    case 'GROUPX':
      return 'Group X';
    default:
      return 'Yoga';
  }
}

export const formatChallengeType = (value: string) => {
  switch (value) {
    case 'STEPS':
      return 'Steps';
    case 'KILOMETRES':
      return 'Distance in Km';
    case 'CHECK_IN_CLUB':
      return 'Club Check In';
    case 'CLASS_BOOKING':
      return 'Class Booking';
    case 'CLASS_COMPLETED':
      return 'Class Completed';
    case 'VIDEO_CONTENT':
      return 'Premium Video Content';
    default:
      return '-';
  }
}

export const formatActivities = (value: string, moduleName: string = '') => {
  switch (value) {
    case 'CREATE':
      return 'Create';
    case 'DELETE':
      return 'Delete';
    case 'UPDATE':
      return 'Update';
    case 'ACTIVE':
      return 'Activate';
    case 'INACTIVE':
      return (moduleName ? 'Block' : 'Inactivate');
    case 'END':
      return 'End';
    case 'users':
      return 'User';
    case 'categories':
      return 'Category';
    case 'profile_interests':
      return 'Profile Interest';
    case 'classes':
      return 'Class';
    case 'challenges':
      return 'Challenge';
    case 'events':
      return 'Event';
    case 'articles':
      return 'Article';
    case 'rewards':
      return 'Reward';
    case 'badges':
      return 'Badge';
    case 'banners':
      return 'Banner';
    case 'clients':
      return 'Client';
    case 'clubs':
      return 'Club';
    case 'videos':
      return 'Livwell Video';
    case 'faqs':
      return 'FAQ';
    case 'contents':
      return 'Content Management';
    case 'TERMS_AND_CONDITIONS':
      return 'Terms & Condition';
    case 'PRIVACY_POLICY':
      return 'Privacy Policy';
    case 'ABOUT_US':
      return 'About Us';
    case 'CONTACT_US':
      return 'Contact Us';
    default:
      return value;
  }
}


