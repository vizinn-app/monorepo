import { type ClassValue } from 'clsx';
/**
 * Mescla classes CSS com suporte a Tailwind
 * Pode ser usado em ambos React Native (com nativewind) e React Web
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Formata um valor monetário para o formato brasileiro
 */
export declare function formatCurrency(value: number): string;
/**
 * Trunca um texto que é muito longo
 */
export declare function truncateText(text: string, maxLength: number): string;
