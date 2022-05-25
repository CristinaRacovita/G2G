import { Component, Inject, OnInit } from "@angular/core";
import { WINDOW } from "src/app/services/window.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  public votes: Map<string, string> = new Map<string, string>();
  public dataChart = [];

  public constructor(@Inject(WINDOW) private window: Window) {}

  public ngOnInit(): void {
    this.getAllVotes();
  }

  public get accountId(): string {
    return this.window.walletConnection.getAccountId();
  }

  private async getAllVotes(): Promise<void> {
    try {
      this.votes = await this.window.contract.getVotes();
      console.log(JSON.stringify(this.votes));
      this.fetchDataChart();

      // console.log(
      //   JSON.stringify(
      //     await this.window.contract.getIsUserParticipated({
      //       accountId: this.accountId,
      //     })
      //   )
      // );

      // console.log(
      //   JSON.stringify(
      //     await this.window.contract.getVote({
      //       accountId: this.accountId,
      //     })
      //   )
      // );

    } catch (e) {
      this.votes = new Map<string, string>();
      console.log(e);
    }
  }

  private fetchDataChart(){
    this.votes.forEach((value, key) => {
      this.dataChart.push({Value: parseInt(value), Label: key});
    })
  }
}
