import type { z } from "zod"

interface StandardSchemaIssue {
  message: string
  path?: Array<{ key: PropertyKey }>
}

interface StandardSchemaProps<Input, Output> {
  version: 1
  vendor: string
  validate: (
    input: unknown
  ) => Promise<{ value: Output } | { issues: StandardSchemaIssue[] }>
  types?: {
    input: Input
    output: Output
  }
}

export interface StandardSchemaV1<Input = unknown, Output = Input> {
  "~standard": StandardSchemaProps<Input, Output>
}

export function zodToStandardSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema
): StandardSchemaV1<z.input<TSchema>, z.output<TSchema>> {
  return {
    "~standard": {
      version: 1,
      vendor: "zod",
      async validate(input: unknown) {
        const parsed = await schema.safeParseAsync(input)
        if (parsed.success) {
          return { value: parsed.data }
        }

        return {
          issues: parsed.error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path.map((segment) => ({ key: segment as PropertyKey })),
          })),
        }
      },
      types: {
        input: undefined as unknown as z.input<TSchema>,
        output: undefined as unknown as z.output<TSchema>,
      },
    },
  }
}

