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

// const SurveyQuestions = (props) => {
//   const [offlineData, setOfflineData] = useState([]);
//   const [surveyFormData, setSurveyFormData] = useState([]);

//   useEffect(() => {
//     fetchSurveyFormData();
//   }, []);

//   const fetchSurveyFormData = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM DMR',
//         [],
//         (_, resultSet) => {
//           const rows = resultSet.rows;
//           const data = [];
//           for (let i = 0; i < rows.length; i++) {
//             data.push(rows.item(i));
//           }
//           setSurveyFormData(data);
//           console.log('JSON data from DMR table:', data.map(item => JSON.parse(item.jsonData) ));
//         },
//         (tx, error) => console.error('Error fetching survey form data: ', error)
//       );
//     });
//   };

//   useEffect(() => {
//     createTables();
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

// const checkNetworkStatus = () => {
//   NetInfo.fetch().then(state => {
//     if (!state.isConnected ) {
//       console.log("User is offline, inserting offline data into the database--");
//       insertDataIntoDatabase(offlineData);
//       setOfflineData([]);
//     }
//   });
// };

//   const handleMessage = (event) => {

//     const messageData = JSON.parse(event.nativeEvent.data);
//     console.log('Received message from WebView:', messageData);

//     if (messageData ) {
//       // props.navigation.navigate('SurveyList')
//       const { question1, question2, question3 } = messageData;
//       console.log('Extracted values:', question1, question2, question3);
//       const dataToInsert = [
//         { item: question1 },
//         { item: question2 },
//         { item: question3 }
//       ];
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
//     console.log("data----->>>",offlineData);
//     const requestBody = {
//       techTeam: offlineData[0].item,
//       hkTeam: offlineData[1].item,
//       securityTeam: offlineData[2].item,
//     };
//     fetch('https://iw7qova7y8.execute-api.ap-south-1.amazonaws.com/Prod/manPowerData', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log('Data synced successfully with server');
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
//           source={{ uri:'https://fluffy-cucurucho-f84904.netlify.app/'}}
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

// export default SurveyQuestions;
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Button } from "react-native";
import WebView from "react-native-webview";
import { openDatabase } from "react-native-sqlite-storage";
import NetInfo from "@react-native-community/netinfo";
import { v4 as uuid } from "uuid";


const db = openDatabase({
  name: "Survey_App",
});

const SurveyQuestions = (props) => {
  const [offlineData, setOfflineData] = useState([]);

  const checkNetworkStatus = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        console.log("User is offline, inserting offline data into the database--");
        insertDataIntoDatabase(offlineData);
        setOfflineData([]);
      }
    });
  };
  const insertDataIntoDatabase = (data) => {
    data.forEach(submittedData => {
      const jsonData = { submittedData };
      const id = uuid();
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO DMRTWO (id, jsonData) VALUES (?, ?)",
          [id, JSON.stringify(jsonData)],
          () => console.log("Offline data inserted successfully."),
          (_, error) => console.error("Error inserting offline data: ", error)
        );
      });
    });
  };
  const handleSubmitSurvey = (submittedData) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        insertDMRData(submittedData);
        props.navigation.navigate("Details", { submittedData });
      } else {
        setOfflineData(prevData => [...prevData, submittedData]);
      }
    });
  };
    
  

  const insertDMRData = (submittedData) => {
    const jsonData = { submittedData };
    const id = uuid();
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO DMRTWO (id, jsonData) VALUES (?, ?)",
        [id, JSON.stringify(jsonData)],
        () => console.log("submittedDatainserted successfully."),
        (_, error) => console.error("Error inserting submittedData: ", error)
      );
    });
  };

  // const handleSubmitSurvey = (submittedData) => {
  //   insertDMRData(submittedData);
  //   props.navigation.navigate("Details", { submittedData });
  // };
  

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{ uri: "http://172.16.10.242:3000/" }}
          javaScriptEnabled={true}
          originWhitelist={["*"]}
          onMessage={(event) => {
            const submittedData = JSON.parse(event.nativeEvent.data);
            handleSubmitSurvey(submittedData);
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default SurveyQuestions;
