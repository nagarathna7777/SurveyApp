// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,Button
// } from 'react-native';
// import WebView from 'react-native-webview';
// import { openDatabase } from 'react-native-sqlite-storage';
// import NetInfo from '@react-native-community/netinfo';

// const db = openDatabase({
//   name: "Survey_App",
// });

// const App = () => {
//   const [offlineData, setOfflineData] = useState([]);

//   useEffect(() => {
//     createTables(); // Call createTables function on component mount
//     checkNetworkStatus();
//   }, []);

//   const createTables = () => {
//     db.transaction(txn => {
//       txn.executeSql(
//         'CREATE TABLE IF NOT EXISTS checklist (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT)',
//         [],
//         () => {
//           console.log('Table created successfully');
//         },
//         error => {
//           console.error('Error creating table "checklist":', error);
//         }
//       );
//     });
//   };

//   const checkNetworkStatus = () => {
//     NetInfo.fetch().then(state => {
//       if (!state.isConnected ) {
//         // Device is offline and there is offline data
//         console.log("User is offline, inserting offline data into the database--");
//         insertDataIntoDatabase(offlineData);
//         setOfflineData([]); // Clear offline data after insertion
//       }
//     });
//   };

//   const handleMessage = (event) => {
//     const messageData = JSON.parse(event.nativeEvent.data);
//     console.log('Received message from WebView:', messageData);

//     if (messageData ) {
//       // Define a mapping of item values to text descriptions
//       const { question1, question2, question3 } = messageData;
//       console.log('Extracted values:', question1, question2, question3);

//       // Prepare the data to be inserted into the database
//       const dataToInsert = [
//         { item: question1 },
//         { item: question2 },
//         { item: question3 }
//       ];

//       // Map selected items to include both value and text
//       // const enrichedData = messageData.question7.map((itemValue) => {
//       //   const textDescription = itemTextMap[itemValue] || 'Unknown';
//       //   return { value: itemValue, text: textDescription };
//       // });

//       // console.log('Enriched Data with Text Descriptions:', enrichedData);

//       // Now you can proceed to insert `enrichedData` into the database
//       insertDataIntoDatabase(dataToInsert);
//       setOfflineData(dataToInsert)
//     }
//   };

//   const insertDataIntoDatabase = (items) => {
//     db.transaction(txn => {
//       items.forEach(item => {
//         console.log("item---->>>>",item);
//         const text = item.item; // Extract the text from the item object
//         console.log("Text to be inserted into checklist table:", text);
//         txn.executeSql(
//           'INSERT INTO checklist (item) VALUES (?)',
//           [text],
//           (_, result) => {
//             console.log(`Item '${text}' inserted into checklist table`);
//           },
//           (_, error) => {
//             console.error(`Error inserting item '${text}' into checklist table:`, error);
//           }
//         );
//       });
//     });
//   };
//   const syncDataWithServer = () => {
//     // Define the data object to be sent in the request body
//     console.log("data----->>>",offlineData);
//     const requestBody = {
//       techTeam: offlineData[0].item,
//       hkTeam: offlineData[1].item,
//       securityTeam: offlineData[2].item,
//     };
//     // Send the POST request with the data object as the body
//     fetch('https://iw7qova7y8.execute-api.ap-south-1.amazonaws.com/Prod/manPowerData', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody), // Convert the data object to a JSON string
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log('Data synced successfully with server');
//         // Optional: Clear data from local storage after successful sync
//         db.transaction(txn => {
//           txn.executeSql(
//             'DELETE FROM checklist',
//             [],
//             () => {
//               console.log('Local data cleared successfully');
//             },
//             error => {
//               console.error('Error clearing local data:', error);
//             }
//           );
//         });
//       } else {
//         console.error('Failed to sync data with server');
//       }
//     })
//     .catch(error => {
//       console.error('Error syncing data with server:', error);
//     });
//   };

//   return (
//     <>
//          <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={styles.flexContainer}>
//         <WebView
//           source={{ uri:'https://663b67a48378570e89d58941--fluffy-cucurucho-f84904.netlify.app'}}
//           javaScriptEnabled={true}
//           onMessage={handleMessage}
//         />
//         <Button title="Sync Data" onPress={syncDataWithServer} />
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   flexContainer: {
//     flex: 1,
//   },
// });

// export default App;
import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Details from './Screens/details';
import SurveyQuestions from './Screens/SurveyQuestions';
import SurveyList from './Screens/SurveyList';
import SubmittedScreen from './Screens/SubmittedScreen';
import Login from './Screens/Login';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}   options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Data Logger'}}  />
        <Stack.Screen name="Details" component={Details} options={{ title: 'List of DMR'}} />
        <Stack.Screen name="SurveyQuestions" component={SurveyQuestions} options={{ title: 'DMR Report'}}  />
        <Stack.Screen name="SurveyList" component={SurveyList} options={{ title: 'Survey List'}}  />
        <Stack.Screen name="SubmittedScreen" component={SubmittedScreen} options={{ title: 'Submitted Data'}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
