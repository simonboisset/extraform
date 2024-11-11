import { parseEntriesIntoStructuredData } from './parse-entries';

export const extractFormData = async <T = any>(formData: FormData) => {
  const entries = Object.fromEntries(formData) as Record<string, string | File | undefined>;

  return parseEntriesIntoStructuredData<T>(entries);
};

export const extractFormDataFromRequest = async <T = any>(request: Request) => {
  const formData = await request.formData();
  return extractFormData<T>(formData);
};
