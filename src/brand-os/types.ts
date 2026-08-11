export type StringMap = Record<string, string>;

export interface AliasColorToken {
  light: string;
  dark: string;
  aliases?: string[];
  referenceAliases?: string[];
}

export interface BrandContrastBudget {
  minBodyAA?: number;
  minLargeAA?: number;
  minHeadingOnDark?: number;
}

export interface BrandTheme {
  base: 'light' | 'dark';
  label?: string;
  overrides?: Partial<StringMap>;
  intent?: 'paper' | 'dusk' | 'midnight' | 'high-contrast' | 'sepia' | string;
  contrastBudget?: BrandContrastBudget;
}

export type TweakAxis =
  | 'theme'
  | 'accent'
  | 'density'
  | 'radius'
  | 'depth'
  | 'motion'
  | 'typeScale'
  | 'surfaceTexture';

export interface TweakOptionDef {
  label: string;
  vars: Record<string, string>;
  selectorScope?: 'root' | string;
}

export interface TweakAxisDef {
  label: string;
  options: Record<string, TweakOptionDef>;
}

export interface BrandTweaks {
  defaults?: Partial<Record<TweakAxis, string>>;
  axes: Record<TweakAxis, TweakAxisDef>;
}

export type BrandMarkPlacement = 'on-light' | 'on-dark' | 'on-accent' | 'on-photo';

export interface BrandMark {
  intent: string;
  geometry: {
    minSize: number;
    clearSpace: string;
    safePlacements: BrandMarkPlacement[];
  };
  tokens?: {
    fill?: string;
    stroke?: string;
  };
  assetSlot?: string;
}

export interface BrandIllustration {
  style: 'flat' | 'editorial' | 'isometric' | 'hand-drawn' | 'photographic' | string;
  motifs?: string[];
  palette?: string[];
  forbidden?: string[];
  surfaces?: ('hero' | 'social-poster' | 'presentation' | 'print' | 'icon')[];
}

export interface BrandOsCopiedAsset {
  source: string;
  output: string;
  description?: string;
}

export interface BrandOsEmitConfig {
  assets?: BrandOsCopiedAsset[];
}

export interface BrandOsSchema {
  schemaVersion: string;
  meta: {
    name: string;
    description?: string;
    slug?: string;
    sourceReference?: { project?: string };
  };
  emit?: BrandOsEmitConfig;
  brandThesis?: {
    summary?: string;
    promise?: string;
    positioning?: string;
    personality?: string[];
    antiPersonality?: string[];
    voice?: {
      tone?: string[];
      avoid?: string[];
    };
  };
  themes?: Record<string, BrandTheme>;
  tweaks?: BrandTweaks;
  brandMarks?: {
    primary?: BrandMark;
    monochrome?: BrandMark;
    emblem?: BrandMark;
    wordmark?: BrandMark;
    favicon?: BrandMark;
  };
  illustration?: BrandIllustration;
  tokens: {
    color: {
      light: StringMap;
      dark: Partial<StringMap>;
      categories?: Record<string, AliasColorToken>;
      charts?: Record<string, string>;
    };
    typography: {
      families: StringMap;
      weights?: Record<string, number>;
      sizes?: StringMap;
      lineHeights?: Record<string, number | string>;
      tracking?: StringMap;
      surfaceOverrides?: Record<string, StringMap>;
    };
    spacing?: {
      baseUnit?: number;
      scale?: StringMap;
      sectionRhythm?: StringMap;
      container?: StringMap;
    };
    radius: StringMap;
    shadow: StringMap;
    motion?: {
      durations?: StringMap;
      easings?: StringMap;
      presets?: Record<string, Record<string, string | number | boolean>>;
      reducedMotion?: Record<string, boolean>;
    };
  };
  designGrammar?: {
    styleDirection?: string;
    densityModes?: StringMap;
    shapeLanguage?: {
      core?: string;
    };
    surfaceLanguage?: {
      base?: string;
      depthRule?: string;
      accentRule?: string;
      contrastRule?: string;
    };
    imageTreatment?: {
      style?: string;
      preferred?: string[];
      avoid?: string[];
    };
    contentVoice?: {
      adjectives?: string[];
      avoid?: string[];
    };
  };
  componentPolicy?: {
    keepStandard?: string[];
    wrapEarly?: string[];
    customBlocks?: string[];
    rawHtmlAllowedFor?: string[];
    avoid?: string[];
  };
  recipes?: {
    pageArchetypes?: Record<string, { purpose?: string; requiredSections?: string[] }>;
    sectionArchetypes?: Record<string, { purpose?: string; requiredSlots?: string[]; fixedTraits?: string[] }>;
  };
}

export interface PromptPackSurface {
  goal: string;
  requiredInputs: string[];
  optionalInputs?: string[];
  sectionExpectations?: string[];
  surfaceOverrides?: string[];
  deliverables?: string[];
  promptTemplate: string[];
  auditChecklist?: string[];
}

export interface PromptPack {
  sharedContext: {
    brandSummary: string;
    styleKeywords?: string[];
    negativeStyleKeywords?: string[];
    crossSurfaceRules?: string[];
    implementationBias?: {
      preferredStack?: string;
      systemLayer?: string[];
      brandLayer?: string[];
    };
    motionBias?: {
      defaultLevel?: string;
      allowedEscalation?: string[];
      forbiddenWithoutJustification?: string[];
    };
  };
  surfaces: Record<string, PromptPackSurface>;
  auditPromptAddendum?: string[];
}

export interface BrandOsResolvedPaths {
  schemaPath: string;
  emitDir: string;
}
