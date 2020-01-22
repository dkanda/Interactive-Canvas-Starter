/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const { dialogflow, HtmlResponse } = require('actions-on-google');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = dialogflow({ debug: true });

// Configuration

const TARGET_PHONES = true;
const TARGET_SMART_DISPLAYS = true;

// End Configuration

// CONSTANTS

const WEB_BROWSER = 'actions.capability.WEB_BROWSER';
const CANVAS = 'actions.capability.INTERACTIVE_CANVAS';

// END CONSTANTS

app.intent('Default Fallback Intent', (conv) => {
  conv.ask(conv.input.raw);
  conv.ask(new HtmlResponse({
    url: `https://${firebaseConfig.projectId}.firebaseapp.com`,
  }));
})

app.intent('Default Welcome Intent', (conv) => {
  // Check surface capabilities to restrict to certain surfaces.
  if (!conv.surface.capabilities.has(CANVAS)
    || (conv.surface.capabilities.has(WEB_BROWSER) && TARGET_SMART_DISPLAYS)
    || (!conv.surface.capabilities.has(WEB_BROWSER) && TARGET_PHONES)) {
    let ssml = `<speak>Sorry, it looks like this device does not support canvas or support has been disabled.</speak>`;
    conv.close(ssml)
  } else {
    let ssml = `<speak>Welcome to the Canvas Example Action. Tap the buttons below to see different features of Canvas or speak your choice like, Show me a video</speak>`;
    conv.add(ssml)
    conv.ask(new HtmlResponse({
      url: `https://${firebaseConfig.projectId}.firebaseapp.com`,
    }));
  }
});

app.intent('SSML', (conv) => {
  let ssml = `<speak>This is server side ssml with <mark name="custom_marks"/> custom marks. You can use this marks to trigger <mark name="trigger"/> animation in your canvas action. </speak>`;
  conv.add(ssml)
  conv.add(new HtmlResponse({
    data: {
      command: 'SSML',
    },
    url: `https://${firebaseConfig.projectId}.firebaseapp.com`,
  }));
});

app.intent('Watch a video', (conv) => {
  conv.add(new HtmlResponse({
    data: {
      command: 'VIDEO',
    },
    url: `https://${firebaseConfig.projectId}.firebaseapp.com`,
  }));
});

app.intent('Chat', (conv) => {
  conv.add(new HtmlResponse({
    data: {
      command: 'CHAT',
    },
    url: `https://${firebaseConfig.projectId}.firebaseapp.com`,
  }));
});

app.intent('Close', (conv) => {
  conv.add("Well, see ya later!")
  conv.close(new HtmlResponse({
    url: `https://${firebaseConfig.projectId}.firebaseapp.com`,
  }));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
