// SurveyWebView.js

import React from 'react';
// import { WebView } from 'react-native-webview';
// import WebView from 'react-native-webview';
// import { surveyJson } from '../json';// Import the surveyJson object
import { surveyJson } from '../json';
import WebView from 'react-native-webview';

const SurveyWebView = () => {
  const onSurveyComplete = (event) => {
    console.log("event---->>>",event);
    const surveyData = JSON.parse(event.nativeEvent.data);
    console.log('Survey Data:', surveyData);
    // Handle the survey data as needed
  };

  const Goggle ="https://www.google.com/"

  const surveyHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>SurveyJS in WebView</title>
        <script src="https://unpkg.com/survey-knockout/survey.ko.js"></script>
        <link href="https://unpkg.com/survey-knockout/survey.css" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <div id="surveyContainer"></div>
        <script>
            var json = ${JSON.stringify(surveyJson)};
            var survey = new Survey.Model(json);
            survey.onComplete.add(function (sender, options) {
                window.ReactNativeWebView.postMessage(JSON.stringify(sender.data));
            });
            survey.render("surveyContainer");
        </script>
    </body>
    </html>
  `;
 
 
  return   <WebView source={{ uri: 'https://www.google.com/' }} style={{ flex: 1 }} />;
  
    // <WebView
    //   originWhitelist={['*']}
    //   source={{ html: surveyHtml }}

    //   onMessage={onSurveyComplete}
    //   javaScriptEnabled={true}
    //   javaScriptEnabledAndroid={true}
    //   domStorageEnabled={true}
    //   // source={{uri:'https://www.google.com/'}}  style={{ flex: 1 }}
  
      
    // />
  
};

export default SurveyWebView;
