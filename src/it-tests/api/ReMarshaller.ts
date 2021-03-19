import { assert } from "chai";
import {
  By,
  EditorView,
  TitleBar,
  ViewItem,
  WebDriver,
  WebView,
} from "vscode-extension-tester";
import { AssetChanger } from "./AssetChanger";
import { BpmnAssetChanger } from "../assets/BpmnAssetChanger";
import { DmnAssetChanger } from "../assets/DmnAssetChanger";
import { PmmlAssetChanger } from "../assets/PmmlAssetChanger";
import { ScesimAssetChanger } from "../assets/ScesimAssetChanger";

export class ReMarshaller {
  private driver: WebDriver;
  private editorView: EditorView;
  private reMarshallers: Map<RegExp, AssetChanger> = new Map();

  constructor(driver: WebDriver) {
    this.reMarshallers.set(new RegExp(".*.dmn"), new DmnAssetChanger());
    this.reMarshallers.set(new RegExp(".*.bpmn"), new BpmnAssetChanger());
    this.reMarshallers.set(new RegExp(".*.pmml"), new PmmlAssetChanger());
    this.reMarshallers.set(new RegExp(".*.scesim"), new ScesimAssetChanger());
    this.driver = driver;
    this.editorView = new EditorView();
  }

  public reMarshall = async (fileExplorerItem: ViewItem): Promise<void> => {
    const fileName = await fileExplorerItem.getText();

    for (let [fileExtension, assetChanger] of this.reMarshallers) {
      if (fileExtension.test(fileName)) {
        await fileExplorerItem.select();

        await this.driver.sleep(1000);

        const webview = new WebView(this.editorView, By.linkText(fileName));

        await webview.switchToFrame();

        await assetChanger.change(webview);

        await webview.switchBack();

        const fileMenuItem = await new TitleBar().getItem("File");
        if (typeof fileMenuItem !== "undefined") {
          const fileContextMenu = await fileMenuItem.select();
          assert.isTrue(await fileContextMenu.isDisplayed());
          const saveAssetItem = await fileContextMenu.getItem("Save");
          if (typeof saveAssetItem !== "undefined") {
            await saveAssetItem.select();
          }
        }

        await this.editorView.closeAllEditors();
      }
    }

    return;
  };
}
