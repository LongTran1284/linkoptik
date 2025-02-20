import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/user-manage/login.component';
// import { DashboardComponent } from './pages/dashboard.component';
// import { authGuard } from './guards/auth.guard';
// import { AuthClassGuard } from './guards/auth-class.guard';
// import { roleGuard } from './guards/role.guard';
// import { AdminComponent } from './pages/users/admin.component';
// import { GuestComponent } from './pages/users/guest.component';
// import { LinkoptikComponent } from './pages/users/linkoptik.component';
// import { DetailCustomerComponent } from './pages/detail-customer.component';
// import { PhongComponent } from './components/xepphong/phong';
// import { UsersComponent } from './pages/users/users.component';
// import { CreateAccountComponent } from './pages/user-manage/create-account.component';
// import { DetailUserComponent } from './pages/detail-user.component';
// import { NormalUserComponent } from './pages/users/normal-user.component';
// import { CustomerListComponent } from './components/customer-list/customer-list.component';
// import { UserDetailComponent } from './components/details/user-detail.component';
// import { UserListComponent } from './components/user-list/user-list.component';
// import { CustomerList2Component } from './components/customer-list/customer-list2.component';
// import { UserDashboardComponent } from './components/dashboard/user-dashboard.component';
// import { MainContentComponent } from './pages/user-manage/main-content.component';
// import { UserContentComponent } from './pages/user-manage/user-content.component';
import { HomeComponent } from './pages/product-manage/home.component';
import { Lt2200Component } from './pages/product-manage/products/lspa/lt2200.component';
import { Lt3600Component } from './pages/product-manage/products/lspa/lt3600.component';
import { LinkoptikComponent } from './pages/product-manage/products/linkoptik.component';
import { TechnologyComponent } from './pages/product-manage/technology.component';
import { BaseComponent } from './pages/product-manage/base.component';
import { NotFoundComponent } from './pages/product-manage/not-found.component';
import { ContactComponent } from './pages/product-manage/contact.component';
import { AboutComponent } from './pages/product-manage/about.component';
import { LspaComponent } from './pages/product-manage/products/lspa/lspa.component';
import { AcadComponent } from './pages/product-manage/components/technologies/acad.component';
import { AiryDiskComponent } from './pages/product-manage/components/technologies/airy-disk.component';
import { IntroduceComponent } from './pages/product-manage/components/technologies/introduce.component';
import { FilterComponent } from './pages/product-manage/components/technologies/filter.component';
import { TrapezoidalComponent } from './pages/product-manage/components/technologies/trapezoidal.component';
import { LaserComponent } from './pages/product-manage/components/technologies/laser.component';
// import { UserDetail2Component } from './components/details/user-detail2.component';

export const routes: Routes = [
    // {path: '', redirectTo: '/login', pathMatch:'full'},
    {path: '', component: BaseComponent, title:'may do kich thuoc hat', children:[
        {path: '', component: HomeComponent},               
        {path: 'about', component: AboutComponent},
        {path: 'products', component: LinkoptikComponent, },      
        {path: 'products/may-do-kich-thuoc-hat', children:[
            {path: '', component: LspaComponent},
            {path: 'lt2200', component: Lt2200Component}, 
            {path: 'lt3600', component: Lt3600Component},
        ]},
        {path: 'cong-nghe', component: TechnologyComponent, children:[
            {path: '', component: IntroduceComponent},
            {path: 'acad', component: AcadComponent}, 
            {path: 'airy-disk', component: AiryDiskComponent},
            {path: 'filter', component: FilterComponent}, 
            {path: 'trapezoidal-window', component: TrapezoidalComponent},
            {path: 'laser', component: LaserComponent}, 
        ]},
        {path: 'contact', component: ContactComponent},
    ]}, 
    

    // {path: 'login', component: LoginComponent, title:'Login', 
    // },    
    // {path: 'xepphong', 
    //     loadComponent: () => import('./components/xepphong/phong').then(m => m.PhongComponent),
    //     title:'Xep Phong', 
    // },
    
    // {
    //     path: 'admin', 
    //     canActivate: [authGuard],
    //     data: {role: 'admin'},
    //     title:'Admin',
    //     component: UserContentComponent,
    //     children: [
    //         {path: 'customer', component: CustomerListComponent,},
    //         {path: 'userlist', component: UserListComponent,},            
    //     ]
    // },

    // {
    //     path: 'guest', 
    //     canActivate: [authGuard],
    //     data: {role: 'guest'},
    //     title:'Guest',
    //     component: UserContentComponent,
    //     children: [
    //         {path: 'customer', component: CustomerListComponent,},
    //         {path: 'userlist', component: UserListComponent,},            
    //     ]
    // },
    // {
    //     path: 'user/:id', 
    //     canActivate: [authGuard],
    //     data: {role: 'user'},        
    //     title:'Linkoptik',     
    //     component: UserContentComponent,
    //     children: [
    //         {path: 'customer', component: CustomerListComponent}]        
    // },

    // {path: 'create-account', 
    //     // component: CreateAccountComponent, 
    //     loadComponent: () => import('./pages/user-manage/create-account.component').then(m => m.CreateAccountComponent),
    //     title:'Create Account',
    //     canActivate: [authGuard],
    //     data: {role: 'create-account'},        
    // },
    {path: '**', component: NotFoundComponent, title:'Not Found'}, 
    
];
