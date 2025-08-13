import { Component } from '@angular/core';
import { Post } from '../post';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog } from '../../blog';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

    selectedFile: File | null = null;

  id!: number;

  post!: Post;

  //blog!: Blog;

  form!: FormGroup;

        blog: Blog = { id: 0, title: '', body: '',
          slug: '',date:'', displayPicture:''
        };

  /*------------------------------------------

  --------------------------------------------

  Created constructor

  --------------------------------------------

  --------------------------------------------*/

  constructor(

    public postService: PostService,

    private route: ActivatedRoute,

    private router: Router

  ) { }

      

  /**

   * Write code on Method

   *

   * @return response()

   */

  ngOnInit(): void {

    // this.id = this.route.snapshot.params['postId'];

    // this.postService.find(this.id).subscribe((data: Post)=>{

    //   this.post = data;

      this.id = this.route.snapshot.params['postId'];

    this.postService.findBlog(this.id).subscribe((data: Blog)=>{

      this.blog = data;

    }); 


        

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
       date: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
      
    });

    
  }
onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
      

  /**

   * Write code on Method

   *

   * @return response()

   */

  get f(){

    return this.form.controls;

  }

      

  /**

   * Write code on Method

   *

   * @return response()

   */

  submit(){

    console.log(this.form.value);

    this.postService.update(this.id, this.form.value).subscribe((res:any) => {

         console.log('Post updated successfully!');

         this.router.navigateByUrl('post/index');

    })

  }
  onSubmit(): void {
        this.postService.updateBlog(this.blog.id, this.blog).subscribe(() => {
          this.router.navigate(['/post/index']); // Navigate after successful update
        });
      }
 

}
