import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonDetail from '../../components/ButtonDetail'

import {
  Container,
  ContainerList,
  RoutesTitle,
  RoutesDescription,
} from './styles';

const HomeSale: React.FC = () => {
  const navigation = useNavigation();

  function navigationSaleCreate() {
    navigation.navigate('SaleCreate')
  }

  function navigationSaleCreated() {
    navigation.navigate('SaleCreated')
  }

  return (
    <>

      <Container>
        <ContainerList>
          <RoutesTitle>Cadastrar Vendas.</RoutesTitle>
          <RoutesDescription>Acesse para registrar vendas.</RoutesDescription>
          <ButtonDetail onPress={navigationSaleCreate}>Acessar</ButtonDetail>

        </ContainerList>

        <ContainerList>
          <RoutesTitle>Vendas Registradas.</RoutesTitle>
          <RoutesDescription>Acesse para ver vendas registradas.</RoutesDescription>
          <ButtonDetail onPress={navigationSaleCreated}>Acessar</ButtonDetail>

        </ContainerList>

      </Container>

    </>
  )
}
export default HomeSale;
