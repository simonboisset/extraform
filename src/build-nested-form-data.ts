export type FormDataStructure<T> = {
  [P in keyof T]?: T[P] extends string[]
    ? string[]
    : T[P] extends Record<string, any>
      ? FormDataStructure<T[P]>
      : string;
};

export const parseStringToNumber = (value: unknown) => {
  const n = typeof value === 'string' ? (!value ? undefined : Number(value.replace(',', '.'))) : value;
  if (typeof n !== 'number' || (n !== 0 && !n)) {
    return undefined;
  }
  return n;
};

export const buildNestedFormData = (data: FormDataStructure<any>, key: string, value: string | undefined) => {
  const [firstKey, ...nestedKeys] = key.split('.');
  if (nestedKeys.length > 0) {
    if (!data[firstKey]) {
      data[firstKey] = {};
    } else if (Array.isArray(data[firstKey] && parseStringToNumber(nestedKeys[0]) === undefined)) {
      throw new Error('[Build nested form data] Value is Array but key is not a number.');
    }

    buildNestedFormData(data[firstKey] as FormDataStructure<any>, nestedKeys.join('.'), value);
  } else {
    if (!data[firstKey]) {
      data[firstKey] = value;
    }
  }
};
