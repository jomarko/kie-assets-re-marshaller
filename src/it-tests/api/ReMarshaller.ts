import {
  EditorView,
  TitleBar,
  ViewItem,
  WebView,
} from "vscode-extension-tester";
import { AssetChanger } from "./AssetChanger";
import { BpmnAssetChanger } from "../assets/BpmnAssetChanger";
import { DmnAssetChanger } from "../assets/DmnAssetChanger";
import { PmmlAssetChanger } from "../assets/PmmlAssetChanger";
import { ScesimAssetChanger } from "../assets/ScesimAssetChanger";

export class ReMarshaller {
  private reMarshallers: Map<RegExp, AssetChanger> = new Map();

  constructor() {
    this.reMarshallers.set(new RegExp(".*.dmn"), new DmnAssetChanger());
    this.reMarshallers.set(new RegExp(".*.bpmn"), new BpmnAssetChanger());
    this.reMarshallers.set(new RegExp(".*.pmml"), new PmmlAssetChanger());
    this.reMarshallers.set(new RegExp(".*.scesim"), new ScesimAssetChanger());
  }

  public reMarshall = async (fileExplorerItem: ViewItem): Promise<void> => {
    await new EditorView().closeAllEditors();
    await fileExplorerItem.select();
    await new Promise(res => {setTimeout(res, 10000)})
    const webview = new WebView();
    const fileName = await webview.getTitle();

    for (let [fileExtension, assetChanger] of this.reMarshallers) {
      if (fileExtension.test(fileName)) {  

        await webview.switchToFrame();

        await assetChanger.change(webview);

        await webview.switchBack();

        const fileMenuItem = await new TitleBar().getItem("File");
        if (typeof fileMenuItem !== "undefined") {
          const fileContextMenu = await fileMenuItem.select();
          const saveAssetItem = await fileContextMenu.getItem("Save");
          if (typeof saveAssetItem !== "undefined") {
            await saveAssetItem.select();
          }
        }
      }
    }

    return;
  };
}
