import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/services/user.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //@Input permet de recevoir les données à l'appel du composant
  @Input() isLogin: boolean;
  //A l'inverse, @Output permet de renvoyer des données

  search: string = '';
  userId: string;
  user: User;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {

    //PErmet de récupérer le jwt et voir si l'utilisateur est connecté
    const token = localStorage.getItem("jwt");
    if (token) {
      //Si un token est présent, on récupère l'id dans le payload
      this.userId = JSON.parse(atob(token.split('.')[1])).payload?.id;
    }
    if (this.isLogin) {
      //On réculère l'utilisateur connecté via le userService afin de retrouver toutes les données de mon utilisateur.
      this.userService.getUserById(this.userId).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
