import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Mescla classes CSS com suporte a Tailwind
 * Pode ser usado em ambos React Native (com nativewind) e React Web
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/**
 * Formata um valor monetário para o formato brasileiro
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}
/**
 * Trunca um texto que é muito longo
 */
export function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return `${text.slice(0, maxLength)}...`;
}
