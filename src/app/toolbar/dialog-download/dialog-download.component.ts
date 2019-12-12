import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DntLayer } from 'src/app/dntlayer/dnt-layer';
import { Map } from 'ol';

@Component({
  selector: 'app-dialog-download',
  templateUrl: './dialog-download.component.html',
  styleUrls: ['./dialog-download.component.css']
})
export class DialogDownloadComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DialogDownloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDownloadData ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


export interface DialogDownloadData{
  dntLayer:DntLayer,
  mapa:Map
}