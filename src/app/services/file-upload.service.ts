import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { ShowroomService } from './showroom.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';
  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
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
            this.saveFileDataRealTime(fileUpload);
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
        next: (data) => {},
        error: (e) => console.error(e),
      });
  }

  getFiles(numberItems: number, prodID: string): AngularFireList<FileUpload> {
    if (prodID !== undefined) {
      let url = `${this.basePath}/${prodID}`;
      return this.db.list(url, (ref) => ref.limitToLast(numberItems));
    }
  }

  private saveFileDataRealTime(fileUpload: FileUpload): void {
    let url = `${this.basePath}/${fileUpload.prodID}`;
    this.db.list(url).push(fileUpload);
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key, fileUpload.prodID)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, fileUpload.prodID);
      })
      .then(async () => {
        await this.deleteFileFromFireStore(fileUpload.url, fileUpload.prodID);
      })
      .catch((error) => console.log(error));
  }
  private deleteFileDatabase(key: string, id: string): Promise<void> {
    let url = `${this.basePath}/${id}`;
    return this.db.list(url).remove(key);
  }
  private deleteFileStorage(name: string, id: string): void {
    let url = `${this.basePath}/${id}`;
    const storageRef = this.storage.ref(url);
    storageRef.child(name).delete();
  }

  private deleteFileFromFireStore(key: string, id: string): Promise<void> {
    return this.firestore
      .doc('Showroom/' + id)
      .set(
        { ['pictures']: firebase.firestore.FieldValue.arrayRemove(key) },
        { merge: true }
      );
  }
}
