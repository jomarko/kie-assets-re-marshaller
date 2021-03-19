import { WebView } from "vscode-extension-tester";
import { AssetChanger } from "../api/AssetChanger";

export class PmmlAssetChanger implements AssetChanger {
  public change = async (webview: WebView): Promise<void> => {
    // TO DO

    return;
  };
}
