// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'wiregrasshockey',
    appId: '1:363929730770:web:1b4af1a4ba5e2d0633370b',
    databaseURL: 'https://wiregrasshockey-default-rtdb.firebaseio.com',
    storageBucket: 'wiregrasshockey.appspot.com',
    locationId: 'us-east1',
    apiKey: 'AIzaSyAou3P1tl2h2PgbtKQQub9A4Z2zIVAEkIg',
    authDomain: 'wiregrasshockey.firebaseapp.com',
    messagingSenderId: '363929730770',
    measurementId: 'G-F25DPB485K',
  },
  production: false,
  CURRENT_SEASON: "2022-2023",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
