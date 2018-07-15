import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,TextInput,
  Dimensions,Alert
} from 'react-native';

const base64 = require('base-64');

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 3)-10

export default class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      page: 1,
      searchText: ''
    }
  }

  _keyExtractor = (item, index) => item.id;

  renderRowItem = (itemData) => {
    return (
      <View>
        <Image style={{ borderWidth: 1, borderColor: 'black',margin: 5,height: 150,  width : equalWidth}} source={{ uri: itemData.item.assets.large_thumb.url }} resizeMode='cover' />
      </View>
    )
  }

  componentDidMount() {
    {}
  }

  onSubmitEdit = (text) => {
    // whatever you want to do on submit
    console.log(text);
    this.setState({
    searchText: text,
    imageList: []
}, () => this.getMoviesFromApiAsync(this.state.page));

    ;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
                style={{textAlign:'center',marginTop: 60,height: 40, borderWidth: 1, borderColor: 'black'}}
                placeholder="Type here to Search Images!"
                returnKeyType = {"search"}
                underlineColorAndroid='transparent'
              onChangeText={(TextInputSearch) => {
                  if (TextInputSearch.length < 2){
                  this.setState({
                imageList: []
            })}}}
                onSubmitEditing={(event) => {this.onSubmitEdit(event.nativeEvent.text)}}
              />
        <FlatList
          data={this.state.imageList}
          numColumns={3}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
          onEndReachedThreshold ={0.9}
          onEndReached={() => {this.getMoviesFromApiAsync(this.state.page + 1)}}
        />
      </View>
    );
  }


  getMoviesFromApiAsync = (pageNo) => {
  if (this.state.searchText){
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("3352aeffbd24d33f8859:097f832242ad371d9f012770cabdb1e6cebc433a"));

    return fetch(`https://api.shutterstock.com/v2/images/search?query=${this.state.searchText}&per_page=100&page=${pageNo}`, {
         method: 'GET',
        headers: headers
})
      .then((response) => response.json())
      .then((responseJson) => {

       //alert(JSON.stringify(responseJson))

        this.setState({ imageList:   [...this.state.imageList, ...responseJson.data]}) // this will update state to re-render ui
        if (this.state.page > pageNo){
        this.setState({ page: pageNo })
}
          return responseJson.data;
      })
      .catch((error) => {
        console.error(error);
      });
}
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  }
});
