
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBSDK,{LoginManager} from 'react-native-fbsdk';
const {
  LoginButton,
  AccessToken
} = FBSDK;

export default class giftforyou extends Component {
  _fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
      if (result.isCancelled) {
        console.log('Login was cancelled');
      }else {
        console.log('Login was a success '+result.grantedPermissions.toString());
        AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data);
                  }
                );
        console.log(AccessToken);
      }
    }, function(error) {
      console.log('An error : '+error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth()}>
          <Text>Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('giftforyou', () => giftforyou);
