/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceElevated: string;
  card: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  info: string;
  infoBg: string;
  inputBg: string;
  inputBorder: string;
  sidebarBg: string;
  headerBg: string;
}

export const TYGOS_DESIGN_TOKENS: {
  dark: ColorTokens;
  light: ColorTokens;
} = {
  dark: {
    background: '#070b14', // Deep Midnight Navy
    surface: '#0d1527', // Dark structural surface
    surfaceElevated: '#131d36', // Elevated card surface
    card: '#0f172a',
    border: '#1e293b',
    borderSubtle: '#15203b',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    primary: '#00e5ff', // Electric Cyan
    primaryHover: '#00cde6',
    secondary: '#0070f3', // Digital Blue
    accent: '#f59e0b', // Amber/Orange
    success: '#10b981', // Emerald Green
    successBg: 'rgba(16, 185, 129, 0.1)',
    warning: '#f59e0b',
    warningBg: 'rgba(245, 158, 11, 0.1)',
    danger: '#f43f5e',
    dangerBg: 'rgba(244, 63, 94, 0.1)',
    info: '#0ea5e9',
    infoBg: 'rgba(14, 165, 233, 0.1)',
    inputBg: '#050811',
    inputBorder: '#1e293b',
    sidebarBg: '#0b1222',
    headerBg: 'rgba(11, 18, 34, 0.95)',
  },
  light: {
    background: '#f8fafc', // Clean Soft Neutral
    surface: '#ffffff', // Crisp White
    surfaceElevated: '#ffffff',
    card: '#ffffff',
    border: '#e2e8f0',
    borderSubtle: '#f1f5f9',
    textPrimary: '#0f172a', // Deep Navy Typography
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    primary: '#0284c7', // Refined Accessible Cyan/Blue
    primaryHover: '#0369a1',
    secondary: '#2563eb',
    accent: '#d97706',
    success: '#059669',
    successBg: '#ecfdf5',
    warning: '#d97706',
    warningBg: '#fffbeb',
    danger: '#e11d48',
    dangerBg: '#fff1f2',
    info: '#0284c7',
    infoBg: '#f0f9ff',
    inputBg: '#f8fafc',
    inputBorder: '#cbd5e1',
    sidebarBg: '#ffffff',
    headerBg: 'rgba(255, 255, 255, 0.95)',
  },
};
