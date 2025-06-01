export const getMissingEntries = (expected: string[], actual: string[]): string[] =>
  expected.reduce((acc, expected) => {
    if (!actual.some((actual) => actual.toLowerCase() === expected.toLowerCase())) {
      return [...acc, expected];
    }
    return acc;
  }, [] as string[]);
