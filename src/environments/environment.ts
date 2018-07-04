// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

const url: string = "http://180.151.84.102/"
export const config = {
  production: false,
  envName: 'localhost',
  host: url + 'api-auth/v1/',
  loginHost: url + 'api-auth/v1/',
  accountHost: + 'api-accounts/v1/',
  adminhost: url + 'api-auth/api-accounts/v1/',
  walletHistory: url + 'api-wallet/api/v1/'
};

