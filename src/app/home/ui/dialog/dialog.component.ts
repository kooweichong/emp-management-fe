import { Component } from '@angular/core';
import { ApiService } from '../../data-access/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  fileName: string = '';
  file: any;
  status: string='';

  constructor(private apiService: ApiService, private dialogRef: MatDialogRef<DialogComponent>){}


  csvInputChange(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.fileName = fileInputEvent.target.files[0].name
    this.status = "";
    console.log(fileInputEvent.target.files[0]);
  }

  submitFile(){
    if(this.file!=null)
    {
      this.status = "";
      this.apiService.uploadCSV(this.file).subscribe(
        (event:any) =>{
          if(typeof(event) === 'object')
          {            
              this.status = `${event.message}`;
          }
        }
      );

    }
  }

}
