import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PollComponent } from "./pages/poll/poll.component";
import { ResultsComponent } from "./pages/results/results.component";

const routes: Routes = [
  { path: "", component: PollComponent },
  { path: "results", component: ResultsComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
