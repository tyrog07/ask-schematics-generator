"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const ng_module_utils_1 = require("nav/src/utils/ng-module-utils");
const ng_module_utils_2 = require("nav/src/utils/ng-module-utils");
const find_module_1 = require("nav/src/schematics-angular-utils/find-module");
const add_injection_1 = require("nav/src/utils/add-injection");
const config_1 = require("nav/src/schematics-angular-utils/config");
const parse_name_1 = require("nav/src/utils/parse-name");
function filterTemplates(options) {
    // if (!options.menuService) {
    //     return schematics_2.filter(path => !path.match(/\.service\.ts$/) && !path.match(/-item\.ts$/) && !path.match(/\.bak$/));
    // }
    return schematics_2.filter(path => !path.match(/\.bak$/));
}
function default_1(options) {
    return (host, context) => {
        console.log('options', options);
        const workspace = config_1.getWorkspace(host);
        if (!options.project) {
            options.project = Object.keys(workspace.projects)[0];
        }
        const project = workspace.projects[options.project];
        if (options.path === undefined) {
            const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
            options.path = `/${project.root}/src/${projectDirName}/pages`;
        }
        options.module = find_module_1.findModuleFromOptions(host, options);
        const parsedPath = parse_name_1.parseName(options.path, options.name);
        options.name = parsedPath.name;
        // options.path = parsedPath.path;
        // src\app\shared\services\firebase-api
        
        console.log('options', options);
        const templateSource = schematics_2.apply(schematics_2.url('./files'), [
            filterTemplates(options),
            schematics_2.template(Object.assign({}, core_1.strings, options)),
            () => { console.debug('path', parsedPath.path); },
            schematics_2.move(parsedPath.path)
        ]);
        options.path = `/${project.root}/src/app/shared/services/firebase-api`;
        const serviceSource = schematics_2.apply(schematics_2.url('./services'), [
            filterTemplates(options),
            schematics_2.template(Object.assign({}, core_1.strings, options)),
            () => { console.debug('path', options.path); },
            schematics_2.move(options.path)
        ]);
        // src\app\shared\model\banner.model.ts
        options.path = `/${project.root}/src/app/shared/model`;
        const modelSource = schematics_2.apply(schematics_2.url('./models'), [
            filterTemplates(options),
            schematics_2.template(Object.assign({}, core_1.strings, options)),
            () => { console.debug('path', options.path); },
            schematics_2.move(options.path)
        ]);
        const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        options.path = `/${project.root}/src/${projectDirName}/pages`;

       let newCop={...options,name:`new-${parsedPath.name}`,path:`${parsedPath.path}/${parsedPath.name}`};

        const rule = schematics_1.chain([
            schematics_2.branchAndMerge(schematics_1.chain([
                schematics_1.mergeWith(templateSource),
                schematics_1.mergeWith(serviceSource),
                schematics_1.mergeWith(modelSource),
                ng_module_utils_1.addDeclarationToNgModule(options, options.export),
                ng_module_utils_2.addDeclarationToNgModule(newCop, newCop.export,true),
                // add_injection_1.injectServiceIntoAppComponent(options)
            ]))
        ]);
        return rule(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map