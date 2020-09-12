//Alberto Gomes

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount(){
    fetch('http://professornilson.com/testeservico/clientes').then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      })
    })
  }

  _postData = async () => {
      
    //this.setState({text: 'Clicou!'})
    fetch('http://professornilson.com/testeservico/clientes',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //body: formData
      body: JSON.stringify({
        nome: 'Não fica apagando por favor',
        telefone: '77777-5555',
        cpf: '012.345.678-00'
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({text: JSON.stringify(responseJson)})
    })
  }
  _updateData = async (id, nome, telefone, cpf) => {
      
    this.setState({text: 'Clicou!'})
    fetch('http://professornilson.com/testeservico/clientes/175' ,{
      method: 'PUT',
      mode: 'CORS',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //body: formData
      body: JSON.stringify({
        nome: teste2,
        telefone: 99999,
        cpf: '000.111.222-33'
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({text: JSON.stringify(responseJson)})
    })
  }
  
  _renderItem = ({item}) => (
    
      <View style={styles.item}>
        <Text>ID: {item.id}</Text>
        <Text>Nome: {item.nome}</Text>
        <Text>CPF: {item.cpf}</Text>
        <Text>E-MAIL: {item.email}</Text>
        <Text>TELEFONE: {item.telefone}</Text>
        <Text>ID USUÁRIO: {item.id_usuario}</Text>
        <Text>DATA CADASTRO: {item.datacadastro}</Text>
      </View>
    
  );

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      )

    } else{
      
        return(
          <View style={styles.container}>

            <Button onPress={this._postData} title="POST DATA"/>
            <Button onPress={this._updateData} title="PUT DATA"/>
            
            <FlatList
              data={this.state.dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
          
        );
        
    }
   
  }
  
  
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  item: {
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA'
  }

});