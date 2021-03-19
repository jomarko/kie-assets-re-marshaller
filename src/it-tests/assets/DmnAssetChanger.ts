import { WebView } from "vscode-extension-tester";
import { AssetChanger } from "../api/AssetChanger";
import { SidePanel } from "../page-objects/Panels";

/**
 * Changes DMN assets by appending text into 'Description' field
 */
export class DmnAssetChanger implements AssetChanger {
  public change = async (webview: WebView): Promise<void> => {
    const properties = await new SidePanel(webview).diagramProperties();
    await properties.setMultilineTextProperty(
      "Description",
      "remarshalled decision"
    );

    return;
  };
}
