import { UtilService } from './../providers/util.service';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  result: any;
  form: UserLogin = new UserLogin();

  constructor(private navCtrl: NavController, private userService: UserService, private utilService: UtilService) { }

  ngOnInit() {
  }

  public async login() {

    if (!this.utilService.validateForm(this.form))
      return this.utilService.showToast("Por favor preencha todos campos !");

    let loading = await this.utilService.showLoading('Processando ...');
    loading.present();

    await this.userService.login(this.form).then((response) => {
      loading.dismiss();

      this.utilService.showToast(`Seja bem vindo ${response.email}`);

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('userId', response.userId);

      this.navCtrl.navigateForward('/home');

    }).catch((response) => {
      loading.dismiss();
      this.utilService.showToast('Email ou senha inválidos, tente novamante !');
    });
  }

}

class UserLogin {

  email: string;
  password: string;

  constructor() {
    this.email = null;
    this.password = null;
  }
}
