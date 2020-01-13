import { UtilService } from './../providers/util.service';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  result: any;
  form: User = new User();

  constructor(private userService: UserService, private utilService: UtilService) { }

  ngOnInit() {
  }

  public async registerUser() {

    if (!this.utilService.validateForm(this.form))
      return this.utilService.showToast("Por favor preencha todos campos !");

    let loading = await this.utilService.showLoading('Processando ...');
    loading.present();

    await this.userService.registerUser(this.form).then((response) => {

      this.result = JSON.stringify(response);
      loading.dismiss();
      this.utilService.showToast("Parabéns, sua conta foi criada com sucesso !");
    }).catch((response) => {

      this.result = JSON.stringify(response.error);
      loading.dismiss();
      this.utilService.showToast(this.result);
    });
  }
}

class User {

  email: string;
  password: string;

  constructor() {
    this.email = null;
    this.password = null;
  }
}
