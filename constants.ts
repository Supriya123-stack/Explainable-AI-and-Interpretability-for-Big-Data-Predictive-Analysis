import { Box, BarChart2, Activity, PieChart } from 'lucide-react';

export const SAMPLE_ROWS_LIMIT = 2000; // Limit processing for performance in browser
export const GEMINI_MODEL_FLASH = 'gemini-2.5-flash';
export const GEMINI_MODEL_PRO = 'gemini-3-pro-preview';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { id: 'data', label: 'Data View', icon: Box },
  { id: 'predictions', label: 'Predictive Analysis', icon: Activity },
];

export const CHART_COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
];
