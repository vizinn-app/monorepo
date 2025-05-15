export const demoPt = {
  demoIcon: {
    description:
      "Um componente para renderizar um ícone registrado. Ele é envolvido em um <TouchableOpacity /> se `onPress` for fornecido, caso contrário, em um <View />.",
    useCase: {
      icons: {
        name: "Ícones",
        description: "Lista de ícones registrados dentro do componente.",
      },
      size: {
        name: "Tamanho",
        description: "Há uma propriedade de tamanho.",
      },
      color: {
        name: "Cor",
        description: "Há uma propriedade de cor.",
      },
      styling: {
        name: "Estilização",
        description: "O componente pode ser estilizado facilmente.",
      },
    },
  },
  demoTextField: {
    description: "O componente TextField permite a entrada e edição de texto.",
    useCase: {
      statuses: {
        name: "Status",
        description:
          "Há uma propriedade de status - semelhante a `preset` em outros componentes, mas que também afeta a funcionalidade do componente.",
        noStatus: {
          label: "Sem Status",
          helper: "Este é o status padrão",
          placeholder: "Texto vai aqui",
        },
        error: {
          label: "Status de Erro",
          helper: "Status a ser usado quando houver erro",
          placeholder: "Texto vai aqui",
        },
        disabled: {
          label: "Status Desabilitado",
          helper: "Desabilita a editabilidade e silencia o texto",
          placeholder: "Texto vai aqui",
        },
      },
      passingContent: {
        name: "Conteúdo Passado",
        description: "Existem algumas maneiras de passar conteúdo.",
        viaLabel: {
          labelTx: "Via `label` prop",
          helper: "Via `helper` prop",
          placeholder: "Via `placeholder` prop",
        },
        rightAccessory: {
          label: "RightAccessory",
          helper: "Esta propriedade recebe uma função que retorna um elemento React.",
        },
        leftAccessory: {
          label: "LeftAccessory",
          helper: "Esta propriedade recebe uma função que retorna um elemento React.",
        },
        supportsMultiline: {
          label: "Suporta Multilinhas",
          helper: "Habilita uma entrada maior para texto multilinha.",
        },
      },
      styling: {
        name: "Estilização",
        description: "O componente pode ser estilizado facilmente.",
        styleInput: {
          label: "Estilizar Entrada",
          helper: "Via `style` prop",
        },
        styleInputWrapper: {
          label: "Estilizar Envolvimento de Entrada",
          helper: "Via `inputWrapperStyle` prop",
        },
        styleContainer: {
          label: "Estilizar Contêiner",
          helper: "Via `containerClassName` prop",
        },
        styleLabel: {
          label: "Estilizar Rótulo & Auxiliar",
          helper: "Via `LabelTextProps` & `HelperTextProps` style prop",
        },
        styleAccessories: {
          label: "Estilizar Acessórios",
          helper: "Via `RightAccessory` & `LeftAccessory` style prop",
        },
      },
    },
  },
  demoToggle: {
    description:
      "Renderiza uma entrada booleana. Este é um componente controlado que requer um callback `onValueChange` que atualiza a propriedade `value` para que o componente reflita as ações do usuário. Se a propriedade `value` não for atualizada, o componente continuará renderizando o valor fornecido em vez do esperado após ações do usuário.",
    useCase: {
      variants: {
        name: "Variante",
        description:
          "O componente suporta algumas variantes diferentes. Se uma personalização pesada de uma variante específica for necessária, ela pode ser facilmente refatorada. O padrão é `checkbox`.",
        checkbox: {
          label: "`checkbox` variante",
          helper: "Pode ser usado para uma entrada de on/off.",
        },
        radio: {
          label: "`radio` variante",
          helper: "Use quando houver múltiplas opções.",
        },
        switch: {
          label: "`switch` variante",
          helper: "Uma entrada on/off mais proeminente. Tem melhor suporte para acessibilidade.",
        },
      },
      statuses: {
        name: "Status",
        description:
          "Há uma propriedade de status - semelhante a `preset` em outros componentes, mas que também afeta a funcionalidade do componente.",
        noStatus: "Sem status - este é o padrão",
        errorStatus: "Status de erro - use quando houver um erro",
        disabledStatus: "Status desabilitado - desabilita a editabilidade e silencia a entrada",
      },
      passingContent: {
        name: "Conteúdo Passado",
        description: "Existem algumas maneiras de passar conteúdo.",
        useCase: {
          checkBox: {
            label: "Via `labelTx` prop",
            helper: "Via `helperTx` prop.",
          },
          checkBoxMultiLine: {
            helper: "Suporta multilinhas - Nulla proident consectetur labore sunt ea labore.",
          },
          radioChangeSides: {
            helper: "Você pode mudar os lados - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "Passar um ícone de checkbox personalizado.",
          },
          switch: {
            label: "Switch pode ser lido como texto",
            helper:
              "Por padrão, essa opção não usa `Text` pois dependendo da fonte, os caracteres on/off podem parecer estranhos. Personalize conforme necessário.",
          },
          switchAid: {
            label: "Ou ajudado com um ícone",
          },
        },
      },
      styling: {
        name: "Estilização",
        description: "O componente pode ser estilizado facilmente.",
        outerWrapper: "1 - estilizar o envolvimento externo da entrada",
        innerWrapper: "2 - estilizar o envolvimento interno da entrada",
        inputDetail: "3 - estilizar o detalhe da entrada",
        labelTx: "Você também pode estilizar o labelTx",
        styleContainer: "Ou, estilizar o contêiner inteiro",
      },
    },
  },
  demoButton: {
    description:
      "Um componente que permite que os usuários realizem ações e escolhas. Envolve o componente Text com um Pressable.",
    useCase: {
      presets: {
        name: "Predefinições",
        description: "Existem algumas predefinições que estão pré-configuradas.",
      },
      passingContent: {
        name: "Conteúdo Passado",
        description: "Existem algumas maneiras de passar conteúdo.",
        viaTextProps: "Via `text` Prop - Billum In",
        children: "Filhos - Irure Reprehenderit",
        rightAccessory: "RightAccessory - Duis Quis",
        leftAccessory: "LeftAccessory - Duis Proident",
        nestedChildren: "Filhos aninhados - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi.",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "Multilinha - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "Estilização",
        description: "O componente pode ser estilizado facilmente.",
        styleContainer: "Estilizar Contêiner - Exercitation",
        styleText: "Estilizar Texto - Ea Anim",
        styleAccessories: "Estilizar Acessórios - enim ea id fugiat anim ad.",
        pressedState: "Estilizar Estado Pressionado - fugiat anim",
      },
      disabling: {
        name: "Desabilitação",
        description:
          "O componente pode ser desabilitado e estilizado com base nisso. O comportamento de pressionamento será desabilitado.",
        standard: "Desabilitado - padrão",
        filled: "Desabilitado - preenchido",
        reversed: "Desabilitado - invertido",
        accessory: "Estilo de acessório desabilitado",
        textStyle: "Estilo de texto desabilitado",
      },
    },
  },
  demoListItem: {
    description:
      "Um componente de linha estilizado que pode ser usado em FlatList, SectionList ou sozinho.",
    useCase: {
      height: {
        name: "Altura",
        description: "A linha pode ter alturas diferentes.",
        defaultHeight: "Altura padrão (56px)",
        customHeight: "Altura personalizada via `height` prop",
        textHeight:
          "Altura determinada pelo conteúdo do texto - Reprehenderit incididunt deserunt do do ea labore.",
        longText:
          "Limitar texto longo a uma linha - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "Separadores",
        description: "O separador / divisor é pré-configurado e opcional.",
        topSeparator: "Apenas separador superior",
        topAndBottomSeparator: "Separadores superior e inferior",
        bottomSeparator: "Apenas separador inferior",
      },
      icons: {
        name: "Ícones",
        description: "Você pode personalizar os ícones à esquerda ou à direita.",
        leftIcon: "Ícone à esquerda",
        rightIcon: "Ícone à direita",
        leftRightIcons: "Ícones à esquerda & direita",
      },
      customLeftRight: {
        name: "Componentes Personalizados à Esquerda/Direita",
        description:
          "Se precisar de um componente personalizado à esquerda/direita, você pode passá-lo.",
        customLeft: "Componente personalizado à esquerda",
        customRight: "Componente personalizado à direita",
      },
      passingContent: {
        name: "Conteúdo Passado",
        description: "Existem algumas maneiras de passar conteúdo.",
        text: "Via `text` prop - reprehenderit sint",
        children: "Filhos - mostrud mollit",
        nestedChildren1: "Filhos aninhados - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "Integração com FlatList & FlashList",
        description:
          "O componente pode ser facilmente integrado com a interface de listas de sua escolha.",
      },
      styling: {
        name: "Estilização",
        description: "O componente pode ser estilizado facilmente.",
        styledText: "Texto Estilizado",
        styledContainer: "Contêiner Estilizado (separadores)",
        tintedIcons: "Ícones Tintados",
      },
    },
  },
  demoCard: {
    description:
      "Os Cards são úteis para exibir informações relacionadas de forma contida. Se um ListItem exibe conteúdo horizontalmente, um Card pode ser usado para exibir conteúdo verticalmente.",
    useCase: {
      presets: {
        name: "Predefinições",
        description: "Existem algumas predefinições que estão pré-configuradas.",
        default: {
          heading: "Predefinição Padrão (default)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "Predefinição Invertida",
          content: "Reprehenderit occaecat proident aliqua reprehenderit.",
          footer: "Consectetur nulla non aliquip velit.",
        },
      },
      passingContent: {
        name: "Conteúdo Passado",
        description: "Existem algumas maneiras de passar conteúdo.",
        viaChildren: "Via `children` prop",
        viaTitle: "Via `title` prop",
        viaContent: "Via `content` prop",
        viaFooter: "Via `footer` prop",
      },
      styling: {
        name: "Estilização",
        description: "O componente pode ser estilizado facilmente.",
        styleContainer: "Estilizar Contêiner",
        styleTitle: "Estilizar Título",
        styleContent: "Estilizar Conteúdo",
        styleFooter: "Estilizar Rodapé",
      },
    },
  },
  demoRadio: {
    description:
      "O componente `Radio` permite que o usuário selecione uma opção entre várias. Este componente é útil quando há várias opções disponíveis, mas apenas uma pode ser selecionada de cada vez.",
    useCase: {
      radioButton: {
        name: "Opções de Radio",
        description: "O componente de opção de radio permite seleção de apenas uma das opções.",
      },
      style: {
        name: "Estilização",
        description: "O componente pode ser facilmente estilizado.",
        styleContainer: "Estilizar o contêiner",
        styleIcon: "Estilizar o ícone",
      },
    },
  },
}

export default demoPt
export type DemoTranslations = typeof demoPt
