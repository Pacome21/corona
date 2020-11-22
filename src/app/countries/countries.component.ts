import { Component, OnInit } from '@angular/core';
import { ICountryDataModel } from '../shared/models/country-data.model';
import { CoronaService } from '../shared/services/corona.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  public countriesData: ICountryDataModel[];
  private a : number;
  selectedItemIndex: number = 0;

  constructor(private coronaService: CoronaService) { }

  ngOnInit(): void {
    this.getCountriesData();
  }
  pickCountry(index: number): void{
    this.selectedItemIndex = index;
    console.log('Clicked country : ' + this.countriesData[index].Country)
  }

  private getCountriesData(): void {  
    this.coronaService.getCountriesData()
      .subscribe(data => {
        this.countriesData = data;
        this.a = this.countriesData.length;
        console.log('corona service returned : ' + this.a);
      });
  }
}
