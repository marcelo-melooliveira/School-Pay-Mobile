import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import api from '../../services/api'
 
import { Container,
         InforText,
         StudentsContainer,
         UserBox,
         FabContainer,
         FabButtom,
         ModalLoad,
         TouchBox
         } from './styles';

import { updateStudentSuccess } from '../../store/modules/student/actions';


export default function data_user() {
  const [students, setStudents] = useState();
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(0);
  const [layoutModal, setLayoutModal] = useState([]);
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.username);

  

  useEffect(()=>{
    loadMyStudents();
  },[]);

  async function loadMyStudents(){
    const aux_layout = [];
    const res = await api.get('vinculo');
    //console.tron.log(res.data)
    if(res.data.length > 0){
        aux_layout.push(
            <ScrollView key={'page'}>
            <View style={{flex:1, alignItems:'center', paddingBottom:75}}>
              {res.data.map((value, index)=>{
                return(
                  <UserBox key={'page-' + index}>
                  <FontAwesome5 name="user-circle" size={30} color="#9B26A5"/>
                  <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>{value.student.matricula}</InforText>
                  <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>-</InforText>
                  <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>{value.student.username}</InforText>
                  <TouchableOpacity style={{flex:1, alignItems:'flex-end', paddingRight:10}} onPress={()=> deleteVinculo(value.student.id, value.student.username)}>
                    <FontAwesome name="trash" size={30} color="#9B26A5"/>
                  </TouchableOpacity>
                  
                  </UserBox>
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
    dispatch(updateStudentSuccess(res.data));
  }

  async function loadAllStudents(){
    setLoading(1);

    const res = await api.get('students');

    const aux_layout =[];

    aux_layout.push(
      <ScrollView key={'page2'}>
              <View style={{flex:1, alignItems:'center', paddingBottom:75}}>
                {res.data.map((value, index)=>{
                  return(
                      <TouchBox key={'page2-' + index} onPress={()=> vinculaStudent(value.id, value.username)}>
                        <FontAwesome5 name="user-circle" size={30} color="#9B26A5"/>
                        <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>{value.matricula}</InforText>
                        <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>-</InforText>
                        <InforText style={{fontSize:15, marginLeft:10, color:'#383438'}}>{value.username}</InforText>
                      </TouchBox>
                  )
                })}
                </View>
              </ScrollView>
    )
    setLayoutModal(aux_layout);
    setStudents(res.data);

  }

  async function vinculaStudent(id, name){

    Alert.alert(
      "Vinculo de pagamento",
      `Deseja adicionar ( ${name} ) na sua lista para pagamento de mensalidade?`,
      [
        
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => createVinculo(id) }
      ]
    );

  }

  async function createVinculo(id){
    const res = await api.post('vinculo', {student: id});

    if(res.data.student_id == id){

      Alert.alert(
        "Vinculo de pagamento",
        `Aluno adicionado com sucesso`,
        [
          
          { text: "OK", onPress: () => {loadMyStudents(); setLoading(0)} }
        ]
      );

    }
  }
  function deleteVinculo(id, name){
    //const res = await api.delete(`vinculo/${id}`);

      Alert.alert(
        "Vinculo de pagamento",
        `Deseja remover ( ${name} ) da sua lista para pagamento de mensalidade?`,
        [
          
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Sim", onPress: async () => {
            const res = await api.delete(`vinculo/${id}`);
            if(res.data == 1){
              Alert.alert(
                "Vinculo de pagamento",
                `Aluno removido com sucesso`,
                [
                  
                  { text: "OK", onPress: () => {loadMyStudents()} }
                ]
              );

            }
        
        } }
        ]
      );
  }
 
  return (
    <LinearGradient
      colors={['#2E2E2E', '#210B61', '#0B0B61']}
      style={{ flex:1 }}>
      <Container>
      <View style={{flex:1, justifyContent:'center', paddingLeft:15}}>
          <InforText>Olá, {username}</InforText>
      </View>
        
        <StudentsContainer>
          <View style={{alignItems:'center'}}>
              <InforText>Aluno(s) vinculado(s)</InforText>
          </View>
              
          {layout.length ? layout : (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
               <ActivityIndicator size="large" color="#FFF" />
            </View>
          )}
         
            <FabContainer>
              <FabButtom onPress={()=> loadAllStudents()}>
                  <AntDesign name="adduser" size={30} color="#FFF" />
              </FabButtom>
              
            </FabContainer>
        </StudentsContainer>
      </Container>

      <ModalLoad isVisible={loading==1}>
          <View style={{flex:1}}>
            <View style={{width:'100%',height:'10%', justifyContent:'center', alignItems:'center'}}>
                <InforText style={{alignSelf:'center'}}>Alunos</InforText>
            </View>

            <View style={{width:'100%',height:'90%'}}>

           {layoutModal.length ? layoutModal :(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size="large" color="#FFF" />
              </View> )
          
          }
              
             
              
            
            </View>
          </View>
          

      </ModalLoad>
      
      </LinearGradient>
  );
}

data_user.navigationOptions = {
  tabBarLabel: 'Meus Dados',
  tabBarIcon: ({tintColor}) => (
    <FontAwesome name='user-circle' size={25} color={tintColor} />
  )
}
