// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlFirebase: 'https://tiendas-cb2ff-default-rtdb.europe-west1.firebasedatabase.app/',
  urlLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_CmzciMbVM_mGp1JGnQkDq7chb4W9qoc',
  urlGetuser: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA_CmzciMbVM_mGp1JGnQkDq7chb4W9qoc',
  urlFiles: 'http://localhost/S4_SistemaAdministrativo/adminAngular/src/assets/img/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
