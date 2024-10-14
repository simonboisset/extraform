import {FormDataStructure, buildNestedFormData} from './build-nested-form-data';
import {convertObjectToArrayIfNumericKeys} from './convert-object-to-array-if-numeric-keys';

export const parseEntriesIntoStructuredData = <T = any>(entries: Record<string, string | undefined>) => {
  let structuredData: FormDataStructure<T> = {};
  for (const key in entries) {
    const value = entries[key];
    if (value) {
      buildNestedFormData(structuredData, key, value);
    }
  }

  const processedData = convertObjectToArrayIfNumericKeys(structuredData);
  if (Array.isArray(processedData) && processedData.length === 0) {
    return undefined;
  }
  return processedData as T;
};
