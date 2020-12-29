import {Component, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/services/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  collapsed = false;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }


  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
