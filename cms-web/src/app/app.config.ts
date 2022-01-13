import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  private appConfig;

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get('assets/AppOptions.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

//   getConfig() {
//     return this.appConfig;
//   }
/**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.appConfig[key];
    }
}