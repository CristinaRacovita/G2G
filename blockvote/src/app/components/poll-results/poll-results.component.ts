import { Component, Inject, OnInit } from "@angular/core";
import { WINDOW } from "src/app/services/window.service";

@Component({
  selector: "app-poll-results",
  templateUrl: "./poll-results.component.html",
  styleUrls: ["./poll-results.component.scss"],
})
export class PollResultsComponent implements OnInit {
  public votes: Map<string, string>;
  public sortedVotes: string[] = [];
  public totalVotesNumber = 0;
  public myVote = "";

  public constructor(@Inject(WINDOW) private window: Window) {}

  public ngOnInit(): void {
    this.getAllVotes();
    this.getMyVote();
  }

  public get accountId(): string {
    return this.window.walletConnection.getAccountId();
  }

  public getProcent(key: string): string {
    const optionVotes = parseInt(this.votes[key]);
    return ((optionVotes / this.totalVotesNumber) * 100).toFixed(2);
  }

  public checkIfIsMyOption(option: string): boolean {
    return this.myVote === option;
  }

  private async getAllVotes(): Promise<void> {
    try {
      this.votes = await this.window.contract.getVotes();
      this.fetchSortedVotes();
      this.calculateTotalVotesNumber();
    } catch (e) {
      this.votes = new Map<string, string>();
      console.error(e);
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
      this.totalVotesNumber += parseInt(this.votes[option]);
    });
  }

  private async getMyVote(): Promise<void> {
    this.myVote = await this.window.contract.getVote({
      accountId: this.accountId,
    });
  }
}
