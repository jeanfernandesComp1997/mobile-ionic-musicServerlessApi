import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    }

    public getHostApi(): string {
        return "https://lwg38ke9h4.execute-api.us-east-2.amazonaws.com/";
    }

    public async showLoading(message: string = "Processando...") {
        let loading = await this.loadingCtrl.create({
            spinner: "crescent",
            message: message
        });

        return await loading;
    }

    public async showToast(message: string) {
        let toast = await this.toastCtrl.create({
            message: message,
            position: 'top',
            duration: 3000
        });

        toast.present();
    }

    public validateForm(form: any) {
        let validateMessage: boolean = true;

        Object.keys(form).forEach((element) => {
            if (form[element] === null || form[element] === "")
                validateMessage = false;
        });

        return validateMessage;
    }
}
