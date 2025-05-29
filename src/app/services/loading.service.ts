import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loadingMap: Map<string, boolean> = new Map<string, boolean>();

  public getLoadingSubject(): BehaviorSubject<boolean> {
    return this.loadingSubject;
  }

  public setLoading(url: string, loading: boolean): void {
    if (!url) {
      throw new Error('LoadingService.setLoading: parameter <url> must not be an empty string.');
    }

    if (loading) {
      this.loadingMap.set(url, true);
      this.loadingSubject.next(true);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size === 0) {
      this.loadingSubject.next(false);
    }
  }

}
