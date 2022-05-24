import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-poll-station",
  templateUrl: "./poll-station.component.html",
  styleUrls: ["./poll-station.component.scss"],
})
export class PollStationComponent {
  public choosenOption = "";

  public chooseOption(option: string): void {
    this.choosenOption = option;
  }

  public  get voted(): string{
    if(this.choosenOption){
      return '';
    }

    return 'disabled';
  }

  public get isVoted(): boolean{
    if(this.choosenOption){
      return true;
    }

    return false;
  }
}
