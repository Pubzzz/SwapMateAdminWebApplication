import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  @Input() productID: string;

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  isCompleted: boolean = true;
  percentage = 0;

  constructor(private uploadService: FileUploadService) {}
  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      this.isCompleted = false;

      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file, this.productID);

        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          (error) => {
            console.log('Error in Upload Image');
            console.log(error);
            this.isCompleted = true;
          },
          () => {
            console.log('Image upload Completed');
            this.isCompleted = true;
            this.percentage = 0;
          }
        );
      }
    }
  }
}
