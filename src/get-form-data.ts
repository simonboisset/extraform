import { parseEntriesIntoStructuredData } from './parse-entries';

export const extractStructuredFormData = <T = any>(extraformement: EventTarget) => {
  const rawFormData = new FormData(extraformement as HTMLFormElement);
  const formEntries = Object.fromEntries(rawFormData) as Record<string, string | undefined>;
  return parseEntriesIntoStructuredData<T>(formEntries);
};
