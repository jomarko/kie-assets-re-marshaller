// Import all the necessary objects from extension tester
import {
  InputBox,
  VSBrowser,
  ActivityBar,
  WebDriver,
  Workbench,
  SideBarView,
  ViewItem,
} from "vscode-extension-tester";

// We are using chai for assertions, feel free to use whichever package you like
import { assert } from "chai";
import { kieProjectPath } from "./utils/argv-utils";
import { ReMarshaller } from "./api/ReMarshaller";

describe("Kie Project ReMarshaller UI Tests", () => {
  let driver: WebDriver;

  before(() => {
    // Retrieve a handle for the internal WebDriver instance so
    // we can use all its functionality along with the tester API
    driver = VSBrowser.instance.driver;
  });

  it("ReMarshall BPMN, DMN, PMML", async function () {
    this.timeout(60000);

    const projectPath = kieProjectPath();
    const projectName = projectPath.split("/").reverse()[0];

    await new Workbench().executeCommand("Extest: Open Folder");
    const inputBox: InputBox = await InputBox.create();
    await inputBox.setText(projectPath);
    await inputBox.confirm();

    const projectExplorer = await new ActivityBar().getViewControl("Explorer");
    if (typeof projectExplorer !== "undefined") {
      const projectExplorerSidebarView: SideBarView = await projectExplorer.openView();
      assert.isTrue(
        await projectExplorerSidebarView.isDisplayed(),
        "Explorer side bar view was not opened"
      );

      const workspace = await projectExplorerSidebarView
        .getContent()
        .getSection("Untitled (Workspace)");
      assert.isTrue(
        await workspace.isExpanded(),
        "Workspace section was not expanded"
      );

      const reMarshaller: ReMarshaller = new ReMarshaller(driver);

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

    } else {
      throw new Error("Explorer not found");
    }

    return;
  });
});
