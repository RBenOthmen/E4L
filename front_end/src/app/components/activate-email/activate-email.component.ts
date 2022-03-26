import { Forbidden } from './../../exceptions/Forbidden';
import { NoContent } from './../../exceptions/NoContent';
import { BadInput } from './../../exceptions/BadInput';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppError } from 'src/app/exceptions/AppError';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.css']
})
export class ActivateEmailComponent implements OnInit {
  uid!:string;
  token!:string;

  constructor(private  route : ActivatedRoute,
    private authService : AuthService,
    private router :Router,
    private messageService : MessageService) { 
      
    }

  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = <string>params.get('uid')
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = <string>params.get('token')
    })

    console.log(this.uid)
    console.log(this.token)

    this.authService.activateAccount(this.uid,this.token).subscribe({
      next : response => {
        console.log("Account has been activated successfuly")
        this.messageService.add({key: 'SuccessKey', severity:'success', summary:'Service Message', detail:'Via MessageService'});
        this.router.navigate(['/login']);
        
      },
      error : (err : AppError) => {
        if (err instanceof BadInput) {
            this.messageService.add({key: 'ErrorKey', severity:'success', summary:'Service Message', detail:'Via MessageService'});
            console.log("False activation link");
            this.router.navigate(['/login']);
            
          } else if (err instanceof Forbidden) {
            this.messageService.add({key: 'ErrorKey', severity:'success', summary:'Service Message', detail:'Via MessageService'});
            console.log("Account already activated");
            this.router.navigate(['/login']);
           
          }
       }
    })
  }


  clear() {
      this.messageService.clear();
  }

  

}
