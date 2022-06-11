const env = require('jsdoc/env');
const {suitescript} = env.conf;
const newTags = suitescript?.basicTags || [];
const uniqueTags = newTags.flat().filter(Boolean);
/**
 * Adds support for several SuiteScript-related tags
 */
exports.defineTags = function (dictionary) {
  for(let i = 0, l=uniqueTags.length; i<=l; i++) {
    const newTag = uniqueTags[i];
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
            doclet.meta.customTagName.push(newTag);
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
  dictionary.defineTag('NScriptType', {
    'mustHaveValue': true,
    canHaveType: false,
    canHaveName: false,
    mustNotHaveDescription: true,
    'onTagged': function (doclet, tag) {
      doclet.NScriptType = tag.value;

      if (!doclet.meta) {
        doclet.meta = {};
      }
      doclet.meta.partial = 'nscripttype.tmpl';
    }
  });
  dictionary.defineTag('NModuleScope', {
    'mustHaveValue': true,
    canHaveType: false,
    canHaveName: false,
    mustNotHaveDescription: true,
    'onTagged': function (doclet, tag) {
      doclet.NModuleScope = tag.value;

      if (!doclet.meta) {
        doclet.meta = {};
      }
      doclet.meta.partial = 'nmodulescope.tmpl';
    }
  });
  dictionary.defineTag('NApiVersion', {
    'mustHaveValue': true,
    canHaveType: false,
    canHaveName: false,
    mustNotHaveDescription: true,
    'onTagged': function (doclet, tag) {
      doclet.NApiVersion = tag.value;

      if (!doclet.meta) {
        doclet.meta = {};
      }
      doclet.meta.partial = 'napiversion.tmpl';
    }
  });
  dictionary.defineTag('NAmdConfig', {
    'mustHaveValue': true,
    canHaveType: false,
    canHaveName: false,
    mustNotHaveDescription: true,
    'onTagged': function (doclet, tag) {
      doclet.NAmdConfig = tag.value;

      if (!doclet.meta) {
        doclet.meta = {};
      }
      doclet.meta.partial = 'namdconfig.tmpl';
    }
  });
  dictionary.defineTag('appliedtorecord', {
    'mustHaveValue': true,
    canHaveType: false,
    canHaveName: false,
    'onTagged': function (doclet, tag) {
      if (!doclet.appliedtorecord) {
        doclet.appliedtorecord = [];
      }

      doclet.appliedtorecord.push(tag.value);

      if (!doclet.meta) {
        doclet.meta = {};
      }
      doclet.meta.partial = 'appliedtorecord.tmpl';
    }
  })
  .synonym('appliestorecord');
};
