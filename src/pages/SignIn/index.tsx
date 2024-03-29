import React, { useCallback, useEffect, useState, useRef } from 'react';

import {
  TextInput,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { useAuth, } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
} from './styles';

interface SignInFormaData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [logo] = useState(new Animated.ValueXY({ x: 120, y: 206 }));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      KeyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      KeyboardDidHide,
    );
  }, []);

  function KeyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 60,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 103,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function KeyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 120,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 206,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const { signIn ,loading} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormaData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Informe nome de usuário'),
          password: Yup.string().required(' Informe sua senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          username: data.username,
          password: data.password,
        });
        if (loading) {
          return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#999" />
          </View>
        );
        }
     }
         catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer login',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView  contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Animated.Image
              style={{
                width: logo.x,
                height: logo.y,
              }}
              source={logoImg}
            />

            <View>
              <Title>Faça seu login no Aqua</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                name="username"
                icon="user"
                placeholder="Nome de usuário"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <View>
                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Entrar
                </Button>
              </View>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
