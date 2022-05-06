import { chain, mergeWith, noop } from "@angular-devkit/schematics";
import { MenuOptions } from "ask-schematics-generator/src/ask/schema";
import {
  apply,
  filter,
  move,
  Rule,
  template,
  url,
  branchAndMerge,
  Tree,
  SchematicContext,
} from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";
import { addDeclarationToNgModule } from "ask-schematics-generator/src/utils/ng-module-utils";
import { findModuleFromOptions } from "ask-schematics-generator/src/schematics-angular-utils/find-module";
import { injectServiceIntoAppComponent } from "ask-schematics-generator/src/utils/add-injection";

import { getWorkspace } from "ask-schematics-generator/src/schematics-angular-utils/config";
import { parseName } from "ask-schematics-generator/src/utils/parse-name";

function filterTemplates(options: MenuOptions): Rule {
  if (!options.menuService) {
    return filter(
      (path) =>
        !path.match(/\.service\.ts$/) &&
        !path.match(/-item\.ts$/) &&
        !path.match(/\.bak$/)
    );
  }
  return filter((path) => !path.match(/\.bak$/));
}

export default function (options: MenuOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];

    if (options.path === undefined) {
      const projectDirName =
        project.projectType === "application" ? "app" : "lib";
      options.path = `/${project.root}/src/${projectDirName}`;
    }

    options.module = findModuleFromOptions(host, options);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url("./files"), [
      filterTemplates(options),
      template({
        ...strings,
        ...options,
      }),
      () => {},
      move(parsedPath.path),
    ]);

    const rule = chain([
      branchAndMerge(
        chain([
          mergeWith(templateSource),

          addDeclarationToNgModule(options, options.export),
          injectServiceIntoAppComponent(options),
        ])
      ),
    ]);

    return rule(host, context);
  };
}
