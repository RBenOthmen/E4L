import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selecteur',
  templateUrl: './language-selecteur.component.html',
  styleUrls: ['./language-selecteur.component.css']
})
export class LanguageSelecteurComponent implements OnInit {

  lang!:string;
  constructor() { 
    this.lang= localStorage.getItem('lang') || 'en';
   }

  ngOnInit(): void {
  }

  changeLang(lang : any) {
    console.log(lang.target.value);
    let language = lang.target.value;
    localStorage.setItem('lang',language);
    window.location.reload();
  }
}
