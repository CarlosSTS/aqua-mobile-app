import React, { useState, useEffect } from "react";
import {  useRoute,useNavigation } from "@react-navigation/native";
import { ScrollView, Alert,KeyboardAvoidingView,Platform,} from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from "react-native-gesture-handler";

import {
  Container,
  Input,
  Description,
  Clients,
  Header,
  HeaderText

} from "./styles";
import api from "../../services";
import { Formik } from "formik";
import * as Yup from "yup";
import ItemContainer from '../../components/ItemContainer';
import ButtonDetail from '../../components/ButtonDetail'

interface clientDetailRouteParams {
  id: number;
  phone: string;
  full_name: string;

}
interface clientDetail {
  address: string;
  city: string;
  full_name: string;
  number_address: string;
  phone: string;
  preferred_price: string;
}

const initialValues: clientDetail = {
  address: "",
  city: "",
  full_name: "",
  number_address: "",
  phone: "",
  preferred_price: "",
};

const schema = Yup.object().shape({
  full_name: Yup.string().required("Informe um nome"),
});

export default function ClientDetail() {
  const route = useRoute();
const navigation = useNavigation();
  const params = route.params as clientDetailRouteParams;
  const [client, setClient] = useState<clientDetail>(initialValues);

  useEffect(() => {
    api.get(`/clients/${params.id}/`).then((response) => {
      setClient({ ...client, ...response.data });
    });
  }, [params.id]);

  const updateClient = (values: object) => {
    try {
    api
      .patch(`/clients/${params.id}/`, values)
       Alert.alert("sucesso!", "cliente atualizado")
       } catch{
        Alert.alert("fracasso!", "contate o administrador do sistema")
      }
  };
  function navigateToCarboyLoanCreated(){
navigation.navigate('ClientCreated')
  }
  return (
    <>

            <Header style={{shadowColor: '#000', elevation: 8, }}>
              <RectButton>
                <FeatherIcon style={{paddingLeft: 12}} onPress={navigateToCarboyLoanCreated} name="arrow-left" color="#fff" size={24}/>
              </RectButton>
              <HeaderText style={{paddingRight: 20}}>Editar cliente</HeaderText>
              <FeatherIcon name="arrow-left" color="#3d9be9" size={24}/>

            </Header>

      <Container>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

                      <Clients>

            <Formik
              initialValues={client}
              enableReinitialize={true}
              onSubmit={updateClient}
              validationSchema={schema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                return (
                  <>

                    <Description>Nome: </Description>
                    <Input
                      autoCapitalize="words"
                      autoCorrect={false}
                      placeholder="Nome completo"
                      onChangeText={handleChange("full_name")}
                      onBlur={handleBlur("full_name")}
                      value={values.full_name}
                      returnKeyType="next"
                    />

                    <Description>Telefone: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Número de contato"
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                    />
                    <Description>Cidade: </Description>

                    <Input
                      autoCorrect={false}
                      autoCapitalize="words"
                      placeholder="Nome da cidade"
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                      returnKeyType="next"
                    />
                    <Description>Preço Padrão: </Description>

                    <Input

                      keyboardType="numeric"
                      placeholder="Preço padrão"
                      onChangeText={handleChange("preferred_price")}
                      onBlur={handleBlur("preferred_price")}
                      value={String(values.preferred_price )}
                      returnKeyType="send"
                    />
          <ButtonDetail onPress={handleSubmit}>Salvar Edições</ButtonDetail>
                  </>
                );
              }}
            </Formik>
          </Clients>

        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
<ItemContainer />
    </>
  );
}
