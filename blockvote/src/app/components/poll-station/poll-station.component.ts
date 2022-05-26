import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WINDOW } from "src/app/services/window.service";
import getConfig from "src/config";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

const { networkId } = getConfig("development");

@Component({
  selector: "app-poll-station",
  templateUrl: "./poll-station.component.html",
  styleUrls: ["./poll-station.component.scss"],
})
export class PollStationComponent implements OnInit {
  public choosenOption = "";
  public alreadyVoted = false;
  public isLoading = false;
  public answerOptions = [
    "At least a month",
    "Idk but I'm in",
    "Idk but I want the bear",
    "Summer camp",
    "All the year",
  ];

  public constructor(
    private router: Router,
    @Inject(WINDOW) private window: Window,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.fetchIfAlreadyVoted();
  }

  public async voteAndGoToResults(): Promise<void> {
    try {
      if (this.isVoted) {
        if (!this.alreadyVoted) {
          console.log(
            `https://explorer.${networkId}.near.org/accounts/${this.window.contract.contractId}`
          );
          this.isLoading = true;
          await this.window.contract.vote({ option: this.choosenOption });

          this.router.navigateByUrl("results");
          this.isLoading = false;
        } else {
          this.dialog.open(ErrorDialogComponent);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  public chooseOption(option: number): void {
    this.choosenOption = this.answerOptions[option];
  }

  public isClassApplied(option: number): boolean {
    return this.choosenOption === this.answerOptions[option];
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

  private async fetchIfAlreadyVoted(): Promise<void> {
    this.alreadyVoted = await this.window.contract.getIsUserParticipated({
      accountId: this.accountId,
    });
  }
}
