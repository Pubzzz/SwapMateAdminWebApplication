export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  prodID: string;
  constructor(file: File, prodID: string) {
    this.file = file;
    this.prodID = prodID;
  }
}
