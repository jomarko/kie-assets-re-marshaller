import { WebView } from "vscode-extension-tester";

/**
 * Goal of this interface is to change an opened asset and thus enable its saving.
 */
export interface AssetChanger {
  /**
   * Asset is opened out of the box and 'change' implementation shouldn't open the asset.
   * Should do just a simple change of the oppened asset.
   * Asset saving is also done out of the box and 'change' implementation shouldn't save or close the asset.
   *
   * @param 'webview' is the root of the opened asset.
   */
  change: (webview: WebView) => Promise<void>;
}
