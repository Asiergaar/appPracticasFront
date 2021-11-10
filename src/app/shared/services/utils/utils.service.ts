import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public menuHover(item: string) {
    let menus = ['menuupdate', 'menupool', 'menupair', 'menutoken', 'menuexchange', 'menuclient'];
    for (let m in menus) {
      if (menus[m] != item) {
        document.getElementById(menus[m])?.classList.remove('menuhover');
      } else {
        document.getElementById(item)?.classList.add('menuhover');
      }
    }

  }
}
