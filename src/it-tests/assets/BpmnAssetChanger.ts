import { WebView } from "vscode-extension-tester";
import { AssetChanger } from "../api/AssetChanger";
import { SidePanel } from "../page-objects/Panels";

/**
 * Changes BPMN assets by appending text into 'Documentation' field
 */
export class BpmnAssetChanger implements AssetChanger {
  public change = async (webview: WebView): Promise<void> => {
    const properties = await new SidePanel(webview).diagramProperties();
    await properties.setMultilineTextProperty(
      "Documentation",
      "remarshalled process"
    );

    return;
  };
}
