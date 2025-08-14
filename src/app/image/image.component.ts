import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PostService } from '../post/post.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-image',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

  selectedFile: File | null = null;
   form!: FormGroup;

   title: string='';
 body:string='';
date:string='';
  slug:string='';
 file: string = '';
 

  

  constructor(private http: HttpClient,
    
    private router: Router,
    public postService: PostService,
   
  ) {}

    ngOnInit(): void {

    //   this.form = new FormGroup({

    //   title: new FormControl('', [Validators.required]),
    //   slug: new FormControl('', [Validators.required]),
    //   body: new FormControl('', Validators.required),
    //    date: new FormControl('', [Validators.required]),
    //    image: new FormControl(null, Validators.required, )

      

    // });

    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit()  {
        if (this.selectedFile) {
           const formData = new FormData();
           
           
        formData.append('file', this.selectedFile, this.selectedFile.name);
         formData.append('title', this.title);
         formData.append('body', this.body);
          formData.append('slug', this.slug);
          formData.append('date', this.date);

          console.log(">>>>>>>>>", formData)
         
        //  this.http.post('http://localhost:3000/upload-image',formData).subscribe(
             this.http.post('http://localhost:8080/blog',formData).subscribe(
             //this.postService.postImage(this.selectedFile).subscribe(
            response => {
              console.log('Post successfully:', response);
              
              alert('Post successful!');

              this.router.navigate(['/app-home']); 
              // Handle success (e.g., display message, update UI)
            },
            error => {
              console.error('Image upload failed:', error);
              // Handle error
            }
          );
        } else {
          console.warn('No file selected.');
        }
      }

}
