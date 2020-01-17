# Actions On Google Interactive Canvas Starter 

The project was built to highlight features for Canvas, namely:
- Custom Marks in SSML
- Integration with Firebase Realtime DB 
- HTML5 Video
- Header Height
[Read more in the official documentation] (https://developers.google.com/assistant/interactivecanvas/reference/interactivecanvas)

Additionally:
- Enforcing Device Orientation

This sample demonstrates how to create an [Interactive Canvas](https://developers.google.com/assistant/interactivecanvas/) experience using Actions on Google for the Google Assistant. It uses the [Node.js client library](https://github.com/actions-on-google/actions-on-google-nodejs) and is deployed on [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/) and [Firebase Hosting](https://firebase.google.com/docs/hosting).
The chat feature is powered by a [Realtime Firebase Database](https://firebase.google.com/docs/database).

## Setup Instructions
### Prerequisites
1. Node.js and NPM
    + We recommend installing using [nvm for Linux/Mac](https://github.com/creationix/nvm) and [nvm-windows for Windows](https://github.com/coreybutler/nvm-windows)
1. Install the [Firebase CLI](https://developers.google.com/assistant/actions/dialogflow/deploy-fulfillment)
    + We recommend using MAJOR version `7` with `7.1.1` or above, `npm install -g firebase-tools@^7.1.1`
    + Run `firebase login` with your Google account

### Configuration
#### Actions Console
1. From the [Actions on Google Console](https://console.actions.google.com/), add a new project > **Create Project** > under **More options** > **Conversational**
1. Click **Deploy** in the top menu. Then, click **Additional information**.
    1. Under **Category**, select **Games & fun**
    1. Under **Interactive Canvas** *Do your Actions use Interactive Canvas?*, check **Yes**
1. Click **Develop** in the top menu. Then, click **Actions** > **Add Your First Action** > **Custom intent** > **BUILD** (this will bring you to the Dialogflow console) > Select language and time zone > **CREATE**.
1. In the Dialogflow console, go to **Settings** ⚙ > **Export and Import** > **Restore from zip** using the `agent.zip` in this sample's directory.

#### Firebase Deployment
1. On your local machine, in the `functions` directory, run `npm install`
1. Run `firebase deploy --project {PROJECT_ID}` to deploy the function and hosting
    + To find your **Project ID**: In [Dialogflow console](https://console.dialogflow.com/) under **Settings** ⚙ > **General** tab > **Project ID**.

#### Dialogflow Console
1. Return to the [Dialogflow Console](https://console.dialogflow.com) > select **Fulfillment** > **Enable** Webhook > Set **URL** to the **Function URL** that was returned after the deploy command > **SAVE**.
    ```
    https://${REGION}-${PROJECT_ID}.cloudfunctions.net/dialogflowFirebaseFulfillment
    ```
1. From the left navigation menu, click **Integrations** > **Integration Settings** under Google Assistant > Enable **Auto-preview changes** >  **Test** to open the Actions on Google simulator then say or type `Talk to my test app`.

#### Connecting to Firebase Realtime DB
1. Go to the [firebase console](https://firebase.corp.google.com/u/0/) and fill in the parameters discribed in the [config.js](https://github.com/dkanda/Interactive-Canvas-Starter/blob/master/public/config.js) file.

### Running this Sample
+ You can test your Action on any Google Assistant-enabled device on which the Assistant is signed into the same account used to create this project. Just say or type, “OK Google, talk to my test app”.
+ You can also use the Actions on Google Console simulator to test most features and preview on-device behavior.
