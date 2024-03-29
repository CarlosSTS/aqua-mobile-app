import React, { useRef, useState, useEffect } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from '@react-navigation/native';

import api from "../../services/index";
import InputText from '../../components/InputText'
import { Container, ErrorValue } from "./styles";
import DateInput from "../../components/DateInput";
import RemoteSelect from "../../components/RemoteSelect";
import Button from '../../components/Button'
import moment from "moment";

/*
interface CreateClientRouteFormData {
  submit_date: string;
  quantity: Number;
  value: Number;
  client: Number;
  obs: string;
}
*/

const initialValues: any = {
  last_ship_date: moment().format("YYYY-MM-DD"),
  warning_sub_days: "",
  step_days: "",
  quantity: "",
  value: "",
  obs: "",
  client: "",
};

const schema = Yup.object().shape({
  step_days: Yup.number().required("Informe um periodo de entrga em dias").min(1),
  warning_sub_days: Yup.number().required("Informe uma antecedência de dias").min(0),
  client: Yup.number().required("Selecione um Cliente"),
  quantity: Yup.number().required("Informe uma quantidade").min(1),
  value: Yup.number().required("Informe um valor unitàrio").min(0.1),
  last_ship_date: Yup.string().required("Informe uma data"),
});

const ClientRouteCreate: React.FC = () => {

  const valueRef = useRef<TextInput>(null)
  const stepDaysRef = useRef<TextInput>(null)
  const warningSubDaysRef = useRef<TextInput>(null)

  const navigation = useNavigation();
  const [clients, setClients] = useState([]);

  const onSubmit = (values: any) => {
    try {
      api.post("/paths/", values)
      Alert.alert("Sucesso!", "rota de cliente cadastrada!")
      navigation.navigate('CreatedRouteClient')
    } catch {
      Alert.alert("Fracasso!", "contate o administrador do sistema")
    }
  };

  const getClientData = () => {
    api
      .get("/clients/", { params: { limit: 1000 } })
      .then((response) => setClients(response.data))
      .catch(() => Alert.alert("Fracasso", 'Contate o administrador do sistema.'));
  };

  useEffect(() => {
    getClientData();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Container>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={schema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                  <RemoteSelect
                    onSelectChange={handleChange("client")}
                    data={clients}
                    labelField="full_name"
                    valueField="id"
                    initialLabel="Selecione um cliente"
                  />
                  {errors.client && (
                    <ErrorValue>{errors.client}</ErrorValue>
                  )}

                  <InputText
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      valueRef.current?.focus()
                    }}
                    icon="shopping-cart"
                    onChangeText={handleChange("quantity")}
                    onBlur={handleBlur("quantity")}
                    placeholder="quantidade"
                    value={String(values.quantity)}
                  />
                  {errors.quantity && (
                    <ErrorValue>{errors.quantity}</ErrorValue>
                  )}

                  <InputText
                    ref={valueRef}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      stepDaysRef.current?.focus();
                    }}
                    icon="dollar-sign"
                    onChangeText={handleChange("value")}
                    onBlur={handleBlur("value")}
                    placeholder="valor unitário"
                    value={String(values.value)}
                  />
                  {errors.value && (
                    <ErrorValue>{errors.value}</ErrorValue>
                  )}

                  <InputText
                    ref={stepDaysRef}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      warningSubDaysRef.current?.focus();
                    }}
                    icon="truck"
                    onChangeText={handleChange("step_days")}
                    onBlur={handleBlur("step_days")}
                    placeholder="periodo de entrega (dias)"
                    value={String(values.step_days)}
                  />
                  {errors.step_days && (
                    <ErrorValue>{errors.step_days}</ErrorValue>
                  )}

                  <InputText
                    ref={warningSubDaysRef}
                    keyboardType="numeric"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    icon="zap"
                    onChangeText={handleChange("warning_sub_days")}
                    onBlur={handleBlur("warning_sub_days")}
                    placeholder="antecedência de (dias)"
                    value={String(values.warning_sub_days)}
                  />
                  {errors.warning_sub_days && (
                    <ErrorValue>
                      {errors.warning_sub_days}
                    </ErrorValue>
                  )}

                  <DateInput
                    icon="clock"
                    handleChange={handleChange("last_ship_date")}
                    value={values.step_days}
                  />
                  {errors.last_ship_date && (
                    <ErrorValue>{errors.last_ship_date}</ErrorValue>
                  )}

                  <Button onPress={handleSubmit}>Registrar</Button>
                </>
              )}
            </Formik>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ClientRouteCreate;
