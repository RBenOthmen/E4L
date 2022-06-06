import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTask : boolean = false;
  private subject = new Subject<any>();
  //  en : String[] = [{'password' : 'wa'}];

  constructor(private messageService : MessageService) { }

  toggleAddTask(): void {
    this.showAddTask =!this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle() : Observable<any> {
    return this.subject.asObservable();
  }

  toastSuccess(msg : string) {
    // let lang = localStorage.getItem('lang');
    // if (lang == 'en')
     this.messageService.add({severity:'success', summary:'Success', detail:msg});
    
  }

  toastError(msg : string) {
    this.messageService.add({severity:'error', summary:'Error', detail:msg});
  }

  toastServerDown() {
    this.messageService.add({severity:'warn', summary:'Warn', detail:"Server isn't responding, retry again"});
  }

}
