/**
 * O navegador do app (anteriormente "AppNavigator" e "MainNavigator") é usado para os fluxos
 * principais de navegação do seu aplicativo.
 * De modo geral, ele conterá um fluxo de autenticação (cadastro, login, recuperação de senha)
 * e um fluxo "principal" que o usuário utilizará após fazer login.
 */

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { ComponentProps } from "react"
import { BottomMenu } from "../components/Menu/BottomMenu"
import Config from "../config"
import { useStores } from "../models"
import * as Screens from "../screens"
import { useAppTheme, useThemeProvider } from "../utils/useAppTheme"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * Este tipo permite que o TypeScript saiba quais rotas estão definidas neste navegador,
 * bem como quais propriedades (se houver) podem ser passadas ao navegar entre elas.
 *
 * Se nenhum parâmetro for permitido, passe `undefined`. De modo geral, recomendamos o uso
 * dos stores do MobX-State-Tree para manter o estado da aplicação, em vez de passar estado
 * por meio de parâmetros de navegação.
 *
 * Para mais informações, veja esta documentação:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

export type AppStackParamList = {
  Welcome: undefined
  Register: undefined
  Login: {
    email?: string
    fromRegistration?: boolean
    hasReceivedCode?: boolean
  }
  Home: undefined
  ForgotPassword: undefined
}

/**
 * Esta é uma lista de todos os nomes de rotas que fecharão o aplicativo se o botão de voltar
 * for pressionado enquanto estiver nessa tela. Afeta apenas o Android.
 */

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentação: https://reactnavigation.org/docs/stack-navigator/

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? "Home" : "Register"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Screens.HomeScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}
      <Stack.Screen name="ForgotPassword" component={Screens.ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={Screens.HomeScreen} />
    </Stack.Navigator>
  )
})

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
        {isAuthenticated && <BottomMenu />}
      </NavigationContainer>
    </ThemeProvider>
  )
})
