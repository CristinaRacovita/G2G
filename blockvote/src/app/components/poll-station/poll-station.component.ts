import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { WINDOW } from "src/app/services/window.service";
import getConfig from "src/config";

const { networkId } = getConfig("development");

@Component({
  selector: "app-poll-station",
  templateUrl: "./poll-station.component.html",
  styleUrls: ["./poll-station.component.scss"],
})
export class PollStationComponent {
  public choosenOption = "";

  public constructor(
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {}

  public async voteAndGoToResults(): Promise<void> {
    try {
      if (this.isVoted) {
        console.log(
          `https://explorer.${networkId}.near.org/accounts/${this.window.contract.contractId}`
        );
        await this.window.contract.vote({ option: this.choosenOption });

        this.router.navigateByUrl("results");
      }
    } catch (error) {
      console.error(error);
    }
  }

  public chooseOption(option: number): void {
    this.choosenOption = "Option " + option;
  }

  public isClassApplied(option: number): boolean {
    return this.choosenOption === "Option " + option;
  }

  public get voted(): string {
    if (this.choosenOption) {
      return "";
    }

    return "disabled";
  }

  public get isVoted(): boolean {
    if (this.choosenOption) {
      return true;
    }

    return false;
  }

  public get signedIn(): boolean {
    return this.window.walletConnection.isSignedIn();
  }

  public get accountId(): string {
    return this.window.accountId;
  }

  public setArrayFromNumber(i: number) {
    return new Array(i);
  }
}
