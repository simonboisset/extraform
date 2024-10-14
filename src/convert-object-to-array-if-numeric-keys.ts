import type {FormDataStructure} from './build-nested-form-data';
import {parseStringToNumber} from './build-nested-form-data';

export const convertObjectToArrayIfNumericKeys = <T>(data: FormDataStructure<T>) => {
  const keys = Object.keys(data) as (keyof FormDataStructure<T>)[];
  if (!Array.isArray(data) && typeof data === 'object') {
    if (keys.every(k => parseStringToNumber(k) !== undefined)) {
      const arrayValue: FormDataStructure<T>[] = [];
      keys.map(parseStringToNumber).sort();
      for (const k of keys) {
        let element = data[k] as any;
        if (element) {
          arrayValue.push(convertObjectToArrayIfNumericKeys(element) as any);
        }
      }
      return arrayValue;
    } else {
      let res = data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key] as any;
          if (element) {
            res[key] = convertObjectToArrayIfNumericKeys(element) as any;
          }
        }
      }
      return res;
    }
  }
  return data;
};
