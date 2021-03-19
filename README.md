# Kie Assets ReMarshaller

ReMarshaller search a project for Kie assets and re-marshall them by doing simple change in the asset and consequent save operation.

## Motivation

There is need to confirm 'eating own our food', in this case Kie assets by VS Code Extension is not blocking from Kie projects execution.

## Prerequisite

ReMarshhaller focus on remarshalling projects generated via [kie-asset-library-poc](https://github.com/jstastny-cz/kie-asset-library-poc) tool. However any project that has Kie assets dirrectly under `src/main/resources` or `src/test/resources` ca be re-marshalled.

## Running Kie Assets ReMarshaller

There are two mandatory properties to be set

- `$KIE_VSIX` - path the the VS Code `vsix` extension file
- `$KIE_PROJECT` - path the the project containing `Kie` assets. Ideallly project generated using

- Once properties mentioned above are set, run `npm run test:it` in terminal. This will:
  - Compile the code
  - Download the latest version of VSCode
  - Install specified vsix file into the VSCode instance
  - Download the adequate version of chromedriver
  - Run the downloaded VSCode binary using chromedriver

Currently there is single test which:

- Search for all BPMN, update its `Documentation` and save it
- Search for all DMN, update its `Description` and save it
- Search for all PMML: TO DO
- Search for all SCESIM: TO DO

Complete command example:
`KIE_VSIX=<local-path>/vscode_extension_kogito_kie_editors_0.8.4.vsix KIE_PROJECT=<local-path>/dmn-and-bpmn-generated-quarkus npm run test:it`
