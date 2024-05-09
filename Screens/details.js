import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';

const Details = (props) => {
  return (
    <View style={{}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          style={{
            width: 100,
            height: 40,
            backgroundColor: '#a2d2ff',
            margin: 10,
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text>Sync All</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>{
          props.navigation.navigate("SurveyQuestions")
        }}
          style={{
            width: 100,
            height: 40,
            backgroundColor: '#a2d2ff',
            margin: 10,
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text>New DMR</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Details;
