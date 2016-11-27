import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Azure } from '../services/azure';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { HelpRequestPage } from '../pages/help-request/help-request';
import { HelpDetailPage } from '../pages/help-detail/help-detail';
import { HelpWaitPage } from '../pages/help-wait/help-wait';
import { HelpResponsePage } from '../pages/help-response/help-response';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SettingsPage,
    HomePage,
    MenuPage,
    HelpRequestPage,
    HelpDetailPage,
    HelpWaitPage,
    HelpResponsePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SettingsPage,
    HomePage,
    MenuPage,
    HelpRequestPage,
    HelpDetailPage,
    HelpWaitPage,
    HelpResponsePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Azure
  ]
})
export class AppModule {}
