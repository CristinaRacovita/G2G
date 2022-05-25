import { Component, Inject, OnInit } from "@angular/core";
import { WINDOW } from "src/app/services/window.service";

@Component({
  selector: "app-poll-results",
  templateUrl: "./poll-results.component.html",
  styleUrls: ["./poll-results.component.scss"],
})
export class PollResultsComponent implements OnInit {
  public votes: any;
  public sortedVotes: string[] = [];
  public totalVotesNumber = 0;

  public constructor(@Inject(WINDOW) private window: Window) {}

  public ngOnInit(): void {
    this.getAllVotes();
  }

  public get accountId(): string {
    return this.window.walletConnection.getAccountId();
  }

  public getProcent(key: string): string {
    const optionVotes = parseInt(this.votes[key]);
    return ((optionVotes / this.totalVotesNumber) * 100).toFixed(2);
  }

  public checkBigValue(option: string): boolean {
    return this.sortedVotes[0] === option;
  }

  private async getAllVotes(): Promise<void> {
    try {
      this.votes = await this.window.contract.getVotes();
      this.fetchSortedVotes();
      this.calculateTotalVotesNumber();
      console.log(this.totalVotesNumber.toString());
    } catch (e) {
      this.votes = new Map<string, string>();
      console.log(e);
    }
  }

  private fetchSortedVotes(): void {
    this.sortedVotes = Object.keys(this.votes).sort((a, b) => {
      return this.votes[b] - this.votes[a];
    });
  }

  private calculateTotalVotesNumber(): void {
    this.totalVotesNumber = 0;
    this.sortedVotes.forEach((option: string) => {
      console.log(parseInt(this.votes[option]).toString());
      console.log(option);
      this.totalVotesNumber += parseInt(this.votes[option]);
      console.log(this.totalVotesNumber.toString());
    });
  }
}
