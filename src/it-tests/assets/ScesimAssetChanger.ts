import { By, until, WebView } from "vscode-extension-tester";
import { AssetChanger } from "../api/AssetChanger";

export class ScesimAssetChanger implements AssetChanger {
  public change = async (webview: WebView): Promise<void> => {
    const driver = webview.getDriver();
    const editorTabLocator =
      "//li[@data-ouia-component-type='editor-nav-tab' and @data-ouia-component-id='Editor']";
    await driver.wait(
      until.elementLocated(By.xpath(editorTabLocator)),
      10000,
      "Editor tab not found in 10 seconds"
    );

    // TO DO
    // Do actual change here

    return;
  };
}
