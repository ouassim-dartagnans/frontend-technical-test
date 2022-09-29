type EnvVariables = 'NEXT_PUBLIC_API_BASE_URL' | 'NEXT_PUBLIC_BASE_HOST_URL';

type EnvValue = {
  [key in EnvVariables]: ReturnType<typeof getEnvironmentVariable>;
};

const envValues: EnvValue = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_BASE_HOST_URL: process.env.NEXT_PUBLIC_BASE_HOST_URL,
};

const getEnvironmentVariable = (environmentVariable: EnvVariables): string => {
  const unvalidatedEnvironmentVariable = envValues[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config: EnvValue = {
  NEXT_PUBLIC_API_BASE_URL: getEnvironmentVariable('NEXT_PUBLIC_API_BASE_URL'),
  NEXT_PUBLIC_BASE_HOST_URL: getEnvironmentVariable('NEXT_PUBLIC_BASE_HOST_URL'),
};
