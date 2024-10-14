export type InferInputNames<Params extends Record<string, any>> = {
  [K in keyof Params & string]: Params[K] extends Array<infer T>
    ? T extends Record<string, any>
      ? `${K}.${number}.${InferInputNames<T>}`
      : `${K}.${number}`
    : Params[K] extends Record<string, any>
      ? `${K}.${InferInputNames<Params[K]>}`
      : K;
}[keyof Params & string];

export type InferInputValues<
  Values extends Record<string, any>,
  InputName extends string,
> = InputName extends `${infer Key}.${infer Rest}`
  ? Key extends keyof Values
    ? Values[Key] extends Array<infer T>
      ? Rest extends `${number}.${infer SubRest}`
        ? T extends Record<string, any>
          ? InferInputValues<T, SubRest>
          : T
        : T
      : Values[Key] extends Record<string, any>
        ? InferInputValues<Values[Key], Rest>
        : Values[Key]
    : never
  : InputName extends keyof Values
    ? Values[InputName]
    : never;
