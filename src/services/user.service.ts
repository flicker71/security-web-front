import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interface/user.interface';
import { map, Observable, retry } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

const nbRetry = 10;
@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) { }

  //Mes routes user

  apiUrl = baseUrl+'athena/user';
  
  //Récupère tout les utilisateurs
    getUsers(): Observable<User[]> {
        return this.httpClient.get(this.apiUrl).pipe(
          retry(nbRetry),
          map((body: any) => {
            // console.log('body :' , JSON.stringify(body));
            if(body) {
              return body;
            }
          })
        );
    }

    //Récupère seulement l'utilisateur séléctionné.
    getUserById(id: number | string): Observable<User> {
        return this.httpClient.get(this.apiUrl + '/' + id).pipe(
          retry(nbRetry),
          map((body: any) => {
            // console.log('body :' , JSON.stringify(body));
            if(body) {
              return body;
            }
          })
        );
    }

    //add un user
    addUser(username: string, first_name: string, last_name: string, mail: string, password: string): Observable<User> {
      return this.httpClient.post(this.apiUrl, {
        username: username,
        first_name: first_name,
        last_name: last_name,
        mail: mail,
        password: password
      }).pipe(
        retry(nbRetry),
        map((body: any) => {
          // console.log('body :' , JSON.stringify(body));
          if(body) {
            return body;
          }
        })
      );
  }

    //delete un user
    deleteUser(id : string | number) : Observable<any> {
      return this.httpClient.delete(this.apiUrl + '/' + id ).pipe(
        retry(nbRetry),
        map((body: any) => {
          // console.log('body :' , JSON.stringify(body));
          if(body) {
            console.log("l'utilisateur a été supprimé");
          }
          else {
            alert("L'utilisateur n'a pas été supprimé");
          }
        })
      );
  }

    //edit un user
    patchUser(id: number, data : User) : Observable<any> {
      let body = data;
      return this.httpClient.put(this.apiUrl + '/' + id, body).pipe(
        retry(nbRetry),
        map((body: any) => {
          if(body) {
            return body;
          }
          else {
            alert("Pas de modification");
          }
        }))
    }
}