/**
 * Advisory contract-completeness signals. These checks intentionally do not
 * blacklist colors, fonts, industries, styles, or visual techniques. A CLI
 * cannot infer taste from a token name; it can only report whether the input
 * carries enough explicit constraints to make later verification possible.
 */
export function validateSlopHeuristics(schema) {
    const findings = [];
    const add = (code, path, message) => {
        findings.push({ level: 'warning', code, path, message });
    };
    if (!schema.brandThesis?.summary?.trim()) {
        add('missing-thesis', '/brandThesis/summary', 'Add a concise brand thesis so outputs have a declared purpose.');
    }
    if (!schema.brandThesis?.positioning?.trim()) {
        add('missing-positioning', '/brandThesis/positioning', 'Positioning is not declared; category difference cannot be verified.');
    }
    if ((schema.brandThesis?.antiPersonality?.length ?? 0) === 0) {
        add('missing-negative-constraints', '/brandThesis/antiPersonality', 'Declare what the brand must not become.');
    }
    if (!schema.designGrammar?.shapeLanguage?.core?.trim()) {
        add('missing-shape-language', '/designGrammar/shapeLanguage/core', 'Color and typography alone do not define a recognisable system.');
    }
    if ((schema.designGrammar?.imageTreatment?.avoid?.length ?? 0) === 0) {
        add('missing-image-constraints', '/designGrammar/imageTreatment/avoid', 'Image treatment has no explicit negative constraints.');
    }
    if ((schema.componentPolicy?.avoid?.length ?? 0) === 0) {
        add('missing-composition-constraints', '/componentPolicy/avoid', 'Composition and component anti-patterns are not declared.');
    }
    if (!schema.brandMarks || Object.keys(schema.brandMarks).length === 0) {
        add('missing-marks-contract', '/brandMarks', 'No mark role or geometry contract is present.');
    }
    if (!schema.recipes?.pageArchetypes || Object.keys(schema.recipes.pageArchetypes).length === 0) {
        add('missing-proof-surfaces', '/recipes/pageArchetypes', 'No target surface contract is declared for downstream proof.');
    }
    return findings;
}
export function formatSlopFindings(findings) {
    return findings.map((finding) => `[${finding.level}] ${finding.code} ${finding.path}: ${finding.message}`);
}
