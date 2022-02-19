import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Content, Events } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastProvider } from '../../providers/toast/toast';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Content) content: Content;
    err;

    whyfor;
    money;
    type = 't1';
    items = [];
    editMode = false;
    itemToEdit;
    status = 'active';
    delete = false;
    db;
    wholeMony = 0;

    constructor(public events: Events,private socialSharing: SocialSharing,public navCtrl: NavController, public ToastProvider: ToastProvider, private alertCtrl: AlertController, private sqlite: SQLite) {
        // events.publish('checkpass');
    }

    ionViewDidEnter() {
        this.activateDB();
        // this.events.publish('checkpass');
    }
    activateDB() {
        this.sqlite.create({
            name: 'transaction.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            this.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS transactions(ID INTEGER PRIMARY KEY AUTOINCREMENT,money INT NOT NULL , whyfor TEXT , type TEXT , status TEXT)", [])
                .then(() => {
                    console.log('after table create or opened');
                    this.refreshAccount();
                })
                .catch(e => {
                    console.log(e);
                    this.err = JSON.stringify(e);
                });
        }).catch(e => {
            console.log(e)
            this.err = JSON.stringify(e);
        });
    }
    refreshAccount() {
        this.items = [];
        this.money = '';
        this.whyfor = '';
        this.type = 't1';
        this.status = '';
        this.itemToEdit = null;
        this.editMode = false;
        this.delete = false;
        if (this.db) {
            this.selectExecution();
        } else {
            this.activateDB();
        }

    }
    selectExecution() {
        let ref = this;
        this.db.executeSql("SELECT * FROM transactions WHERE 1", [])
            .then((data) => {
                if (data.rows.length > 0) {
                    ref.items = data.rows;
                    this.items = [];
                    for (var i = (data.rows.length - 1); i >= 0; i--) {
                        if (data.rows.item(i).type == 't2') {
                            ref.wholeMony -= data.rows.item(i).money;
                        } else {
                            ref.wholeMony += data.rows.item(i).money;
                        }
                        this.items.push(data.rows.item(i))
                    }
                    // this.items=this.items.reverse();
                }

            }).catch(e => {
                console.log(e)
                this.err = JSON.stringify(e);
            });
    }
    submit() {
        let ref = this;
        // console.clear();
        if (this.whyfor && this.money && this.db) {
            if (this.editMode) {
                this.db.executeSql("UPDATE transactions SET money = " + this.money + ", whyfor = '" + this.whyfor + "', type = '" + this.type + "', status = '" + this.status + "'  WHERE transactions.ID = " + this.itemToEdit + " ;", [])
                    .then((d) => {
                        console.log('Executed SQL', JSON.stringify(d));
                        this.ToastProvider.showToast('با موفقیت ویرایش شد', 3000, 'bottom');
                        ref.refreshAccount();
                    })
                    .catch(e => {
                        console.log(e)
                        this.err = JSON.stringify(e);
                    });
            } else {
                this.db.executeSql("INSERT INTO transactions (money , whyfor , type , status) VALUES ( " + this.money + ", '" + this.whyfor + "', '" + this.type + "', '" + this.status + "' );", [])
                    .then((d) => {
                        console.log('Executed SQL', JSON.stringify(d));
                        this.ToastProvider.showToast('با موفقیت ذخیره شد', 3000, 'bottom');
                        ref.refreshAccount();
                    })
                    .catch(e => {
                        console.log(e)
                        this.err = JSON.stringify(e);
                    });
            }
        }
    }

    editThis(item, i) {
        this.whyfor = item.whyfor;
        this.money = item.money;
        if (item.type)
            this.type = item.type;
        else
            this.type = 't1';
        this.itemToEdit = item.ID;
        this.editMode = true;
        this.scrollToTop();
    }
    cancel() {
        this.money = '';
        this.whyfor = '';
        this.type = 't1';
        this.status = '';
        this.itemToEdit = null;
        this.editMode = false; 
    }
    convert(i) {
        if (i)
            return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    deleteConfirm(item) {
        let alert = this.alertCtrl.create({
            title: 'اطمینان از حذف',
            message: 'آیا از حذف اطمینان دارید؟',
            buttons: [
                {
                    text: 'خیر',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'بله',
                    handler: () => {
                        this.deleteItem(item);
                    }
                }
            ]
        });
        alert.present();
    }
    deleteItem(item) {
        let ref = this;
        if (this.db && item.ID) {
            console.log("DELETE FROM transactions WHERE ID = " + item.ID + " ;");
            this.db.executeSql("DELETE FROM transactions WHERE ID = " + item.ID + " ;", [])
                .then((d) => {
                    console.log('Executed SQL Deleted', JSON.stringify(d))
                    this.ToastProvider.showToast('با موفقیت حذف شد', 3000, 'bottom');

                    ref.refreshAccount();
                })
                .catch(e => {
                    console.log(e)
                    this.err = JSON.stringify(e);
                });
        }
    }
    scrollToTop() {
        this.content.scrollToTop();
    }
}
