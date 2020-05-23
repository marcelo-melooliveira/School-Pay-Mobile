import React, {useState ,useEffect} from 'react';
import {useSelector} from 'react-redux'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api'
import { 
  parseISO, 
  format, 
  formatRelative, 
  formatDistance,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import pt from 'date-fns/locale/pt';

import { Container,
         Title,
         ScrollBox,
         InforText,
         PayBox
        } from './styles';

export default function myPayments() {
  const [layout, setLayout] = useState([]);

  useEffect(()=>{
    loadMyPayments();

   

  }, []);

  async function loadMyPayments(){
    const aux_layout = [];
    const res = await api.get('user-payment');
    //console.tron.log(res.data)
    if(res.data.length > 0){
        aux_layout.push(
            <ScrollView key={'page'}>
            <View style={{flex:1, alignItems:'center', paddingBottom:75}}>
              {res.data.map((value, index)=>{

                let data_formatada='';
                if(value.data_pagamento){
                  let data = parseISO(value.data_pagamento);               
                   data_formatada = format(
                  data, 
                  "dd/MM/yyyy 'ás' HH:mm"
                );
                }
                
                return(
                  <PayBox key={'page-' + index}>
                  
                  <InforText>Aluno: {value.student.username}</InforText>
                  <InforText>Matrícula:{value.student.matricula}</InforText>
                  <InforText>Status: {value.status}</InforText>
                  {data_formatada ? (<InforText>Pago em: {data_formatada}</InforText>):null}
                  
                  
                  </PayBox>
                )
              })}
              </View>
            </ScrollView>
          )
        
     }else{
      aux_layout.push(
        <View key={'page'} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <InforText style={{fontSize:15}}>Nenhum aluno vinculado</InforText>
      </View>
        )
      
     }
    
    setLayout(aux_layout);
    
  }

  return (
    <LinearGradient
      colors={['#2E2E2E', '#210B61', '#0B0B61']}
      style={{ flex:1 }}>
      <Container>
        <Title>Meus Pagamentos</Title>
        <ScrollBox>
          {layout}
        </ScrollBox>
      </Container>
      
      </LinearGradient>
  );
}

myPayments.navigationOptions = {
  tabBarLabel: 'Meus Pagamentos',
  tabBarIcon: ({tintColor}) => (
    <FontAwesome name='book' size={25} color={tintColor} />
  )
}
