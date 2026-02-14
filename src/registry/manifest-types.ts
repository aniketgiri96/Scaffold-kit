/**
 * Types and metadata for the AI-oriented manifest API.
 * Used by GET /api/manifest to expose props, dependencies, whenToUse, and alternatives
 * so AI tools can reason about components and templates.
 */

export interface PropSpec {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export interface ComponentManifestMeta {
  props?: PropSpec[];
  dependencies?: string[];
  whenToUse?: string;
  alternatives?: string[];
}

export interface TemplateManifestMeta {
  props?: PropSpec[];
  dependencies?: string[];
  whenToUse?: string;
  alternatives?: string[];
  patternCategory?: AIPatternCategory;
}

export type AIPatternCategory =
  | "Streaming"
  | "Tool use"
  | "Errors & retry"
  | "Citations"
  | "Chat"
  | "Prompt input"
  | "Layout"
  | "General";
