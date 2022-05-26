import { Inject, Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { WINDOW } from "../services/window.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    @Inject(WINDOW) private window: Window,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.window.walletConnection.isSignedIn()) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
