import {
  By,
  until,
  WebDriver,
  WebElement,
  WebView,
} from "vscode-extension-tester";

export class SidePanel {
  private driver: WebDriver;

  public constructor(webview: WebView) {
    this.driver = webview.getDriver();
  }

  /**
   * Expands the 'Diagram Properties' panel
   */
  public diagramProperties = async (): Promise<PropertiesPanel> => {
    await this.driver.wait(
      until.elementLocated(
        By.className("docks-item-E-DiagramEditorPropertiesScreen")
      ),
      10000,
      "Properties panel not found in 10 seconds"
    );

    await (
      await this.driver.findElement(
        By.className("docks-item-E-DiagramEditorPropertiesScreen")
      )
    ).click();

    return new PropertiesPanel(
      await this.driver.wait(
        until.elementLocated(
          By.xpath("//div[@data-ouia-component-id='expanded-docks-bar-E']")
        ),
        10000,
        "Expanded properties panel not found in 10 seconds"
      )
    );
  };
}

class PropertiesPanel {
  private rootElement: WebElement;

  constructor(rootElement: WebElement) {
    this.rootElement = rootElement;
  }

  public setMultilineTextProperty = async (
    property: string,
    value: string
  ): Promise<void> => {
    await (
      await this.rootElement.findElement(
        By.xpath(
          `//label[span[text()='${property}']]/following-sibling::div/textarea`
        )
      )
    ).sendKeys(value);
  };
}
