import { Component, Inject } from "@angular/core";
import { WINDOW } from "src/app/services/window.service";
import { login } from "src/utils";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  public constructor(@Inject(WINDOW) private window: Window) {}
  public goTo(page: string): void {}

  public get accountId(): string {
    return this.window.walletConnection.getAccountId();
  }

  public get greetingsMessage(): string {
    if (this.signedIn) {
      return `Hello, ${this.window.walletConnection.getAccountId()}`;
    }

    return "";
  }

  public get signedIn(): boolean {
    return this.window.walletConnection.isSignedIn();
  }

  public login(): void{
    login();
  }
}
