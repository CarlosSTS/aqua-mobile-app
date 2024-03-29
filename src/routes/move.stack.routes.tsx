import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeMove from '../pages/HomeMove';
import MoveCreate from '../pages/MoveCreate';
import MoveCreated from '../pages/MoveCreated';
import MoveDetail from '../pages/MoveDetail';

const MoveStack = createStackNavigator();

const MoveStackRoutes: React.FC = () => (
  <MoveStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#3d9be9',
      },
    }}
  >
    <MoveStack.Screen name="Movimentos" component={HomeMove} />
    <MoveStack.Screen name="MoveCreate" component={MoveCreate}
      options={{
        cardStyle: { backgroundColor: '#3d9be9' },
        title: "Cadastrar movimento"
      }}
    />
    <MoveStack.Screen name="MoveCreated" component={MoveCreated}
      options={{ title: 'Movimentos Registrados' }}
    />
    <MoveStack.Screen name="MoveDetail" component={MoveDetail}
      options={{ title: "Editar movimento" }}
    />

  </MoveStack.Navigator>
);

export default MoveStackRoutes;
