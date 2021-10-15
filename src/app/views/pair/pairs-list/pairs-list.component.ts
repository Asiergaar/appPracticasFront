import { Component, OnInit } from '@angular/core';

import { Pair } from 'src/app/shared/interfaces/pair';
import { PairsService } from 'src/app/shared/services/pairs.service';

@Component({
  selector: 'app-pairs-list',
  templateUrl: './pairs-list.component.html',
  styleUrls: ['./pairs-list.component.css']
})
export class PairsListComponent implements OnInit {
  public pairList: any;

  constructor(private pairsService: PairsService) {
    this.pairList = [];
   }

  ngOnInit(): void {
    this.getPairsName();
  }


  private getPairsName(): void {
    this.pairsService.getPairsName().subscribe(
      (data) => {
        this.pairList = data.data;
        console.log(this.pairList);
      },
      (error) => {
        console.log('Error: ', error);
      },
      () => {
        console.log('Petición realizada correctamente');
      }
    )
  }

}
