import styled from 'styled-components/native';
import Modal from 'react-native-modal';

export const Container = styled.View`
flex:1;
padding-top:30px;
padding-bottom:10px;

`;

export const StudentsContainer = styled.View`
width: 100%;
height: 90%;
border-radius: 30px;
border-width: 1px;
border-color: #C2D7FF;
margin-top:15px;

`

export const InforText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;

export const UserBox = styled.View`
width: 90%;
height: 80px;
padding-left: 10px;
background-color: #FFF;
border-radius: 20px;
margin-top: 10px;
flex-direction: row;
align-items:center;
`;

export const FabContainer = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content: flex-end;
    align-items:center;
  `;

export const FabButtom = styled.TouchableOpacity`
  background-color: #8B7FDD;
  height:70px;
  width:70px;
  border-radius:35px;
  justify-content:center;
  align-items:center;
  padding:5px;
  margin-right:15px;
  margin-bottom:20px;
  `;
  export const ModalLoad = styled(Modal)`
  width:90%;
  height:100%;
  background-color:#FFF;
  border-radius:10px;
  border-width:3px;
  border-color: #657BE5;
  `;

export const PdfModal = styled(Modal)`
width:90%;
height:100%;
background-color:#FFF;
border-radius:10px;
`;

  export const TouchBox = styled.TouchableOpacity`
width: 90%;
height: 80px;
padding-left: 10px;
background-color: #FFF;
border-radius: 20px;
margin-top: 10px;
flex-direction: row;
align-items:center;
  `;

export const BoxView = styled.View`
  width: 100% ;
  height: 30% ;
  justify-content:center;
  align-items: center;
`;

export const ButtomBox = styled.TouchableOpacity`
width: 90%;
height: 60px;
padding-left: 10px;
background-color: #0B0B61;
border-radius: 10px;
margin-top: 10px;
flex-direction: row;
align-items:center
  `;
