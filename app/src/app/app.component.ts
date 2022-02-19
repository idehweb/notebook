import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PasswordPage } from '../pages/password/password';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = HomePage;
  passwordActive = false;
  constructor(public events: Events, public menuCtrl: MenuController, private alrtCtrl: AlertController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let pass = localStorage.getItem('passwordContain');
      console.log('pass is:', pass);
      if (!pass || pass == null || pass == 'null' || pass == '') {
        console.log('in2')

        this.navCtrl.setRoot(HomePage);
        this.passwordActive = false;

      } else {
        console.log('in')
        this.navCtrl.setRoot(PasswordPage);
        this.passwordActive = true;

      }
    });

  }

  activatePass(p = true) {
    let pass = localStorage.getItem('passwordContain');
    if (pass) {
      console.log('we have pass');
      // this.navCtrl.setRoot(PasswordPage);
      this.passwordActive = true;

    } else {
      console.log('we do not have pass');

      // this.navCtrl.setRoot(HomePage);
      this.passwordActive = false;

    }
  }
  letUsActivatePass() {
    console.log('this.passwordActive', this.passwordActive);
    if (this.passwordActive) {
      this.menuCtrl.close();
      this.navCtrl.push(PasswordPage, { register: true });
    } else {
      const alert = this.alrtCtrl.create({
        title: 'حذف رمز',
        subTitle: 'آیا رمز عبور را غیر فعال میکنید؟',
        buttons: [{
          text: 'خیر',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'بله',
          handler: data => {
            localStorage.setItem('passwordContain', '');
            setTimeout(() => {
              this.passwordActive = false;

            }, 300);
            this.menuCtrl.close();

          }
        }]
      });
      alert.present();
      alert.onDidDismiss(() => {
        this.passwordActive = true;
      });
    }
  }
  menuOpened() {
    this.activatePass(false);
  }
  menuClosed() {
    this.activatePass(false);
  }
}
