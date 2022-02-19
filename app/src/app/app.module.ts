
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PasswordPage } from '../pages/password/password';
import { PasswordPageModule } from '../pages/password/password.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgModule, ErrorHandler } from '@angular/core'; 
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ToastProvider } from '../providers/toast/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';
// import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite } from '@ionic-native/sqlite';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    PasswordPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{backButtonText: ''})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PasswordPage
  ],
  providers: [
    StatusBar,
    // NativeStorage,
    SQLite,
    SplashScreen,
    SocialSharing,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastProvider
  ]
})
export class AppModule { }