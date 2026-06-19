export enum ColumnType {
  NUMERIC = 'NUMERIC',
  CATEGORICAL = 'CATEGORICAL',
  DATE = 'DATE',
  UNKNOWN = 'UNKNOWN',
}

export interface ColumnMetadata {
  name: string;
  type: ColumnType;
  uniqueCount: number;
  min?: number;
  max?: number;
  mean?: number;
  sampleValues: any[];
}

export interface Dataset {
  name: string;
  rows: any[];
  columns: string[];
  metadata: ColumnMetadata[];
}

export interface ChartConfig {
  id: string;
  type: 'bar' | 'line' | 'scatter' | 'area' | 'composed';
  xColumn: string;
  yColumn: string; // For primary metric
  zColumn?: string; // For scatter bubble size or grouping
  title: string;
}

export interface AIInsight {
  title: string;
  explanation: string;
  confidence: number;
  relevantColumns: string[];
  type: 'correlation' | 'anomaly' | 'trend' | 'prediction';
}

// Structured AI Response Types
export interface DatasetAnalysis {
  summary: string;
  key_trends: string[];
  kpis: Array<{
    label: string;
    value: string;
    insight: string;
  }>;
  recommended_questions: string[];
}

export interface PredictiveAnalysis {
  relationship_strength: 'Very Strong' | 'Strong' | 'Moderate' | 'Weak' | 'None';
  r_squared_interpretation: string;
  slope_interpretation: string;
  business_implication: string;
  reliability_assessment: string;
}
