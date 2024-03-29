import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from "react-native-gesture-handler";

import * as Yup from 'yup';
import {
  Container,
  Input,
  Description,
  Loans,
  Header,
  HeaderText,
} from './styles';
import api from '../../services';
import ItemContainer from '../../components/ItemContainer'
import ButtonDetail from '../../components/ButtonDetail'

interface loansRouteParams {
  id: number;
  full_name: string;
  phone: string;
}
interface loansDetail {
  // accept_date
  // status
  client: number;
  quantity: number;
  user: number;
  obs: string;
}

const initialValues: loansDetail = {
  client: 0,
  quantity: 0,
  user: 0,
  obs: '',
};

const schema = Yup.object().shape({
  obs: Yup.string().required('Informe uma orbservação'),
});

export default function CarboyLoanDetail() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as loansRouteParams;
  const [loans, setLoans] = useState<loansDetail>(initialValues);

  useEffect(() => {
    api.get(`/loans/${params.id}/`).then((response) => {
      setLoans({ ...loans, ...response.data });
    });
  }, [params.id]);

  const updateloans = (values: object) => {
    try {
      api.patch(`/loans/${params.id}/`, values);
      Alert.alert('sucesso!', 'empréstimo atualizado');
    } catch {
      Alert.alert('fracasso!', 'contate o administrador do sistema.');
    }
  };
  function navigateToClientCreated() {
    navigation.navigate('CarboyLoanCreated')
  }
  return (
    <>

      <Header style={{ shadowColor: '#000', elevation: 8, }}>
        <RectButton>
          <FeatherIcon style={{paddingLeft: 12}}  onPress={navigateToClientCreated} name="arrow-left" color="#fff" size={24} />
        </RectButton>
        <HeaderText>Editar empréstimo</HeaderText>
        <FeatherIcon name="arrow-left" color="#3d9be9" size={24} />
      </Header>

      <Container>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Loans>
              <Formik
                initialValues={loans}
                enableReinitialize
                onSubmit={updateloans}
                validationSchema={schema}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                  return (
                    <>
                      <Description>Cliente: </Description>
                      <Input
                        autoCorrect={false}
                        placeholder="Cliente"
                        keyboardType="numeric"
                        onChangeText={handleChange('client')}
                        onBlur={handleBlur('client')}
                        value={String(values.client)}
                        returnKeyType="next"
                      />

                      <Description>Quantidade: </Description>
                      <Input
                        autoCorrect={false}
                        placeholder="Quantidade"
                        keyboardType="numeric"
                        onChangeText={handleChange('quantity')}
                        onBlur={handleBlur('quantity')}
                        value={String(values.quantity)}
                        returnKeyType="next"
                      />

                      <Description>Usuário: </Description>
                      <Input
                        autoCorrect={false}
                        autoCapitalize="characters"
                        placeholder="Usuário"
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={String(values.user)}
                        keyboardType="numeric"
                        returnKeyType="next"
                      />

                      <Description>Observação: </Description>

                      <Input
                        autoCorrect={false}
                        autoCapitalize="words"
                        placeholder="Observação"
                        onChangeText={handleChange('obs')}
                        onBlur={handleBlur('obs')}
                        value={values.obs}
                        returnKeyType="next"
                      />
                      <ButtonDetail onPress={handleSubmit}>Salvar Edições</ButtonDetail>

                    </>
                  );
                }}
              </Formik>
            </Loans>

          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
      <ItemContainer />
    </>
  );
}
