import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  selectedFile: File | null = null;
 form!: FormGroup;
constructor(

    public postService: PostService,

    private router: Router,
    private http: HttpClient
) { }

 onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
      }

 

 
      

  
  ngOnInit(): void {

    this.form = new FormGroup({

      title: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
       date: new FormControl('', [Validators.required]),
       image: new FormControl(null, Validators.required, )

      

    });

  }

      get f(){

    return this.form.controls;

  }

 

  onUpload() {
        if (this.selectedFile) {
          const formData = new FormData();
           console.log(this.form.value);
          formData.append('image', this.selectedFile, this.selectedFile.name);

          this.http.post('http://localhost:3000/upload-image', formData)
            .subscribe(
              (response) => {
                console.log('Upload successful:', response);
              },
              (error) => {
                console.error('Upload failed:', error);
              }
            );
        } else {
          console.warn('No file selected.');
        }
      }

      submit(){

    console.log(this.form.value);

    
   
    
     
       this.postService.create(this.form.value).subscribe((res:any) => {

         console.log('Post created successfully!');

         this.router.navigateByUrl('post/index');

    })

    

        
      

   

  }
}

  


