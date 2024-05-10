// import {View, Text, TouchableHighlight} from 'react-native';
// import React from 'react';

// const Details = (props) => {
//   return (
//     <View style={{}}>
//       <View style={{flexDirection: 'row'}}>
//         <TouchableHighlight
//           style={{
//             width: 100,
//             height: 40,
//             backgroundColor: '#a2d2ff',
//             margin: 10,
//             justifyContent: 'center',
//             borderRadius: 10,
//             alignItems: 'center',
//           }}>
//           <Text>Sync All</Text>
//         </TouchableHighlight>
//         <TouchableHighlight onPress={()=>{
//           props.navigation.navigate("SurveyQuestions")
//         }}
//           style={{
//             width: 100,
//             height: 40,
//             backgroundColor: '#a2d2ff',
//             margin: 10,
//             justifyContent: 'center',
//             borderRadius: 10,
//             alignItems: 'center',
//           }}>
//           <Text>New DMR</Text>
//         </TouchableHighlight>
//       </View>
//     </View>
//   );
// };

// export default Details;
// Details.js
import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
  name: "Survey_App",
});

const Details = (props) => {
  console.log("props----details", props);
  const submittedData = props.route.params?.submittedData; // Check if submittedData exists
  const questionLabels = {
    question1: 'DMR Date:',
    question2: 'Tech Team:',
    question3: 'HK Team:',
    question5: 'Security Team:',
  };
  const submittedDataArray = submittedData
    ? Object.entries(submittedData).map(([question, answer]) => ({
        question: questionLabels[question] || question,
        answer,
      }))
    : [];
    const [surveyResponses, setSurveyResponses] = useState([]);

    useEffect(() => {
      fetchSurveyResponses();
    }, []);

    useEffect(() => {
      fetchSurveyResponses();
    }, [props]);
  
    // const fetchSurveyResponses = () => {
    //   db.transaction(tx => {
    //     tx.executeSql(
    //       'SELECT * FROM DMRTWO',
    //       [],
    //       (_, resultSet) => {
    //         const rows = resultSet.rows;
    //         const data = [];
    //         for (let i = 0; i < rows.length; i++) {
    //           data.push(rows.item(i));
    //         }
    //         setSurveyResponses(data);
    //         console.log("fetchingResponses", data);
    //       },
    //       (_, error) => console.error('Error fetching survey responses: ', error)
    //     );
    //   });
    // };
  

    // const fetchSurveyResponses = () => {
    //   db.transaction(tx => {
    //     tx.executeSql(
    //       'SELECT * FROM DMRTWO',
    //       [],
    //       (_, resultSet) => {
    //         const rows = resultSet.rows;
    //         const data = [];
    //         for (let i = 0; i < rows.length; i++) {
    //           const item = rows.item(i);
    //           // Transform each row into the format expected by FlatList
    //           const formattedItem = {
    //             question: `DMR Date: ${item.question1}`,
    //             answer: `Tech Team: ${item.question2}\nHK Team: ${item.question3}\nSecurity Team: ${item.question5}`,
    //           };
    //           data.push(formattedItem);
    //         }
    //         setSurveyResponses(data);
    //         console.log("fetchingResponses", data);
    //       },
    //       (_, error) => console.error('Error fetching survey responses: ', error)
    //     );
    //   });
    // };

    const fetchSurveyResponses = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM DMRTWO',
          [],
          (_, resultSet) => {
            const rows = resultSet.rows;
            const data = [];
            for (let i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              const parsedData = JSON.parse(item.jsonData); 
              data.push(parsedData.submittedData); 
            }
            setSurveyResponses(data.reverse());
            console.log("fetchingResponses", data);
          },
          (_, error) => console.error('Error fetching survey responses: ', error)
        );
      });
    };
    

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Submitted Survey Data</Text> */}
      {submittedDataArray.length >= 0 ? (
        <>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Logic for syncing all responses
              }}
            >
              <Text style={styles.buttonText}>Sync All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('SurveyQuestions')}
            >
              <Text style={styles.buttonText}>New DMR</Text>
            </TouchableOpacity>
          </View>
       
          <FlatList
  data={surveyResponses}
  renderItem={({ item }) => {
    if (!item) {
      return null; // If item is undefined or null, return null to render nothing
    }
    console.log('Item:', item);
    return (
      <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.question}>DMR Date: {item.question1}</Text>
        <Text style={styles.answer}>Tech Team: {item.question2}</Text>
        <Text style={styles.answer}>HK Team: {item.question3}</Text>
        <Text style={styles.answer}>Security Team: {item.question5}</Text>
      </View>
    </View>
    );
  }}
  keyExtractor={(item, index) => index.toString()}
/>

        </>
      ) : (
        <Text>No submitted survey data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#19B394',
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color:"white"
  },
cardContainer: {
  backgroundColor: '#F0F4F7',
    marginVertical: 5,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
  },
});

export default Details;
