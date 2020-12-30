import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/services/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  collapsed = false;
  userSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
   this.userSubscription = this.authService.user.subscribe( user => {
     this.isAuthenticated = !!user; // = !user ? false : true;
   })
  }


  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

  }

  logout() {
    this.authService.logout();
  }
}
