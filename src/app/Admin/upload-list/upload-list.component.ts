import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FileUploadService} from 'src/app/services/file-upload.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css'],
})
export class UploadListComponent implements OnInit, OnChanges {

  @Input() productID: string;
  fileUploads?: any[];
  isLoading:boolean;

  constructor(private uploadService: FileUploadService,) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.productID!==undefined){

      this.isLoading=true;
      this.uploadService
        .getFiles(5, this.productID)
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({key: c.payload.key, ...c.payload.val()}))
          )
        )
        .subscribe((fileUploads) => {
          this.fileUploads = fileUploads;
          this.isLoading=false;
        });
    }


  }
}
