import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { S3UploadComponent } from './s3-upload/s3-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, S3UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'S3-browser';
}
