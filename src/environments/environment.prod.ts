// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  s3: {
    AWS_ACCESS_KEY: 'AKIASNBEQLTCOKURDA2M',
    AWS_SECRET_KEY: 'UXcrGYQfyzVqRTVPZyTfTYo1SbUyFxXhLSFQhQgv',
    REGION: 'AP_SOUTHEAST_1',
    BUCKET_NAME: 'livwell/web'
  },

  API_BASE_PATH: "https://in.api.livwell.asia/livwell/api/v1/",
  API_KEY: '1234',
  FINGER_PRINT: "Basic bGl2d2VsbDpsaXZ3ZWxsQDEyMw==",
  MAP_API_KEY: "AIzaSyCjREPYRmK1X1YWJDSonExO_pnmsLw617k"
};


