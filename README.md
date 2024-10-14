# Extraform

Extraform is a lightweight library for handling form data and search parameters in web applications.

## Installation

To install Extraform, use your preferred package manager:

```bash
npm install extraform
# or
yarn add extraform
# or
pnpm add extraform
```

## Usage

### Input Names and Form Values

Extraform uses the `name` property of input elements to create structured form data. To access form values:

1. Ensure all input elements have a `name` attribute.
2. For non-input values, use hidden inputs with the desired name.

### Naming Convention

Extraform uses a special naming convention to create nested objects and arrays from form inputs:

- Use dot notation (`.`) for nested objects
- Use indexed notation (`[index]`) for arrays

Example:

```html
<input name="user.firstName" value="John" />
<input name="user.lastName" value="Doe" />
<input name="age" value="30" />
<input name="contacts[0].email" value="friend1@example.com" />
<input name="contacts[0].phone" value="1234567890" />
<input name="contacts[1].email" value="friend2@example.com" />
<input name="contacts[1].phone" value="0987654321" />
```

This will result in the following data structure:

```typescript
type FormData = {
  user: {
    firstName: string;
    lastName: string;
  };
  age: string;
  contacts: Array<{
    email: string;
    phone: string;
  }>;
};
```

### Type Inference and Safe Input Naming

Extraform supports TypeScript and provides type inference for your input names based on your structured data type. This ensures type safety when defining input names. Here's how to use it:

```tsx
import { inferInputNames } from 'extraform';

// Define your form structure
type FormStructure = {
  user: {
    firstName: string;
    lastName: string;
  };
  age: number;
  contacts: Array<{
    email: string;
    phone: string;
  }>;
};

// Infer input names from the FormStructure
type InferredInputNames = inferInputNames<FormStructure>;

// And use these names safely in your JSX or HTML
<input name={"user.firstName" satisfies InferredInputNames} />
<input name={"contacts[0].email" satisfies InferredInputNames} />

// Processing the form data
import { extractStructuredFormData } from 'extraform';

const formData = new FormData(formElement);
const data = extractStructuredFormData<FormStructure>(formData);
```

This approach ensures that:

1. Your input names are correctly inferred from your `FormStructure` type.
2. You get TypeScript errors if you try to use an input name that doesn't match the structure.
3. The processed form data matches your `FormStructure` type.

### Processing Form Data and Search Parameters

Extraform provides three main functions to process form data and search parameters:

1. `extractStructuredFormData`: Processes form data
2. `extractSearchDataFromRequest`: Processes URL search parameters
3. `extractFormDataFromRequest`: Processes form data from a request object

Example usage:

```typescript
import { extractStructuredFormData, extractSearchDataFromRequest, extractFormDataFromRequest } from 'extraform';

// Processing form data
const formData = new FormData(formElement);
const processedFormData = extractStructuredFormData(formData);

// Processing search parameters
const searchParams = new URLSearchParams(window.location.search);
const processedSearchData = extractSearchDataFromRequest(searchParams);

// Processing form data from a request object (e.g., in a server environment)
async function handleRequest(request: Request) {
  const formData = await extractFormDataFromRequest(request);
  // Use the extracted form data
}
```

## API Reference

### `inferInputNames<T>(): InferredInputNames`

A type-level utility that infers input names from a given structure type `T`.

### `extractStructuredFormData(formData: FormData): object`

Processes a `FormData` object and returns a structured JavaScript object.

### `extractSearchDataFromRequest(searchParams: URLSearchParams): object`

Processes a `URLSearchParams` object and returns a structured JavaScript object.

### `extractFormDataFromRequest(request: Request): Promise<object>`

Extracts and processes form data from a Request object. This is particularly useful in server-side environments or when working with fetch API requests.

## Contributing

We welcome contributions! Please follow these steps:

1. Check the issue tracker for open issues that interest you.
2. If you have a new feature idea or notice a bug, open a new issue to discuss it before making changes.
3. Fork the repository and make your changes.
4. Run `pnpm run test` to run the tests.
5. Run `pnpm run build` to build the project.
6. Add documentation if needed.
7. Push your changes to your fork on GitHub.
8. Submit a pull request to the main repository.
9. Wait for the review and merge.

## License

Extraform is [MIT licensed](LICENSE).
