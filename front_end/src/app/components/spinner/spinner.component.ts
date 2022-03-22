import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("load", () => {
      const loader = document.querySelector('.loader');

      loader?.classList.add('loader--hiddent');

      loader?.addEventListener('transitionend', () => {
        document.body.removeChild(loader)
      })
    })
  }

}
