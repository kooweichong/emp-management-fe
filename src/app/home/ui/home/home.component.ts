import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width:'30%',
      height:'40%'
    });

  }

}
