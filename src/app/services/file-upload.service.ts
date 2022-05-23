import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { ShowroomService } from './showroom.service';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private showroomService: ShowroomService
  ) {}
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.prodID}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  saveFileData(fileUpload: FileUpload): void {
    this.showroomService
      .uploadImages(fileUpload.prodID, { image: fileUpload.url })
      .subscribe({
        next: (data) => {
          alert(data);
          console.log(data);
        },
        error: (e) => console.error(e),
      });
  }
  getFiles(numberItems: number, prodID: string): AngularFireList<FileUpload> {
    console.log(
      this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems))
    );
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
