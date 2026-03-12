export type CliTemplateName = 'react' | 'react-resta';

export interface ScaffoldCliArgs {
  mode: 'scaffold';
  help: boolean;
  target: string;
  template: CliTemplateName;
  immediate: boolean;
}

export interface BrandOsCliArgs {
  mode: 'brand-os';
  help: boolean;
  schema: string;
  promptPack?: string;
  parserContract?: string;
  fixtures?: string;
  emitDir?: string;
  bootstrap: boolean;
  verbose: boolean;
}

export interface AstParserCliArgs {
  mode: 'ast-parser';
  help: boolean;
  input?: string;
  output?: string;
  parserContract?: string;
  suites: string[];
  verbose: boolean;
}

export interface InitCliArgs {
  mode: 'init';
  help: boolean;
  name?: string;
  description?: string;
  surfaces?: string[];
  style?: string;
  palette?: string;
  out?: string;
  json: boolean;
}

export type CliArgs = ScaffoldCliArgs | BrandOsCliArgs | AstParserCliArgs | InitCliArgs;

export const VALID_TEMPLATES: readonly CliTemplateName[] = ['react', 'react-resta'];
export const DEFAULT_TEMPLATE: CliTemplateName = 'react';

function fail(message: string): never {
  throw new Error(`Error: ${message}`);
}


export function parseArgs(argv: string[]): CliArgs {
  const parsed: {
    help: boolean;
    mode: 'scaffold' | 'brand-os' | 'ast-parser' | 'init';
    verbose: boolean;
    astInput?: string;
    astOutput?: string;
    astParserContract?: string;
    astSuites: string[];
    brandSchema?: string;
    promptPack?: string;
    parserContract?: string;
    fixtures?: string;
    emitDir?: string;
    bootstrap: boolean;
    target?: string;
    template: CliTemplateName;
    immediate: boolean;
    templateSpecified: boolean;
    immediateSpecified: boolean;
    initName?: string;
    initDescription?: string;
    initSurfaces?: string[];
    initStyle?: string;
    initPalette?: string;
    initOut?: string;
    initJson: boolean;
  } = {
    help: false,
    mode: 'scaffold',
    verbose: false,
    astSuites: [],
    template: DEFAULT_TEMPLATE as CliTemplateName,
    immediate: false,
    bootstrap: false,
    templateSpecified: false,
    immediateSpecified: false,
    initJson: false,
  };

  const positional: string[] = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    if (arg === 'init') {
      parsed.mode = 'init';
      continue;
    }

    if (arg === '--name') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--name requires a brand name.');
      }
      parsed.initName = value;
      i += 1;
      continue;
    }

    if (arg === '--description') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--description requires a text value.');
      }
      parsed.initDescription = value;
      i += 1;
      continue;
    }

    if (arg === '--surfaces') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--surfaces requires a comma-separated list.');
      }
      parsed.initSurfaces = value.split(',').map((s) => s.trim()).filter(Boolean);
      i += 1;
      continue;
    }

    if (arg === '--style') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--style requires a style direction (warm, bold, minimal, editorial, playful, luxury).');
      }
      parsed.initStyle = value;
      i += 1;
      continue;
    }

    if (arg === '--palette') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--palette requires a color palette name (warm, cool, rose, forest, slate, amber, violet).');
      }
      parsed.initPalette = value;
      i += 1;
      continue;
    }

    if (arg === '--out') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--out requires a file path.');
      }
      parsed.initOut = value;
      i += 1;
      continue;
    }

    if (arg === '--json') {
      parsed.initJson = true;
      continue;
    }

    if (arg === '--ast-input') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--ast-input requires a file path.');
      }
      parsed.astInput = value;
      parsed.mode = 'ast-parser';
      i += 1;
      continue;
    }

    if (arg === '--ast-output') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--ast-output requires a file path.');
      }
      parsed.astOutput = value;
      parsed.mode = 'ast-parser';
      i += 1;
      continue;
    }

    if (arg === '--ast-contract') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--ast-contract requires a file path.');
      }
      parsed.astParserContract = value;
      parsed.mode = 'ast-parser';
      i += 1;
      continue;
    }

    if (arg === '--ast-suite') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--ast-suite requires a brand schema path.');
      }
      parsed.astSuites.push(value);
      parsed.mode = 'ast-parser';
      i += 1;
      continue;
    }

    if (arg === '--schema') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--schema requires a schema path.');
      }
      parsed.brandSchema = value;
      parsed.mode = 'brand-os';
      i += 1;
      continue;
    }

    if (arg === '--prompt-pack') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--prompt-pack requires a file path.');
      }
      parsed.promptPack = value;
      i += 1;
      continue;
    }

    if (arg === '--parser-contract') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--parser-contract requires a file path.');
      }
      parsed.parserContract = value;
      i += 1;
      continue;
    }

    if (arg === '--fixtures') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--fixtures requires a file path.');
      }
      parsed.fixtures = value;
      i += 1;
      continue;
    }

    if (arg === '--bootstrap') {
      parsed.bootstrap = true;
      continue;
    }

    if (arg === '--emit-dir') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--emit-dir requires a directory path.');
      }
      parsed.emitDir = value;
      i += 1;
      continue;
    }

    if (arg === '--verbose') {
      parsed.verbose = true;
      continue;
    }

    if (arg === '-t' || arg === '--template') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        fail('--template requires a template name.');
      }
      if (!VALID_TEMPLATES.includes(value as CliTemplateName)) {
        fail(`Unknown template "${value}".`);
      }
      parsed.template = value as CliTemplateName;
      parsed.templateSpecified = true;
      i += 1;
      continue;
    }

    if (arg === '-i' || arg === '--immediate') {
      parsed.immediate = true;
      parsed.immediateSpecified = true;
      continue;
    }

    if (arg.startsWith('-')) {
      fail(`Unknown option: ${arg}`);
    }

    positional.push(arg);
  }

  if (parsed.help) {
    if (parsed.mode === 'init') {
      return {
        mode: 'init',
        help: true,
        name: parsed.initName,
        description: parsed.initDescription,
        surfaces: parsed.initSurfaces,
        style: parsed.initStyle,
        palette: parsed.initPalette,
        out: parsed.initOut,
        json: parsed.initJson,
      };
    }

    if (parsed.mode === 'ast-parser') {
      return {
        mode: 'ast-parser',
        help: true,
        input: parsed.astInput,
        output: parsed.astOutput,
        parserContract: parsed.astParserContract,
        suites: parsed.astSuites,
        verbose: parsed.verbose,
      };
    }

    if (parsed.mode === 'brand-os') {
      return {
        mode: 'brand-os',
        help: true,
        schema: parsed.brandSchema ?? '',
        promptPack: parsed.promptPack,
        parserContract: parsed.parserContract,
        fixtures: parsed.fixtures,
        emitDir: parsed.emitDir,
        bootstrap: parsed.bootstrap,
        verbose: parsed.verbose,
      };
    }

    return {
      mode: 'scaffold',
      help: true,
      target: parsed.target ?? 'my-app',
      template: parsed.template,
      immediate: parsed.immediate,
    };
  }

  if (parsed.mode === 'ast-parser') {
    if (parsed.templateSpecified || parsed.immediateSpecified) {
      fail('Scaffold-only flags --template and --immediate are not allowed in AST parser mode.');
    }

    if (parsed.brandSchema) {
      fail('Validation and brand OS flags are not allowed in AST parser mode.');
    }

    if (positional.length > 0) {
      fail('Positional directory argument is not supported in AST parser mode.');
    }

    if (!parsed.astInput && parsed.astSuites.length === 0) {
      fail('AST parser mode requires either --ast-input or at least one --ast-suite.');
    }

    if (parsed.astInput && !parsed.astOutput) {
      fail('--ast-output is required when using --ast-input.');
    }

    if (parsed.astInput && !parsed.astParserContract && parsed.astSuites.length !== 1) {
      fail('Use --ast-contract or provide exactly one --ast-suite when parsing HTML input.');
    }

    return {
      mode: 'ast-parser',
      help: false,
      input: parsed.astInput,
      output: parsed.astOutput,
      parserContract: parsed.astParserContract,
      suites: parsed.astSuites,
      verbose: parsed.verbose,
    };
  }

  if (parsed.mode === 'init') {
    if (parsed.templateSpecified || parsed.immediateSpecified) {
      fail('Scaffold-only flags --template and --immediate are not allowed in init mode.');
    }

    return {
      mode: 'init',
      help: false,
      name: parsed.initName,
      description: parsed.initDescription,
      surfaces: parsed.initSurfaces,
      style: parsed.initStyle,
      palette: parsed.initPalette,
      out: parsed.initOut,
      json: parsed.initJson,
    };
  }

  if (parsed.mode === 'brand-os') {
    if (parsed.templateSpecified || parsed.immediateSpecified) {
      fail('Scaffold-only flags --template and --immediate are not allowed in brand OS mode.');
    }

    if (positional.length > 0) {
      fail('Positional directory argument is not supported in brand OS mode.');
    }

    if (!parsed.brandSchema) {
      fail('--schema is required for brand OS mode.');
    }

    return {
      mode: 'brand-os',
      help: false,
      schema: parsed.brandSchema,
      promptPack: parsed.promptPack,
      parserContract: parsed.parserContract,
      fixtures: parsed.fixtures,
      emitDir: parsed.emitDir,
      bootstrap: parsed.bootstrap,
      verbose: parsed.verbose,
    };
  }

  if (positional.length > 1) {
    fail('Only one project directory is supported.');
  }

  return {
    mode: 'scaffold',
    help: false,
    target: positional[0] ?? 'my-app',
    template: parsed.template,
    immediate: parsed.immediate,
  };
}
