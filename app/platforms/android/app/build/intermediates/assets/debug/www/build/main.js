webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toast_toast__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Storage } from '@ionic/storage';


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, ToastProvider, alertCtrl, sqlite) {
        this.navCtrl = navCtrl;
        this.ToastProvider = ToastProvider;
        this.alertCtrl = alertCtrl;
        this.sqlite = sqlite;
        this.type = 't1';
        this.items = [];
        this.editMode = false;
        this.status = 'active';
        this.delete = false;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.activateDB();
    };
    HomePage.prototype.activateDB = function () {
        var _this = this;
        this.sqlite.create({
            name: 'transaction.db',
            location: 'default'
        }).then(function (db) {
            _this.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS transactions(ID INTEGER PRIMARY KEY AUTOINCREMENT,money INT NOT NULL , whyfor TEXT , type TEXT , status TEXT)", [])
                .then(function () {
                console.log('after table create or opened');
                _this.refreshAccount();
            })
                .catch(function (e) {
                console.log(e);
                _this.err = JSON.stringify(e);
            });
        }).catch(function (e) {
            console.log(e);
            _this.err = JSON.stringify(e);
        });
    };
    HomePage.prototype.refreshAccount = function () {
        var ref = this;
        this.money = '';
        this.whyfor = '';
        this.type = 't1';
        this.status = '';
        this.itemToEdit = null;
        this.editMode = false;
        this.delete = false;
        if (this.db) {
            this.selectExecution();
        }
        else {
            this.activateDB();
        }
    };
    HomePage.prototype.selectExecution = function () {
        var _this = this;
        var ref = this;
        this.db.executeSql("SELECT * FROM transactions WHERE 1", [])
            .then(function (data) {
            if (data.rows.length > 0) {
                ref.items = data.rows;
                _this.items = [];
                for (var i = (data.rows.length - 1); i >= 0; i--) {
                    _this.items.push(data.rows.item(i));
                }
                // this.items=this.items.reverse();
            }
        }).catch(function (e) {
            console.log(e);
            _this.err = JSON.stringify(e);
        });
    };
    HomePage.prototype.submit = function () {
        var _this = this;
        var ref = this;
        // console.clear();
        if (this.whyfor && this.money && this.db) {
            if (this.editMode) {
                this.db.executeSql("UPDATE transactions SET money = " + this.money + ", whyfor = '" + this.whyfor + "', type = '" + this.type + "', status = '" + this.status + "'  WHERE transactions.ID = " + this.itemToEdit + " ;", [])
                    .then(function (d) {
                    console.log('Executed SQL', JSON.stringify(d));
                    _this.ToastProvider.showToast('با موفقیت ویرایش شد', 3000, 'bottom');
                    ref.refreshAccount();
                })
                    .catch(function (e) {
                    console.log(e);
                    _this.err = JSON.stringify(e);
                });
            }
            else {
                this.db.executeSql("INSERT INTO transactions (money , whyfor , type , status) VALUES ( " + this.money + ", '" + this.whyfor + "', '" + this.type + "', '" + this.status + "' );", [])
                    .then(function (d) {
                    console.log('Executed SQL', JSON.stringify(d));
                    _this.ToastProvider.showToast('با موفقیت ذخیره شد', 3000, 'bottom');
                    ref.refreshAccount();
                })
                    .catch(function (e) {
                    console.log(e);
                    _this.err = JSON.stringify(e);
                });
            }
        }
    };
    HomePage.prototype.editThis = function (item, i) {
        this.whyfor = item.whyfor;
        this.money = item.money;
        if (item.type)
            this.type = item.type;
        else
            this.type = 't1';
        this.itemToEdit = item.ID;
        this.editMode = true;
        this.scrollToTop();
    };
    HomePage.prototype.cancel = function () {
        this.money = '';
        this.whyfor = '';
        this.type = 't1';
        this.status = '';
        this.itemToEdit = null;
        this.editMode = false;
    };
    HomePage.prototype.convert = function (i) {
        return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    HomePage.prototype.deleteConfirm = function (item) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'اطمینان از حذف',
            message: 'آیا از حذف اطمینان دارید؟',
            buttons: [
                {
                    text: 'خیر',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'بله',
                    handler: function () {
                        _this.deleteItem(item);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.deleteItem = function (item) {
        var _this = this;
        var ref = this;
        if (this.db && item.ID) {
            this.db.executeSql("DELETE FROM transactions WHERE ID = " + item.ID + " ;", [])
                .then(function (d) {
                console.log('Executed SQL', JSON.stringify(d));
                _this.ToastProvider.showToast('با موفقیت حذف شد', 3000, 'bottom');
                ref.refreshAccount();
            })
                .catch(function (e) {
                console.log(e);
                _this.err = JSON.stringify(e);
            });
        }
    };
    HomePage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/hamidalinia/Documents/projects/notebook/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n\n    <ion-title>\n      نوت بوک\n    </ion-title>\n\n\n\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page1">\n  <ion-item>\n    <ion-label color="primary">چقدر؟</ion-label>\n    <ion-input [(ngModel)]="money" type="number"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label color="primary">واس چی؟</ion-label>\n    <ion-input [(ngModel)]="whyfor"></ion-input>\n  </ion-item>\n  <ion-list radio-group [(ngModel)]="type" class="margin-right">\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label class="fontweigtnormal">گرفتم</ion-label>\n          <ion-radio value="t1" checked="true"></ion-radio>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label class="fontweigtnormal">دادم</ion-label>\n          <ion-radio value="t2"></ion-radio>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n  <ion-row>\n    <ion-col>\n      <button ion-button full block (click)="submit()">ثبت</button>\n    </ion-col>\n    <ion-col *ngIf="editMode && itemToEdit">\n      <button ion-button full block (click)="cancel()">لغو</button>\n    </ion-col>\n  </ion-row>\n \n  <div class="listBelow">\n    <ion-list class="type {{item.type}}" *ngFor="let item of items;let i=index">\n      <ion-item-sliding>\n        <ion-item>\n          {{convert(item.money)}} تومان\n          <br>\n          {{item.whyfor}}\n        </ion-item>\n        <ion-item-options side="left">\n          <button ion-button color="danger" (click)="deleteConfirm(item)">حذف</button>\n          <button ion-button (click)="editThis(item)">ویرایش</button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </div>\n  <div *ngIf="err">\n    {{err}}\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/hamidalinia/Documents/projects/notebook/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_toast_toast__["a" /* ToastProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ToastProvider = /** @class */ (function () {
    function ToastProvider(toastCtrl) {
        this.toastCtrl = toastCtrl;
        console.log('Hello ToastProvider Provider');
    }
    ToastProvider.prototype.showToast = function (message, duration, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position,
            dismissOnPageChange: true
        });
        toast.present(toast);
    };
    ToastProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], ToastProvider);
    return ToastProvider;
}());

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_toast_toast__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// import { NativeStorage } from '@ionic-native/native-storage';

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* MyApp */], { backButtonText: '' }, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                // NativeStorage,
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                { provide: __WEBPACK_IMPORTED_MODULE_5__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_toast_toast__["a" /* ToastProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "navCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/hamidalinia/Documents/projects/notebook/src/app/app.html"*/'<ion-menu [content]="mainContent" side="right">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>\n        فهرست\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content id="side-menu21">\n    <!-- <ion-list id="menu-list1">\n      <ion-item color="none" menuClose="" on-click="goToList()" id="menu-list-item1">\n        سفارش های قبلی من\n      </ion-item>\n      <ion-item color="none" menuClose="" on-click="goToAdvice()" id="menu-list-item2">\n          انتقادات و پیشنهادات\n        </ion-item>\n      <ion-item color="none" menuClose="" on-click="goToAbout()" id="menu-list-item2">\n        درباره تن ویچ\n      </ion-item>\n\n    </ion-list> -->\n  </ion-content>\n</ion-menu>\n\n<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/hamidalinia/Documents/projects/notebook/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map