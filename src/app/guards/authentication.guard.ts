import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authenticationGuard: CanActivateFn = (route,
                                                   state) => {
  const appStateService = inject(AppStateService);
  const router = inject(Router);
  if(appStateService.authState.isAuthenticated) {
    return true;
  } else {
    router.navigateByUrl("login");
    return false;
  }
};
