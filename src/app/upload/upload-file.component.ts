import { Router } from '@angular/router';
import { UploadService } from './upload.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit {
  fileForm!: FormGroup;
  file!: FormControl;
  formData: FormData | null = null;


  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.fileForm.valid && this.formData) {
   

      // Aquí asumimos que `uploadFile` es un método en tu `UploadService` que se encarga de la carga del archivo.
      // Este método podría retornar un Observable, lo cual es común en operaciones HTTP en Angular.
      this.uploadService.uploadFile(this.formData).subscribe({
        next: (response: any) => {
          // Tratamiento de la respuesta exitosa
          console.log('Archivo subido con éxito', response);
          // Puedes redireccionar al usuario o mostrar un mensaje de éxito
          // this.router.navigate(['/ruta-de-exito']);
        },
        error: (error: any) => {
          // Tratamiento del error
          console.error('Error al subir el archivo', error);
        }
      });
    } else {
      // Tratamiento de formularios no válidos
      console.error('El formulario no es válido');
    }
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData = new FormData();
      this.formData.append('file', file);
    }
  }
  
  
  
  ngOnInit() {
    this.file = new FormControl('', [Validators.required]);
  
    this.fileForm = this.fb.group({
      file: this.file
    });
  }
}
