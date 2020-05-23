import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { useFocusEffect } from 'react-navigation-hooks'
import { View,
         Text,
         ScrollView,
         ActivityIndicator,
         TouchableOpacity,
         Alert,
         Image,
         Clipboard,
         Linking } from 'react-native';
import {WebView} from 'react-native-webview'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import api from '../../services/api'
import * as Font from 'expo-font'

import PDFReader from 'rn-pdf-reader-js'
import * as WebBrowser from 'expo-web-browser';

 
import { Container,
         InforText,
         StudentsContainer,
         ModalLoad,
         TouchBox,
         FabContainer,
         FabButtom,
         PdfModal,
         BoxView,
         ButtomBox
         } from './styles';

export default function payment(){
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(0);
  const [barcode, setBarcode] = useState('');
  const [urlBoleto, setUrlBoleto] = useState('');
  const [student, setStudent] = useState('');
  const [student_id, setStudent_id] = useState('');
  const dataStudents = useSelector(state => state.student.profile);
  const email = useSelector(state => state.auth.email);
  
  useEffect(()=>{
    //console.tron.log(dataStudents)
    loadMyStudents();
    //open_pdf() 
  },[dataStudents]);


  async function loadMyStudents(){
    const aux_layout = [];
    //alert("entrou no effect")
    //const res = await api.get('vinculo');
   // console.tron.log(res.data)
    if(dataStudents.length > 0){
        aux_layout.push(
          <Container key={'page-1'}>
          <InforText style={{alignSelf:'center'}}>Alunos Vinculados</InforText>
            <StudentsContainer>         
                <ScrollView key={'page'}>
                <View style={{flex:1, alignItems:'center', paddingBottom:75}}>
                  {dataStudents.map((value, index)=>{
                    return(
                      <TouchBox key={'page-' + index} onPress={() => formas_pagamento(value.student.id, value.student.username)}>
                      <FontAwesome5 name="user-circle" size={30} color="#9B26A5"/>
                      <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>{value.student.matricula}</InforText>
                      <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>-</InforText>
                      <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>{value.student.username}</InforText>
                      </TouchBox>
                    )
                  })}
                  </View>
                </ScrollView>
            </StudentsContainer>
              
          </Container>
          )
        
     }else{
      aux_layout.push(
        <View key={'page'} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <InforText style={{fontSize:15}}>Nenhum aluno vinculado</InforText>
      </View>
        )
      
     }
    
    setLayout(aux_layout);

   await Font.loadAsync({
      'SquadaOne': require('../../../assets/fonts/SquadaOne-Regular.ttf'),
      'Hind': require('../../../assets/fonts/Hind-Regular.ttf')
    })
   
  }

  function formas_pagamento(selected_student_id, selected_student){
    setLoading(1);
    setStudent_id(selected_student_id);
    setStudent(selected_student);
  }

  async function fetch_boleto(){
    setLoading(2);
    const res = await api.post('payment', {
      student_id: student_id,
      email,
      description:`Mensalidade GymLife - ${student}`, 
     });

     setBarcode(res.data.barcode);
     setUrlBoleto(res.data.url)

     setLoading(3);
     //console.tron.log(res.data.data)

    /*
    let aux_layout = [];
    aux_layout.push(
      <View key={'page-pdf'} style={{flex:1}}>
        <PDFReader
          source={{
            uri: res.data.data
          }}
          //useGoogleReader={true}
          onLoadEnd={()=> setTimeout(()=> setLoading(0), 2500) }
          />

          <FabContainer style={{justifyContent:'flex-start', marginTop:35}}>
            <View style={{backgroundColor:'#210B61', padding:7, borderRadius:5}}>
              <InforText style={{color:'#FFF', fontSize:25}}>Preview</InforText>
            </View>
               
          </FabContainer>

          <FabContainer>
              <FabButtom onPress={()=> download_pdf()}>
                  <FontAwesome name="download" size={30} color="#FFF" />
              </FabButtom> 
          </FabContainer>
      </View>    
    );
    */
    //setLayout(aux_layout)
    //setLoading(0)
  }

  async function download_pdf(){

    Alert.alert(
      "Download do Boleto",
      `O boleto será salvo na pasta Downloads do seu celular`,
      [
        
        { text: "OK", onPress: async () => {
          //loadMyStudents();
          setLoading(0);
          await WebBrowser.openBrowserAsync(urlBoleto);

        } }
      ]
    );
  

  }

/*
 async function open_webview(student_id, student){
   setLoading(2);
   const res = await api.post('payment', {
    student_id,
    email,
    description:`Mensalidade GymLife - ${student}`, 
    amount: "12.37"
   });

   //alert(res.data);
   setLoading(2);
   let aux_layout = [];
     aux_layout.push(
      <View key={'page-1'} style={{flex: 1, justifyContent: 'center'}}>
          <WebView
          style={{flex:1, width:'100%', height:'100%'}}
          source={{
            uri: res.data
          }}
          //onNavigationStateChange={state => stateChange(state)}
          startInLoadingState={true}
          onLoadEnd={()=> setLoading(0)}
        />
      </View>
     );
     setLayout(aux_layout)

  }

  */
  
    return (
      <LinearGradient
      colors={['#2E2E2E', '#210B61', '#0B0B61']}
      style={{ flex:1 }}>
      
      <View style={{flex:1}}>

      {layout}

      <ModalLoad  isVisible={loading==1}>
        <View style={{flex:1, alignItems:'center'}}>

        <View style={{ width:'100%', alignItems:'flex-end', paddingTop:5, paddingRight:5}}>
            <TouchableOpacity onPress={()=> setLoading(0)}>
              <AntDesign name="close" size={30} color="#AAA"/>
            </TouchableOpacity>   
        </View>

          <InforText style={{alignSelf:'center', color:'#0B0B61'}}>Meios de Pagamento</InforText>
          <TouchableOpacity style={{marginTop:30}} onPress={() => { fetch_boleto() }}>
            <Image source={require('../../imgs/boleto.png')} />
          </TouchableOpacity>
        </View>                                     
      </ModalLoad>

      <ModalLoad  isVisible={loading==2}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#0B0B61" />
          <InforText style={{alignSelf:'center', color:'#0B0B61'}}>Gerando Boleto</InforText>
        </View>                                     
      </ModalLoad>



      <PdfModal  isVisible={loading==3}>
      <View style={{flex:1, alignItems:'center'}}>

          <View style={{ width:'100%', alignItems:'flex-end', paddingTop:5, paddingRight:5}}>
              <TouchableOpacity onPress={()=> setLoading(0)}>
                <AntDesign name="close" size={30} color="#AAA"/>
              </TouchableOpacity>   
          </View>
        
          <BoxView>
            <Text style={{alignSelf:'center', color:'#0B0B61', fontFamily: 'SquadaOne'}}>Mensalidade</Text>
            <Text style={{alignSelf:'center', color:'#0B0B61', fontFamily: 'SquadaOne', fontSize:45}}>R$100,00</Text>
          </BoxView>

          <BoxView style={{width:'100%', height:'30%', backgroundColor: '#F2F2F2', paddingVertical:10 }}>
            <InforText style={{alignSelf:'center', color:'#BDBDBD', fontSize:15}}>Utilize o numéro de código de barras abaixo</InforText>
            <InforText style={{alignSelf:'center', color:'#BDBDBD', fontSize:15}}>para realizar o pagamento:</InforText>
            <View style={{width:'80%', paddingTop:10}}>
                <InforText style={{color:'#000'}}>{barcode}</InforText>
            </View>
          </BoxView>

          <BoxView>
            <ButtomBox onPress={()=> Clipboard.setString(barcode)}>
              <FontAwesome5 name="copy" size={20} color="#FFF"/>
              <InforText style={{fontSize:15, marginLeft:15}}>COPIAR CÓDIGO</InforText>
            </ButtomBox>
          
            <ButtomBox onPress={()=> download_pdf()}>
              <FontAwesome5 name="file-download" size={20} color="#FFF"/>
              <InforText style={{fontSize:15, marginLeft:15}}>BAIXAR BOLETO</InforText> 
            </ButtomBox>

        </BoxView>
      </View>                                     
    </PdfModal>

     


      </View>   
        
   </LinearGradient>
    );
  
}

payment.navigationOptions = {
  tabBarLabel: 'Pagar',
  tabBarIcon: ({tintColor}) => (
    <FontAwesome name='dollar' size={25} color={tintColor} />
  )
}


