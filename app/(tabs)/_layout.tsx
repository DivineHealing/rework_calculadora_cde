import { Link, Tabs } from 'expo-router';
import FontAwesome2 from '@expo/vector-icons/Foundation';
import FontAwesome3 from '@expo/vector-icons/Ionicons';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'rgb(255, 224, 224)',
        tabBarStyle:{
          backgroundColor: 'rgb(39, 39, 39)'
        }
      }}>
      <Tabs.Screen
        name="atributo"
        options={{
          title: 'Atributo',
          tabBarIcon: ({ color }) => <FontAwesome2 name="torso" size={30} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>                   
          ),
        }}
      />
      <Tabs.Screen
        name="reforco"
        options={{
          title: 'Reforço',
          tabBarIcon: ({ color }) => <FontAwesome3 name="sparkles-sharp" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dano"
        options={{
          title: 'Dano',
          tabBarIcon: ({ color }) => <TabBarIcon name="nuke" color={color}/>,
        }}
      />
      <Tabs.Screen
        name="defesa"
        options={{
          title: 'Defesa',
          tabBarIcon: ({ color }) => <TabBarIcon name="shield" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
