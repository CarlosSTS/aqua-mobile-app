import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';

interface ClientData {
  id: number;
}

interface PurchaseData {
  id: number;
  quantity: number;
  value: number;
  obs: string;
  submit_date: any;
  client: ClientData;
}

export const Container = styled.SafeAreaView`
  margin: 20px;
  flex: 1;
  padding: 0 24px ${Platform.OS === 'android' ? 8 : 40}px;
`;

export const ShoppingList = styled(FlatList as new () => FlatList<PurchaseData>)`
margin-top:32px;
`;

export const Shopping = styled.View`
padding: 24px;
border-radius:8px;
background-color: #FFF;
margin-bottom: 16px;
`;

export const ShoppingProperty = styled.Text`
font-family: 'RobotoSlab-Medium';
font-size: 14px;
color: #4169b3;
font-weight: bold;
`;

export const ShoppingValue = styled.Text`
font-family: 'RobotoSlab-Medium';
margin-top: 8px;
font-size: 15px;
margin-bottom: 24px;
color: #737373;
`;

export const DetailsButton = styled(RectButton)`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const DetailsButtonText = styled.Text`
font-family: 'RobotoSlab-Medium';
color: #e02041;
font-size:15px;
font-weight:bold
`;
