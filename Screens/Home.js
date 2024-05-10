// import { View, Text ,TouchableOpacity} from 'react-native'
// import React from 'react'
// import { openDatabase } from 'react-native-sqlite-storage';
// import { v4 as uuid } from 'uuid'
// const db = openDatabase({
//   name: "Survey_App",
// });
// const Home = (props) => {
//   const createDMRTable = () => {
   
//         db.transaction(tx => {
//           tx.executeSql(
//             'CREATE TABLE IF NOT EXISTS DMRONE (id TEXT PRIMARY KEY, name TEXT, jsonData TEXT)',
//             [],
//             () => console.log('DMR table created successfully.'),
//             (tx, error) => console.error('Error creating DMR table: ', error)
//           );
//         });
   
//       error => console.error('Error opening database: ', error)

//   };
//   const insertDMRData = () => {
   
//         const jsonData = { key: {
//           "title": "Man Power",
//           "logoPosition": "right",
//           "pages": [
//            {
//             "name": "page1",
//             "elements": [
//              {
//               "type": "text",
//               "name": "question1",
//               "title": "DMR Date",
//               "inputType": "date"
//              },
//              {
//               "type": "text",
//               "name": "question5",
//               "title": "Tech Team",
//               "inputType": "number"
//              },
//              {
//               "type": "text",
//               "name": "question2",
//               "title": "HK Team",
//               "inputType": "number"
//              },
//              {
//               "type": "text",
//               "name": "question3",
//               "title": "Security",
//               "inputType": "number"
//              },
//              {
//               "type": "checkbox",
//               "name": "question4",
//               "choices": [
//                "Item 1",
//                "Item 2",
//                "Item 3",
//                "Item 4"
//               ]
//              }
//             ]
//            }
//           ]
//          } }; 
//          const id = uuid(); // Generate a UUID for each DMR
//          const name = 'DMR1'
//               db.transaction(tx => {
//           tx.executeSql(
//             'INSERT INTO DMRONE (id, name, jsonData) VALUES (?, ?, ?)',
//             [id, name, JSON.stringify(jsonData)],
//             () => console.log('DMR data inserted successfully.'),
//             (tx, error) => console.error('Error inserting DMR data: ', error)
//           );
   
//       },
//       error => console.error('Error opening database: ', error)
//     );
//   };
// //   const generateRandomName = () => {
// //   const names = ['DMR 1', 'DMR 2', 'DMR 3', 'DMR 4']; // Example names
// //   const randomIndex = Math.floor(Math.random() * names.length);
// //   return names[randomIndex];
// // };

//   return (
//     <TouchableOpacity style={{backgroundColor:"red" ,width:100,height:40,justifyContent:"center",alignItems:"center",alignSelf:"center",margin:10}} onPress={()=>{
//       createDMRTable();
//       insertDMRData();
//       props.navigation.navigate('Details')
//     }}>
//       <Text>DMR</Text>
//     </TouchableOpacity>
//   )
// }

// export default Home
// Home.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { v4 as uuid } from 'uuid';

const db = openDatabase({
  name: "Survey_App",
});

const Home = ({ navigation }) => {
  const createDMRTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS DMRTWO (id TEXT PRIMARY KEY, jsonData TEXT)',
        [],
        () => console.log('DMR table created successfully.'),
        (_, error) => console.error('Error creating DMR table: ', error)
      );
    });
  };

  // const insertDMRData = () => {
  //   const jsonData = { /* Your survey JSON data here */ };
  //   const id = uuid();
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'INSERT INTO DMRTWO (id, jsonData) VALUES (?, ?)',
  //       [id, JSON.stringify(jsonData)],
  //       () => console.log('DMR data inserted successfully.'),
  //       (_, error) => console.error('Error inserting DMR data: ', error)
  //     );
  //   });
  // };

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#19B394", width: 100, height: 80, justifyContent: "center", alignItems: "center", alignSelf: "center", margin: 10 ,borderRadius:10}}
      onPress={() => {
        createDMRTable();
        // insertDMRData();
        navigation.navigate('Details');
      }}
    >
      <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>DMR</Text>
    </TouchableOpacity>
  );
};

export default Home;
