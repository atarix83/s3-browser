// ...existing code...
import { Component } from '@angular/core';

import { S3UploadService } from './s3-upload.service';

@Component({
  selector: 'app-s3-upload',
  standalone: true,
  imports: [],
  templateUrl: './s3-upload.component.html',
  styleUrl: './s3-upload.component.css'
})
export class S3UploadComponent {
  selectedFile: File | null = null;
  uploadStatus: string = '';

  constructor(private s3UploadService: S3UploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadFile() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Seleziona un file.';
      return;
    }
    this.uploadStatus = 'Caricamento in corso...';
    try {
      await this.s3UploadService.uploadFile(this.selectedFile);
      this.uploadStatus = 'File caricato con successo!';
    } catch (error) {
      this.uploadStatus = 'Errore nel caricamento.';
    }
  }
}
// ...existing code...

