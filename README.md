# @suitegeezus/docdash-suitescript
Docdash but enhanced: 
- to recognize [SuiteScript's JsDoc tags](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387175355.html)
- Support for basic custom tags


## SuiteScript JsDoc supported tags
- NApiVersion
- NModuleScope
- NScriptType
- [NAmdConfig](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4704111062.html)

## Additional Tags
- governance - arbitrary
- appliestorecord - arbitrary

## Basic Configuration 
You will need to:
1. inform jsdoc of these tags by adding the following in your jsdoc config plugins.
```json
"plugins": ["@suitegeezus/docdash-suitescript/ssTags"]
```
2. inform jsdoc you are using this template. Here is a js example: 
```js
const template = path.dirname(require.resolve('@suitegeezus/docdash-suitescript'));
// other code and config here
Object.assign( jsdocConfig.opts, {template });  
```
### Screenshot

![SuiteScript Doc'd](https://raw.githubusercontent.com/gillyspy/docdash-suitescript/master/.README_images/ba320f52.png)
![SuiteScript example](https://raw.githubusercontent.com/gillyspy/docdash-suitescript/master/.README_images/5d0af3da.png)

## Custom Tags
Displaying custom tags in docs is usually the easy part but getting it into the template is difficult. So this will do 
basic support of custom tags.

## Method 1: No coding
1. In your jsdoc `conf.json` file add a new key/section `suitescript`.
2. Add a key for `basicTags` and give it an array of strings (must be valid key strings)
e.g.
```json
  "suitescript": {
    "basicTags": ["kwyjibo", "boom"]
  }
```

## Method 2: Some coding
All you have to do is create a script with a few lines and put it somewhere jsdoc can find. 

1. Write a script (e.g. `customTags.js`) that contains something like this: 
```js
// customTags.js
exports.defineTags = function (dictionary) {
  dictionary.defineTag('kwyjibo', {
    'mustHaveValue': true,
    canHaveType    : false,
    canHaveName    : false,
    'onTagged'     : function (doclet, tag) {

      doclet.kwijibo = tag.value;

      if (!doclet.meta) {
        doclet.meta = {};
      }
      if (!doclet.meta.customTagName){
        doclet.meta.customTagName = [];
      }
      // the customTagName must match the doclet key and tag above
      doclet.meta.customTagName.push('kwyjibo')
    }
  })
          // optional synonym
    .synonym('mycustom');
}; 
```
2. put this script somewhere jsdoc can see it. (probably easiest thing would be to 
   copy it to the jsdoc/plugins folder)
3. Refer to this script via plugins (in your jsdoc.conf)
```json
"plugins": ["@suitegeezus/docdash-suitescript/ssTags", "from/a/root/jsdoc/can/resolve/customTags"]
```



# Docdash
[![Build Status](https://api.travis-ci.org/clenemt/docdash.png?branch=master)](https://travis-ci.org/clenemt/docdash) [![npm version](https://badge.fury.io/js/docdash.svg)](https://badge.fury.io/js/docdash) [![license](https://img.shields.io/npm/l/docdash.svg)](LICENSE.md)

A clean, responsive documentation template theme for JSDoc 3.

![docdash-screenshot](https://cloud.githubusercontent.com/assets/447956/13398144/4dde7f36-defd-11e5-8909-1a9013302cb9.png)

![docdash-screenshot-2](https://cloud.githubusercontent.com/assets/447956/13401057/e30effd8-df0a-11e5-9f51-66257ac38e94.jpg)

## Example
See http://clenemt.github.io/docdash/ for a sample demo. :rocket:

## Install

```bash
$ npm install docdash
```

## Usage
Clone repository to your designated `jsdoc` template directory, then:

```bash
$ jsdoc entry-file.js -t path/to/docdash
```

## Usage (npm)
In your projects `package.json` file add a new script:

```json
"script": {
  "generate-docs": "node_modules/.bin/jsdoc -c jsdoc.json"
}
```

In your `jsdoc.json` file, add a template option.

```json
"opts": {
  "template": "node_modules/docdash"
}
```

## Sample `jsdoc.json`
See the config file for the [fixtures](fixtures/fixtures.conf.json) or the sample below.

```json
{
    "tags": {
        "allowUnknownTags": false
    },
    "source": {
        "include": "../js",
        "includePattern": "\\.js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown"
    ],
    "opts": {
        "template": "assets/template/docdash/",
        "encoding": "utf8",
        "destination": "docs/",
        "recurse": true,
        "verbose": true
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```

## Options
Docdash supports the following options:

```json5
{
    "docdash": {
        "static": [false|true],         // Display the static members inside the navbar
        "sort": [false|true],           // Sort the methods in the navbar
        "sectionOrder": [               // Order the main section in the navbar (default order shown here)
             "Classes",
             "Modules",
             "Externals",
             "Events",
             "Namespaces",
             "Mixins",
             "Tutorials",
             "Interfaces"
        ],
        "disqus": "",                   // Shortname for your disqus (subdomain during site creation)
        "openGraph": {                  // Open Graph options (mostly for Facebook and other sites to easily extract meta information)
            "title": "",                // Title of the website
            "type": "website",          // Type of the website
            "image": "",                // Main image/logo
            "site_name": "",            // Site name
            "url": ""                   // Main canonical URL for the main page of the site
        },
        "meta": {                       // Meta information options (mostly for search engines that have not indexed your site yet)
            "title": "",                // Also will be used as postfix to actualy page title, prefixed with object/document name
            "description": "",          // Description of overal contents of your website
            "keyword": ""               // Keywords for search engines
        },
        "search": [false|true],         // Display seach box above navigation which allows to search/filter navigation items
        "commonNav": [false|true],      // Group all html code for <nav> in a nav.inc.html fetched on each page (instead of include it in each html page, save {navSize}×{nb html pages} which can be huge on big project)
        "collapse": [false|true],       // Collapse navigation by default except current object's navigation of the current page
        "wrap": [false|true],           // Wrap long navigation names instead of trimming them
        "typedefs": [false|true],       // Include typedefs in menu
        "navLevel": [integer],          // depth level to show in navbar, starting at 0 (false or -1 to disable)
        "private": [false|true],        // set to false to not show @private in navbar
        "removeQuotes": [none|all|trim],// Remove single and double quotes, trim removes only surrounding ones
        "scripts": [],                  // Array of external (or relative local copied using templates.default.staticFiles.include) js or css files to inject into HTML,
        "menu": {                       // Adding additional menu items after Home
            "Project Website": {        // Menu item name
                "href":"https://myproject.com", //the rest of HTML properties to add to manu item
                "target":"_blank",
                "class":"menu-item",
                "id":"website_link"
            },
            "Forum": {
                "href":"https://myproject.com.forum",
                "target":"_blank",
                "class":"menu-item",
                "id":"forum_link"
            }
        },
        "scopeInOutputPath": [false|true], // Add scope from package file (if present) to the output path, true by default.
        "nameInOutputPath": [false|true], // Add name from package file to the output path, true by default.
        "versionInOutputPath": [false|true] // Add package version to the output path, true by default. 
    }
}
```

Place them anywhere inside your `jsdoc.json` file.

## Contributors

[![0](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/0)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/0)
[![1](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/1)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/1)
[![2](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/2)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/2)
[![3](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/3)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/3)
[![4](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/4)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/4)
[![5](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/5)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/5)
[![6](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/6)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/6)
[![7](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/images/7)](https://sourcerer.io/fame/ar2rsawseen/clenemt/docdash/links/7)

## Thanks
Thanks to [lodash](https://lodash.com) and [minami](https://github.com/nijikokun/minami).

## License
Licensed under the Apache License, version 2.0. (see [Apache-2.0](LICENSE.md)).
