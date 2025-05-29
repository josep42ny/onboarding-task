import { HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { tap } from 'rxjs';

export const httpRequestInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const loading = inject(LoadingService);
  loading.setLoading(request.url, true);

  return next(request)
    .pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        loading.setLoading(request.url, false);
      }
    }));
};
