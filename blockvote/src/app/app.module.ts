import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { WINDOW_PROVIDERS } from "./services/window.service";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
