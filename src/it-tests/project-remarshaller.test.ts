// Import all the necessary objects from extension tester
import {
  InputBox,
  ActivityBar,
  Workbench,
  SideBarView,
  ViewItem,
  ViewSection,
} from "vscode-extension-tester";

// We are using chai for assertions, feel free to use whichever package you like
import { assert } from "chai";
import { kieProjectPath } from "./utils/argv-utils";
import { ReMarshaller } from "./api/ReMarshaller";

describe("Kie Project ReMarshaller UI Tests", () => {

  let projectName: string;
  let workspace: ViewSection;

  before(async function () {
    this.timeout(20000);

    await new Workbench().getEditorView().closeAllEditors();

    const projectPath = kieProjectPath();
    projectName = projectPath.split("/").reverse()[0];

    await new Workbench().executeCommand("Extest: Open Folder");
    const inputBox: InputBox = await InputBox.create();
    await inputBox.setText(projectPath);
    await inputBox.confirm();

    const projectExplorer = await new ActivityBar().getViewControl("Explorer");
    if (projectExplorer === undefined) {
      throw Error("Project Explorer not found");
    }
    const projectExplorerSidebarView: SideBarView = await projectExplorer.openView();

    workspace = await projectExplorerSidebarView
      .getContent()
      .getSection("Untitled (Workspace)");
    assert.isTrue(
      await workspace.isExpanded(),
      "Workspace section was not expanded"
    );
  });

  it("ReMarshall BPMN, DMN, PMML", async function () {
    this.timeout(60000);

    const reMarshaller: ReMarshaller = new ReMarshaller();

    const srcMainResources: ViewItem[] = await workspace.openItem(
      projectName,
      "src",
      "main",
      "resources"
    );

    for (const item of srcMainResources) {
      await reMarshaller.reMarshall(item);
    }

    // TO DO
    // Currently opening two folders with same name block the test

    // const srcTestResources: ViewItem[] = await workspace.openItem(
    //   projectName,
    //   "src",
    //   "test",
    //   "resources",
    // );

    // for (const item of srcTestResources) {
    //   await reMarshaller.reMarshall(item);
    // }

    return;
  });
});
