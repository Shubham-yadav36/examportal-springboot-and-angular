import { ShowQuizzesOfUserComponent } from './pages/admin/show-quizzes-of-user/show-quizzes-of-user.component';
import { LoggedUserDisplayComponent } from './pages/user/logged-user-display/logged-user-display.component';
import { UpdteProfileComponent } from './pages/updte-profile/updte-profile.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UserGuard } from './services/user.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { GenerateCertificateComponent } from './pages/user/generate-certificate/generate-certificate.component';
import { ShowResultComponent } from './pages/user/show-result/show-result.component';
import { NotForAdminGuard } from './services/not-for-admin.guard';
import { AboutusComponent } from './pages/user/aboutus/aboutus.component';
import { ContactusComponent } from './pages/user/contactus/contactus.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowAllUserComponent } from './pages/admin/show-all-user/show-all-user.component';
import { BothguardGuard } from './services/bothguard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NotForAdminGuard],

    children: [
      // this component for user who is logged in but not admin
      { path: '', component: LoggedUserDisplayComponent }
    ],
  },
  {
    path: 'user',
    component: HomeComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'attepted-test/:userId',
        component: ShowResultComponent,
      },
      {
        path: 'user-profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'contact',
    component: ContactusComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],

    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:qId',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qId/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-questions/:qId/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'update-question/:qId/:title',
        component: UpdateQuestionComponent,
      },
      {
        path: 'all-user',
        component: ShowAllUserComponent,
      },
      {
        path: 'all-quiz-of-user/:userId',
        component: ShowQuizzesOfUserComponent,
      }
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: ':catId',
        component: LoadQuizComponent,
      },
      {
        path: 'instruction/:qId',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start-quiz/:qId',
    component: StartQuizComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'generate-certificate/:rId',
    component: GenerateCertificateComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'about',
    component: AboutusComponent,
    pathMatch: 'full',
  },
  {
    path: 'updateProfile/:userId',
    component: UpdteProfileComponent,
    pathMatch: 'full',
    canActivate: [BothguardGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
