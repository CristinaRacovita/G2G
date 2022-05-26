import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.scss"],
})
export class ErrorDialogComponent {
  constructor(private router: Router) {}

  public goToResults(): void {
    this.router.navigateByUrl("results");
  }
}
