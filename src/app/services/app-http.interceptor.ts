import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";
import {finalize, Observable} from "rxjs";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appStateService: AppStateService,
              private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoadingSpinner();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hideLoadingSpinner()
      })
    );
  }

}
