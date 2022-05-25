import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { WINDOW_PROVIDERS } from "./services/window.service";
import { AppRoutingModule } from "./app-routing.module";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { PollStationComponent } from "./components/poll-station/poll-station.component";
import { PollComponent } from "./pages/poll/poll.component";
import { ResultsComponent } from "./pages/results/results.component";
import { PollResultsComponent } from './components/poll-results/poll-results.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PollStationComponent,
    PollComponent,
    ResultsComponent,
    PollResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
