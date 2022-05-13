import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loadingAction$ = this.loadingSubject.asObservable();

  constructor() { }

  getLoader() {
    return this.loadingAction$;
  }
  
  showLoader() {
    this.loadingSubject.next(true);
  }

  hideLoader() {
    this.loadingSubject.next(false);
  }
}
