import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AppStateService} from "../services/app-state.service";

export const authorizationGuard: CanActivateFn = (route,
                                                  state) => {
  const appStateService = inject(AppStateService);
  const router = inject(Router);
  if (appStateService.authState.roles.includes(route.data["requiredRoles"])) {
    return true;
  }
  router.navigateByUrl("admin/notAuthorized");
  return false;
};
