import {parseEntriesIntoStructuredData} from './parse-entries';

export const extractSearchDataFromRequest = <T = any>(request: Request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const entries = Object.fromEntries(searchParams.entries());
  return parseEntriesIntoStructuredData<T>(entries);
};
