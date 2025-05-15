import demoPt from "./demo-pt"

const pt = {
  common: {
    ok: "OK!",
    cancel: "Cancelar",
    back: "Voltar",
    logOut: "Sair",
  },
  welcomeScreen: {
    postscript:
      "psst — Isso provavelmente não é como seu app parece. (A menos que seu designer tenha te dado essas telas, e nesse caso, vá em frente!)",
    readyForLaunch: "Seu app, quase pronto para o lançamento!",
    exciting: "(ohh, isso é empolgante!)",
    letsGo: "Vamos lá!",
  },
  errorScreen: {
    title: "Algo deu errado!",
    friendlySubtitle:
      "Essa é a tela que seus usuários verão em produção quando um erro ocorrer. Você vai querer personalizar essa mensagem (localizada em `app/i18n/pt.ts`) e provavelmente o layout também (`app/screens/ErrorScreen`). Se você quiser remover isso completamente, verifique o componente <ErrorBoundary> em `app/app.tsx`.",
    reset: "RESETAR APP",
    traceTitle: "Erro do stack de %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Tão vazio... tão triste",
      content: "Nenhum dado encontrado ainda. Tente clicar no botão para atualizar ou recarregar o app.",
      button: "Vamos tentar novamente",
    },
  },

  errors: {
    invalidEmail: "Endereço de e-mail inválido.",
  },
  loginScreen: {
    logIn: "Entre agora no vizinn!",
    enterDetails:
      "Entre com seus detalhes abaixo para desbloquear informações exclusivas. Prepare-se para descobrir um novo mundo de oportunidades locais, com segurança e praticidade. Acredite, vai ser fácil e rápido, e a comunidade está esperando por você!",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Senha",
    emailFieldPlaceholder: "Digite seu endereço de e-mail",
    passwordFieldPlaceholder: "Senha super secreta aqui",
    tapToLogIn: "Toque para entrar!",
    hint: "Dica: você pode usar qualquer endereço de e-mail e sua senha favorita :)",
  },
  demoNavigator: {
    componentsTab: "Componentes",
    debugTab: "Depuração",
    communityTab: "Comunidade",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Conecte-se com a comunidade",
    tagLine:
      "Conecte-se com a comunidade de engenheiros React Native da Infinite Red e desenvolva ainda mais suas habilidades no desenvolvimento de apps conosco!",
    joinUsOnSlackTitle: "Junte-se a nós no Slack",
    joinUsOnSlack:
      "Gostaria que houvesse um lugar para se conectar com engenheiros React Native de todo o mundo? Participe da conversa na Comunidade Infinite Red no Slack! Nossa comunidade crescente é um espaço seguro para fazer perguntas, aprender com os outros e expandir sua rede.",
    joinSlackLink: "Junte-se à Comunidade no Slack",
    makeIgniteEvenBetterTitle: "Torne o Ignite ainda melhor",
    makeIgniteEvenBetter:
      "Tem uma ideia para melhorar o Ignite? Adoraríamos ouvir! Estamos sempre procurando pessoas que queiram nos ajudar a construir as melhores ferramentas para React Native. Junte-se a nós no GitHub e ajude a construir o futuro do Ignite.",
    contributeToIgniteLink: "Contribua para o Ignite",
    theLatestInReactNativeTitle: "O que há de novo no React Native",
    theLatestInReactNative: "Estamos aqui para manter você atualizado sobre tudo o que o React Native tem a oferecer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Contrate a Infinite Red para o seu próximo projeto",
    hireUs:
      "Seja para gerenciar um projeto completo ou para treinar equipes com nossos treinamentos práticos, a Infinite Red pode ajudar em qualquer projeto React Native.",
    hireUsLink: "Envie-nos uma mensagem",
  },
  demoShowroomScreen: {
    jumpStart: "Componentes para começar seu projeto!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "COMO FAZER",
    title: "Depuração",
    tagLine:
      "Parabéns, você tem um template avançado de React Native aqui. Aproveite ao máximo esse boilerplate!",
    reactotron: "Enviar para Reactotron",
    reportBugs: "Reportar Bugs",
    demoList: "Lista de Demonstração",
    demoPodcastList: "Lista de Podcasts de Demonstração",
    androidReactotronHint:
      "Se isso não funcionar, verifique se o aplicativo Reactotron está em execução, execute `adb reverse tcp:9090 tcp:9090` no seu terminal e recarregue o app.",
    iosReactotronHint:
      "Se isso não funcionar, verifique se o aplicativo Reactotron está em execução e recarregue o app.",
    macosReactotronHint:
      "Se isso não funcionar, verifique se o aplicativo Reactotron está em execução e recarregue o app.",
    webReactotronHint:
      "Se isso não funcionar, verifique se o aplicativo Reactotron está em execução e recarregue o app.",
    windowsReactotronHint:
      "Se isso não funcionar, verifique se o aplicativo Reactotron está em execução e recarregue o app.",
  },
  demoPodcastListScreen: {
    title: "Episódios do React Native Radio",
    onlyFavorites: "Mostrar apenas favoritos",
    favoriteButton: "Favoritar",
    unfavoriteButton: "Remover favorito",
    accessibility: {
      cardHint:
        "Toque duas vezes para ouvir o episódio. Toque duas vezes e segure para {{action}} este episódio.",
      switch: "Ativar para mostrar apenas favoritos",
      favoriteAction: "Alternar Favorito",
      favoriteIcon: "Episódio não favorito",
      unfavoriteIcon: "Episódio favoritado",
      publishLabel: "Publicado em {{date}}",
      durationLabel: "Duração: {{hours}} horas {{minutes}} minutos {{seconds}} segundos",
    },
    noFavoritesEmptyState: {
      heading: "Está um pouco vazio aqui",
      content:
        "Nenhum favorito foi adicionado ainda. Toque no coração de um episódio para adicioná-lo aos seus favoritos!",
    },
  },

  ...demoPt,
}

export default pt
export type Translations = typeof pt