import React from 'react';
import { View, Text } from 'react-native';
import { cn, formatCurrency, truncateText } from 'shared-ui';

/**
 * Componente exemplo que utiliza as funções da biblioteca compartilhada
 */
export function SharedExample() {
  const price = 299.99;
  const longText = "Este é um texto muito longo que deve ser truncado para caber em um espaço menor na interface do usuário";

  return (
    <View className={cn("p-4 bg-white rounded-lg shadow-md")}>
      <Text className={cn("text-lg font-bold text-blue-500")}>
        Exemplo de Componente Compartilhado
      </Text>
      <Text className={cn("text-base mt-2")}>
        Preço formatado: {formatCurrency(price)}
      </Text>
      <Text className={cn("text-sm mt-2")}>
        Texto truncado: {truncateText(longText, 30)}
      </Text>
    </View>
  );
}
