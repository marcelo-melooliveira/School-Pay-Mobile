import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ImageBackground,Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';
import { signInRequest } from '../../store/modules/auth/actions';


export default function login () {
const [email, setEmail] = useState();
const [password, setPassword] = useState();
//const [loading, setLoading] = useState(false);

const loading = useSelector(state => state.auth.loading);

const dispatch = useDispatch();
 

  

  async function handleSubmit(){
    dispatch(signInRequest(email, password));
    // const resp = await api.post('sessions',{
    //   email: "mm.ifce@gmail.com",
    //   password: "abcd1234"
    // })

    // alert(resp.data.token)

  }

  
    return (
      <LinearGradient
      colors={['#2E2E2E', '#210B61', '#0B0B61']}
      style={{ flex:1 }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

      <View style={{justifyContent:'center', alignItems:'center', marginBottom:50}}>

      <FontAwesome5 name="book-open" size={80} color="#FFF" />
      
      </View>
     


      <View style={styles.back_input}>
          <View style={{ height:55,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <FontAwesome name="user" size={35} color='#FFF' /> 
          </View>

          <TextInput 
            style={styles.input2}
            keyboardType='email-address'
            autoCapitalize={'none'}
            placeholder={'Digite seu email'}
            value={email}
            onChangeText={email => {setEmail(email)}}
            />
      </View>


      <View style={styles.back_input}>
          <View style={{ height:55,width:45, backgroundColor:'#877E7E', justifyContent:'center', alignItems:'center'}}>
          <Ionicons name="md-lock" size={35} color='#FFF' />  
          </View>

          <TextInput 
          style={styles.input2}
          secureTextEntry={true}
          autoCapitalize={'none'}
          placeholder={'Digite sua senha'}
          value={password}
          onChangeText={password => {setPassword(password)}}
          />
      </View>
  
      <TouchableOpacity style={styles.button} onPress={()=> handleSubmit()}>
          <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      

      <TouchableOpacity style={styles.button_cadastro} onPress={() => {this.props.navigation.navigate('Cadastro')}}>
          <Text style={styles.textButton}>Cadastre-se</Text>
      </TouchableOpacity>
      </View>

      </TouchableWithoutFeedback>

      <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={loading==1}>
      <ActivityIndicator size="large" color="dodgerblue" />
      
      </Modal>
      
      </LinearGradient>
    );
  }


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    //paddingHorizontal:20
  },
  back_input:{
    height:55,
    width:'100%',
    paddingHorizontal:20,
  // backgroundColor:'#000',
   //borderColor:'#EEE',
    //borderWidth:1,
    flexDirection:'row',
    marginBottom:10
   

  },
  input:{
    height:45,
    backgroundColor:'#fff',
    alignSelf:'stretch',
    borderColor:'#EEE',
    borderWidth:1,
    paddingHorizontal:20,
    marginBottom:10
  },

  input2:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignSelf:'stretch',
    borderColor:'#C2D7FF',
    borderTopWidth:5,
    borderBottomWidth:5,
    borderRightWidth:5,
    paddingHorizontal:20,
    //marginBottom:10
  },

  button:{
    alignItems:'center',
    justifyContent:'center',
    height:45,
    backgroundColor:'#8886F6',
    borderRadius:5,
    alignSelf:'stretch',
    paddingHorizontal:20,
    marginHorizontal:20,
    marginTop:10
  },
  button_cadastro:{
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    marginTop:20

  },
  textButton:{
    color:'#fff',
    fontWeight:'bold'

  }
})

