import { Music } from './../services/models/music';
import { UtilService } from './../providers/util.service';
import { MusicService } from './../providers/music.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.page.html',
  styleUrls: ['./releases.page.scss'],
})
export class ReleasesPage implements OnInit {

  musics: any;
  resultGetReleases: any;

  constructor(private musicService: MusicService, private utilService: UtilService) { }

  async ngOnInit() {
    await this.getReleases();
  }

  public async getReleases() {

    let loading = await this.utilService.showLoading('Processando ...');
    loading.present();

    await this.musicService.getReleases(localStorage.getItem('accessToken')).then((response) => {
      this.musics = response;
      this.resultGetReleases = response;
      loading.dismiss();
    }).catch((response) => {

      this.musics = JSON.stringify(response.error);
      loading.dismiss();
      this.utilService.showToast(this.musics);
    });
  }

  setFiltered(ev: any) {
    let val = ev.target.value;

    if(val === '')
      this.clear();

    if (val && val.trim() !== '') {
      this.musics = this.filterArtist(val);
    }
  }

  filterArtist(searchTerm: string) {
    return this.resultGetReleases.filter((music) => {
      return music.Artist.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  clear() {
    this.musics = this.resultGetReleases;
  }
}
