import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { WINDOW } from "src/app/services/window.service";

@Component({
  selector: "app-poll",
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.scss"],
})
export class PollComponent {
  public constructor(@Inject(WINDOW) private window: Window) {}

  public get signedIn(): boolean {
    return this.window.walletConnection.isSignedIn();
  }
}
