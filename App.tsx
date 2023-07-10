import "react-native-get-random-values";

import React from "react";

//import RNBootSplash from "react-native-bootsplash";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CNPJ } from "./screens/cnpj/Cnpj";
import { Login } from "./screens/login/Login";
import { Home } from "./screens/home/Home";
import { RegisterCompany } from "./screens/register-company/RegisterCompany";
import { RegisterUser } from "./screens/register-user/RegisterUser";
import { Summary } from "./screens/summary/Summary";
import { Products } from "./screens/product/Products";
import { ProductInfo } from "./screens/product-info/ProductInfo";
import { Clients } from "./screens/clients/Clients";
import { Orders } from "./screens/orders/Orders";
import { OrderDetails } from "./screens/order-details/OrderDetails";
import { Setup } from "./screens/setup/Setup";
import { Help } from "./screens/help/Help";
import { ChangeCompany } from "./screens/change-company/ChangeCompany";

import { FirstAccess, RealmContext, User } from "./frameworks/realm/context";
const { RealmProvider, useQuery, useRealm } = RealmContext;
import { Sync } from "./screens/sync/Sync";
import { AddCompany } from "./screens/add-company/AddCompany";
import { IntroSlides } from "./components/IntroSlides";
import { ClientTabs } from "./screens/client-info/ClientInfo";
import { NewClientTabs } from "./screens/novo-cliente/NewClientTabs";
import { NewOrderNavigator } from "./screens/new-order/NewOrderStacks";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <RealmProvider>
      <Navigation />
    </RealmProvider>
  );
};

export function Navigation() {
  // React.useEffect(() => {
  //   RNBootSplash.hide();
  // }, []);

  const firstAccess: Realm.Results<FirstAccess> = useQuery(FirstAccess);
  const checkIfFirstAccessValue = () =>
    firstAccess[0].isFirstAccess === true ? true : false;
  const slidesBool = firstAccess.isEmpty() ? true : checkIfFirstAccessValue();

  const user: User | undefined = useQuery(User).find(
    (elem: User) => (elem.isLogged = true)
  );
  const homeBool = user?.current_company_id !== null ? "Home" : "CNPJ";
  const loggedBool = user !== undefined ? homeBool : "Login";

  const [initRoute] = React.useState<"IntroSlides" | "Login" | "Home" | "CNPJ">(
    slidesBool ? "IntroSlides" : loggedBool
  );

  const db = useRealm();
  React.useEffect(() => {
    if (firstAccess.isEmpty()) {
      db.write(() => {
        db.create("FirstAccess", FirstAccess.generate({ isFirstAccess: true }));
      });
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="IntroSlides" component={IntroSlides} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Resumo" component={Summary} />
        <Stack.Screen name="Pedidos" component={Orders} />
        <Stack.Screen name="NavegadorPedido" component={NewOrderNavigator} />
        <Stack.Screen name="Clientes" component={Clients} />
        <Stack.Screen
          name="CNPJ"
          component={CNPJ}
          initialParams={{ user_id: user?.id }}
        />
        <Stack.Screen name="Sincronizar" component={Sync} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PedidoDetalhes" component={OrderDetails} />
        <Stack.Screen name="NovoCliente" component={NewClientTabs} />
        <Stack.Screen name="CadastrarEmpresa" component={RegisterCompany} />
        <Stack.Screen name="CadastrarUsuario" component={RegisterUser} />
        <Stack.Screen name="Produtos" component={Products} />
        <Stack.Screen name="InformacoesProduto" component={ProductInfo} />
        <Stack.Screen name="InformacoesCliente" component={ClientTabs} />
        <Stack.Screen name="Configuracoes" component={Setup} />
        <Stack.Screen name="AlterarEmpresa" component={ChangeCompany} />
        <Stack.Screen name="AdicionarEmpresa" component={AddCompany} />
        <Stack.Screen name="AjudaESuporte" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  IntroSlides: undefined;
  Home: undefined;
  Resumo: undefined;
  Pedidos: undefined;
  NavegadorPedido: undefined;
  Clientes: undefined;
  PedidoDetalhes: undefined;
  InformacoesCliente: { client_id: number };
  CNPJ: { user_id: number };
  Sincronizar: { user_id: number };
  Login: undefined;
  CadastrarEmpresa: undefined;
  CadastrarUsuario: undefined;
  Produtos: undefined;
  InformacoesProduto: { product_id: number };
  Configuracoes: undefined;
  AlterarEmpresa: undefined;
  AdicionarEmpresa: { user_id: number };
  AjudaESuporte: undefined;
  NovoCliente: undefined;
};
