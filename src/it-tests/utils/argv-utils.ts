const kieProjectParameter = "kie-project=";

/**
 * @returns value of 'kie-project' prcoess.argv argument
 */
export const kieProjectPath = (): string => {
  for (const arg of process.argv) {
    if (arg.includes(kieProjectParameter)) {
      return arg.replace(kieProjectParameter, "");
    }
  }

  throw new Error(
    "'kie-project' argument was not provided, please start tests as -- kie-project=<path-to-project> to specify a path to the kogito project"
  );
};
