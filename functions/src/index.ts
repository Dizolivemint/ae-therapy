import * as functions from 'firebase-functions';

export const universal = functions.https.onRequest((request, response) => {
    require(`${process.cwd()}/dist/ae-therapy-webpack/server`).app(request, response);
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
