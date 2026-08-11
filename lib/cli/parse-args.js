function fail(message) {
    throw new Error(message);
}
function readValue(argv, index, flag) {
    const value = argv[index + 1];
    if (!value || value.startsWith('-'))
        fail(`${flag} requires a value.`);
    return value;
}
export function parseArgs(argv) {
    const json = argv.includes('--json');
    if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h' || argv[0] === 'help') {
        return { mode: 'help', help: true, json };
    }
    if (argv[0] === '--version' || argv[0] === '-v' || argv[0] === 'version') {
        return { mode: 'version', help: false, json };
    }
    let mode;
    let start = 1;
    if (argv[0] === 'emit')
        mode = 'brand-os';
    else if (argv[0] === 'validate')
        mode = 'validate';
    else if (argv[0] === 'verify')
        mode = 'verify';
    else if (argv[0].startsWith('-')) {
        mode = 'brand-os';
        start = 0;
    }
    else {
        fail(`Unknown command "${argv[0]}". Expected emit, validate, or verify.`);
    }
    let schema = '';
    let emitDir;
    let designMd;
    let force = false;
    let strict = false;
    let help = false;
    for (let i = start; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === '--json')
            continue;
        if (arg === '--help' || arg === '-h') {
            help = true;
            continue;
        }
        if (arg === '--schema' || arg === '--input') {
            schema = readValue(argv, i, arg);
            i += 1;
            continue;
        }
        if (arg === '--emit-dir' || arg === '--output' || arg === '--bundle') {
            emitDir = readValue(argv, i, arg);
            i += 1;
            continue;
        }
        if (arg === '--design-md') {
            if (mode !== 'validate')
                fail('--design-md is only valid for validate.');
            designMd = readValue(argv, i, arg);
            i += 1;
            continue;
        }
        if (arg === '--force') {
            if (mode !== 'brand-os')
                fail('--force is only valid for emit.');
            force = true;
            continue;
        }
        if (arg === '--strict') {
            strict = true;
            continue;
        }
        fail(`Unknown option "${arg}" for ${mode === 'brand-os' ? 'emit' : mode}.`);
    }
    if (!help && !schema)
        fail('--schema (or --input) is required.');
    if (mode === 'brand-os')
        return { mode, help, schema, emitDir, json, force, strict };
    if (mode === 'validate')
        return { mode, help, schema, designMd, emitDir, strict, json };
    return { mode, help, schema, emitDir, strict, json };
}
