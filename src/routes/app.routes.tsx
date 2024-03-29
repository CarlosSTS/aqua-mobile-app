import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Text } from 'react-native';

import ReportStackRoutes from './report.stack.routes';
import ClientStackRoutes from './client.stack.routes';
import PurchaseStackRoutes from './purchase.stack.routes';
import SaleStackRoutes from './sale.stack.routes';
import CarboyLoanStackRoutes from './carboyLoan.stack.routes';
import MoveStackRoutes from './move.stack.routes';
import ClientRouteStackRoutes from './routes.client.stack.routes';

import SignOut from '../pages/SignOut';

const Drawer = createDrawerNavigator();

const DrawerNavgation: React.FC = () => (

  <Drawer.Navigator
    drawerStyle={{
      backgroundColor: '#313131',
      paddingVertical: 20,
    }}
    drawerContentOptions={{
      activeBackgroundColor: '#fff',
      inactiveTintColor: '#FFF',
    }}
  >

    <Drawer.Screen
      name="ReportStackRoutes"
      component={ReportStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>
            Relatórios
          </Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="folder" />
        ),
      }}
    />

    <Drawer.Screen
      name="ClientStackRoutes"
      component={ClientStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>Clientes</Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="users" />
        ),
      }}
    />

    <Drawer.Screen
      name="PurchaseStackRoutes"
      component={PurchaseStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>Compras</Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="shopping-cart" />
        ),
      }}
    />

    <Drawer.Screen
      name="SaleStackRoutes"
      component={SaleStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>Vendas</Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="shopping-bag" />
        ),
      }}
    />

    <Drawer.Screen
      name="CarboyLoanStackRoutes"
      component={CarboyLoanStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>
            Empréstimos
          </Text>
        ),
        drawerIcon: ({ focused }) => (
         <FontAwesome color={focused ? '#313131' : '#fff'} name="handshake-o" />
        ),
      }}
    />

    <Drawer.Screen
      name="MoveStackRoutes"
      component={MoveStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>
            Movimentos
          </Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="repeat" />
        ),
      }}
    />

    <Drawer.Screen
      name="ClientRouteStackRoutes"
      component={ClientRouteStackRoutes}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>Rotas</Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="truck" />
        ),
      }}
    />
     <Drawer.Screen
      name="SignOut"
      component={SignOut}
      options={{
        unmountOnBlur: true,
        drawerLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#313131' : '#fff' }}>Sair</Text>
        ),
        drawerIcon: ({ focused }) => (
         <Feather color={focused ? '#313131' : '#fff'} name="log-in" />
        ),
      }}
    />

  </Drawer.Navigator>
);

export default DrawerNavgation;
