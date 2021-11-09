import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public changemode($event: any, mode: string) {
    if (mode == 'light') {
      document.getElementById('dark')?.classList.remove('displaynone');
      document.getElementById('light')?.classList.add('displaynone');
      document.getElementsByTagName('body')[0].classList.remove('dark');
      $event.stopPropagation();
      $event.preventDefault();
    } else {
      document.getElementById('light')?.classList.remove('displaynone');
      document.getElementById('dark')?.classList.add('displaynone');
      document.getElementsByTagName('body')[0].classList.add('dark');
      $event.stopPropagation();
      $event.preventDefault();
    }
  }

}
