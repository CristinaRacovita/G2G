import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-poll-station",
  templateUrl: "./poll-station.component.html",
  styleUrls: ["./poll-station.component.scss"],
})
export class PollStationComponent {
  public choosenOption = "";

  public constructor(private router: Router) {}

  public goToResults(): void {
    if (this.isVoted) {
      this.router.navigateByUrl("results");
    }
  }

  public chooseOption(option: string): void {
    this.choosenOption = option;
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
}
