const env = require('jsdoc/env');
const {suitescript} = env.conf;
const withoutPartialTags = [
  { label : 'Require Config', tag: 'NAmdConfig'},
  { label: 'SuiteScript API', tag: 'NApiVersion'},
  { label: 'Scope', tag : 'NModuleScope'},
  { label : 'ScriptType' , tag : 'NScriptType'}
];
const reservedNames = withoutPartialTags.map(wpt=>wpt.tag).concat(['governance','appliedtorecord'] )
const newTags = [...(suitescript?.basicTags || [])]
  // filter out the ones defined above
  .filter(candidate=>!reservedNames.includes(candidate))
  .map(t=>({ label : t, tag : t }));

const uniqueTags = [...newTags, ...withoutPartialTags].flat();
/**
 * Adds support for several SuiteScript-related tags
 */
exports.defineTags = function (dictionary) {
  for(let i = 0, l=uniqueTags.length; i<=l; i++) {
    const { label, tag : newTag} = typeof uniqueTags[i] === 'object' ? uniqueTags[i] : { label : uniqueTags[i], tag: uniqueTags[i] };
    if (typeof newTag !== 'string') break;
      try{
        dictionary.defineTag(newTag, {
          mustHaveValue : true,
          canHaveType: false,
          canHaveName: false,
          'onTagged': function (doclet, tag){
            doclet[newTag] = tag.value;
            if( !doclet.meta){
              doclet.meta = { customTagName : [] };
            }
            if( !doclet.meta.customTagName){
              doclet.meta.customTagName = [];
            }
            // the customTagName must match the doclet key and tag above
            doclet.meta.customTagName.push({ label, tag: newTag });
          }
        });
      }catch(e){
        //
      }
  };

  dictionary.defineTag('governance', {
      'mustHaveValue': true,
      canHaveType: false,
      canHaveName: false,
      'onTagged': function (doclet, tag) {
        doclet.governance = tag.value;

        if (!doclet.meta) {
          doclet.meta = {};
        }
        doclet.meta.partial = 'governance.tmpl';
      }
    })
    .synonym('gov');

  dictionary.defineTag('appliedtorecord', {
    'mustHaveValue': true,
    canHaveType: false,
    canHaveName: false,
    'onTagged': function (doclet, tag) {
      if (!doclet.appliedtorecord) {
        doclet.appliedtorecord = [];
      }

      doclet.appliedtorecord.push(tag.value);
    }
  })
  .synonym('appliestorecord');
};
