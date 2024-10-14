import {parseEntriesIntoStructuredData} from './parse-entries';

export const extractFormDataFromRequest = async <T = any>(request: Request) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData) as Record<string, string | undefined>;

  return parseEntriesIntoStructuredData<T>(entries);
};
