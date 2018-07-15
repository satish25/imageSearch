/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback,Animated} from 'react-native';

export default class ListItem extends Component{

 state = {animantedPress : new Animated.Value(1)}

  animatedIn(){
    Animated.timing(this.state.animantedPress,{
    toValue: 0.8,
    duration: 500
}).start()
  }
  animatedOut(){
    Animated.timing(this.state.animantedPress,{
    toValue:1,
    duration: 500
}).start()
  }
  render() {
   const {itemWidth} = this.props
    return (

        <TouchableWithoutFeedback  onPressIn={()=>this.animatedIn()} onPressOut={()=>this.animatedOut()}>
          <Animated.View style={{margin:5, width: 200, height: 100, backgroundColor: 'tomato', transform:[
                        {
                            scale:this.state.animantedPress
                          }
                          ]}}>
              <Image style={{width: itemWidth, height: 100, backgroundColor: 'tomato'}} source={this.props.image}></Image>
          </Animated.View>
        </TouchableWithoutFeedback>

    );
  }
}
