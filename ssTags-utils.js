const suitescriptBasicTagMeta = [
  { label: 'Require Config', tag: 'NAmdConfig' },
  { label: 'SuiteScript API', tag: 'NApiVersion' },
  { label: 'Scope', tag: 'NModuleScope' },
  { label: 'ScriptType', tag: 'NScriptType' }
];
const reservedNames = suitescriptBasicTagMeta.map((wpt) => wpt.tag).concat(['governance', 'appliedtorecord']);

module.exports = { suitescriptBasicTagMeta, reservedNames };
