import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  register;
  password;
  passwordr;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alrtCtrl: AlertController) {
    let reg = navParams.get('register');
    if (reg) {
      this.register = reg;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  submit() {
    let pass = localStorage.getItem('passwordContain');
    if (pass == this.password) {
      this.navCtrl.setRoot(HomePage);
    } else {
      const alert = this.alrtCtrl.create({
        title: 'خطا',
        subTitle: 'رمز عبور اشتباه است!',
        buttons: [
          {
            text: 'باشه',
            handler: data => { }
          }]
      });
      alert.present();
    }
  }
  setpass() {
    if (this.password && this.passwordr) {
      if (this.password == this.passwordr) {
        localStorage.setItem('password', 'true');
        localStorage.setItem('passwordContain', this.password);
        const alert = this.alrtCtrl.create({
          title: 'پیام موفقیت آمیز',
          subTitle: 'رمز عبور با موفقیت فعال شد!',
          buttons: [
            {
              text: 'باشه',
              handler: data => {
                // this.navCtrl.pop();
              }
            }]
        });
        alert.present();
        alert.onDidDismiss(()=>{
          this.navCtrl.pop();
        });

      } else {
        const alert = this.alrtCtrl.create({
          title: 'خطا',
          subTitle: 'تکرار رمز عبور اشتباه است!',
          buttons: [
            {
              text: 'باشه',
              handler: data => { }
            }]
        });
        alert.present();
      }
    }
  }
}
