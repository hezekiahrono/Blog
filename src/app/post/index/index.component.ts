import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { RouterModule,Router } from '@angular/router';
import {CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../blog';


@Component({
  selector: 'app-index',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

// posts:Post[]   = [];
 posts:Blog[]   = [];
    
 

  /*------------------------------------------

  --------------------------------------------

  Created constructor

  --------------------------------------------

  --------------------------------------------*/

  constructor(public postService: PostService, private router: Router,
    private http:HttpClient
  ) { }

    

  /**

   * Write code on Method

   *

   * @return response()

   */

  ngOnInit(): void {

    // console.log(this.router.url);

    // console.log( window.location.href);

    // this.postService.getAll().subscribe((data: Post[])=>{

    //   this.posts = data;

    //   console.log(this.posts);

    // })   this.id = this.route.snapshot.params['postId'];



    this.http.get<Blog[]>("http://localhost:8080/blog")
    .subscribe(response=>{
       this.posts = response;
       console.log(this.posts);
    }, 
     
      error=>{
      console.log("Error while fetching record");
    })
    

  }

    

  /**

   * Write code on Method

   *

   * @return response()

   */

  deletePost(id:number){

    this.postService.delete(id).subscribe(res => {

         this.posts = this.posts.filter(item => item.id !== id);

         console.log('Post deleted successfully!');

    })

  }
  deleteEntity(id: number): void {

     this.postService.deleteEntity(id).subscribe(res => {

         this.posts = this.posts.filter(item => item.id !== id);

         console.log('Post deleted successfully!');

    })
     
      }

}
