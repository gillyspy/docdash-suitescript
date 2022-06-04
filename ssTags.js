/**
 * Adds support for several SuiteScript-related tags
 */
exports.defineTags = function (dictionary) {
  dictionary
    .defineTag('governance', {
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
    'onTagged': function (doclet, tag) {
      doclet.NApiVersion = tag.value;

      if (!doclet.meta) {
        doclet.meta = {};
      }
      doclet.meta.partial = 'napiversion.tmpl';
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
  });
};
