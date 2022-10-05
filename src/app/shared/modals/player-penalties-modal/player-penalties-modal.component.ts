import { GameStat } from './../../classes/game';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  stat:GameStat;
}

@Component({
  templateUrl: './player-penalties-modal.component.html',
  styles: [
  ]
})
export class PlayerPenaltiesModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public dialogRef: MatDialogRef<PlayerPenaltiesModalComponent>) { }

  ngOnInit(): void {
  }

}
