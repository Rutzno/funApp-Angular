import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public currentRoute: any;

  constructor(public appStateService: AppStateService,
              public loadingService: LoadingService,
              private router: Router) {
  }

  setActionToHome() {
    this.currentRoute = "home";
  }

  setActionToProducts() {
    this.currentRoute = "products";
  }

  setActionToNewProduct() {
    this.currentRoute = "new-product";
  }

  handleLogout() {
    this.appStateService.authState = {};
    this.router.navigateByUrl("login");
  }

  handleLogin() {
    this.router.navigateByUrl("login");
  }
}
