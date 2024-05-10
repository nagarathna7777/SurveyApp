import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const SubmittedScreen = ( props ) => {
  const { submittedData } = props.route.params;
  const questionLabels = {
    question1: 'DMR Date:',
    question2: 'Tech Team:',
    question3: 'HK Team:',
    question5: 'Security Team:',
  };
  const submittedDataArray = Object.entries(submittedData).map(([question, answer]) => ({
    question: questionLabels[question] || question,
    answer,
  }));

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Submitted Survey Data</Text>
    <FlatList
      data={submittedDataArray}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.question}>{item.question}</Text>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
  },
});

export default SubmittedScreen;
