
import { Routes } from '@angular/router';

import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import { ImageComponent } from './image/image.component';
import { SearchBlogComponent } from './search-blog/search-blog.component';

export const routes: Routes = [
  
    {path: '', pathMatch: 'full', redirectTo: 'app-home'},
   {path: 'create-blog', component:CreateBlogComponent},
   {path: 'edit-blog', component:EditBlogComponent},
   {path: 'app-home', component:HomeComponent},
    {path: 'search', component:SearchBlogComponent},

   { path: 'post/index', component: IndexComponent },

      { path: 'post/:postId/view', component: ViewComponent },
       { path: 'records/:id', component: ViewComponent },

      { path: 'post/create', component: CreateComponent },
       { path: 'image/upload', component: ImageComponent },

      { path: 'post/:postId/edit', component: EditComponent } ,

    { path: '**', redirectTo: '404-not-found' }
];
export default routes;
