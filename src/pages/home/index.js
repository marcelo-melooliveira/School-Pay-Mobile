import React, {useState, useEffect} from 'react';
import {
  Text,
  Alert,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  MainContainer,
  Title,
  InputText,
  PersonalButton,
  HeaderCheckout,
} from './styles';
import {WebView} from 'react-native-webview';
import Modal from "react-native-modal";
import socket from 'socket.io-client';

export default function Checkout() {

  const [loading, setLoading] = useState(false);
  const [idPagamento, setIdPagamento] = useState('1');
  const [emailPagamento, setEmailPagamento] = useState('meuemail@gmail.com');
  const [descricaoPagamento, setDescricaoPagamento] = useState(
    'Mensalidade GymLife',
  );
  const [vlrPagamento, setVlrPagamento] = useState('5.00');
  const [showCheckout, setShowCheckout] = useState(false);
  //const io = socket("http://192.168.1.7:3000");
  const io = socket("http://68.183.156.246:3000");

  useEffect(()=>{
    io.on('teste', data =>{
      alert(data.status);
      setShowCheckout(false);
    })
  })

  const stateChange = state => {
    switch (state.title) {
      case 'success':
        setShowCheckout(false);
        Alert.alert(
          'Pagamento aprovado!',
          `Recebemos seu pagamento de R$ ${vlrPagamento} reais`,
        );
        break;
      case 'pending':
        setShowCheckout(false);
        Alert.alert(
          'Pagamento pendente!',
          `Seu pagamento de ${vlrPagamento} está pendente de processamento, assim que for processado seguiremos com o pedido!`,
        );
        break;
      case 'failure':
        setShowCheckout(false);
        Alert.alert(
          'Pagamento não aprovado!',
          'Verifique os dados e tente novamente',
        );
        break;
    }
  };

  if (!showCheckout) {
    return (
      <MainContainer>
        <Title>Protótipo de pagamento</Title>
        <InputText
          value={idPagamento}
          onChangeText={text => setIdPagamento(text)}
          placeholder={'Informe o id do produto'}
          keyboardType={'numeric'}
        />
        <InputText
          value={emailPagamento}
          onChangeText={text => setEmailPagamento(text)}
          placeholder={'Informe o e-mail do comprador'}
          keyboardType={'email-address'}
        />
        <InputText
          value={descricaoPagamento}
          onChangeText={text => setDescricaoPagamento(text)}
          placeholder={'Informe a descrição da venda'}
        />
        <InputText
          value={vlrPagamento}
          onChangeText={text => setVlrPagamento(text)}
          placeholder={'Informe o valor do produto'}
          keyboardType={'numeric'}
        />
        <PersonalButton onPress={() => {setShowCheckout(true); setLoading(false)}}>
          <Text>Pagar R$ {vlrPagamento}</Text>
        </PersonalButton>
      </MainContainer>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <HeaderCheckout>
          <TouchableOpacity onPress={() => setShowCheckout(false)}>
            <Text style={{fontSize: 20, color: 'white'}}>{'<<'}</Text>
          </TouchableOpacity>
          <Title>Pagamento do pedido</Title>
        </HeaderCheckout>
        <WebView
          source={{
            uri: `http://68.183.156.246:3000/payments/checkout/${idPagamento}/${emailPagamento}/${descricaoPagamento}/${vlrPagamento}`,
          }}
          //onNavigationStateChange={state => stateChange(state)}
          startInLoadingState={true}
          onLoadEnd={()=> setLoading(false)}
        />

        <Modal style={{justifyContent:'center', alignItems:'center'}} isVisible={loading==1}>
                   <View style={{justifyContent:'center', alignItems:'center' ,width:'50%', height:'40%', padding:5,borderRadius:8, backgroundColor:'#F5F5F5'}}>
                         <Text>Aguarde</Text>
                         <Text>Carregando Pagamento</Text> 
                    </View>
        </Modal>

      </View>
    );
  }
}
