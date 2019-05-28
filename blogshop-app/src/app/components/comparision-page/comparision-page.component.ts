import { Component, OnInit, ViewChild } from '@angular/core';
import { Blogshop } from 'src/app/objects/blogshop/blogshop.object';
import { BsDataService } from 'src/app/services/bs-data.service';
import { ShopNameList } from 'src/app/objects/blogshop/shopnamelist.object';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-comparision-page',
  templateUrl: './comparision-page.component.html',
  styleUrls: ['./comparision-page.component.css']
})
export class ComparisionPageComponent implements OnInit {
  constructor(private bsdataservice: BsDataService) { }

  shopNameList: Array<ShopNameList>;
  selectedShop: Blogshop;
  itemTypeList: Array<String>;
  result: Array<Blogshop>;

  shopChecked: Array<Boolean>;
  typeChecked: Array<Boolean>;


  ngOnInit() {
    this.result = new Array<Blogshop>();
    this.selectedShop = new Blogshop();

    // set checkbox lists 
    this.shopNameList = Array<ShopNameList>();
    this.shopNameList.push({ name: 'The Tinsel Rack', value: 'TTR' });
    this.shopNameList.push({ name: 'Shop Sassy Dream', value: 'SSD' });
    this.itemTypeList = ["dress", "skirt", "shorts", "top", "pants", "bottoms", "one-piece", "romper"]

    // reset list of shopnames checked
    this.shopChecked = new Array<Boolean>();
    for (let i = 0; i < this.shopNameList.length; i++) {
      this.shopChecked[i] = false;
    }

    // reset list of item types checked
    this.typeChecked = new Array<Boolean>();
    for (let i = 0; i < this.itemTypeList.length; i++) {
      this.typeChecked[i] = false;
    }

    this.selectedShop.value = new Array<String>();
    this.selectedShop.itemType = new Array<String>();
  }

  submitForm() {
    // reset from previous saved selections
    this.selectedShop.value = new Array<String>();
    this.selectedShop.itemType = new Array<String>();
    this.result = new Array<Blogshop>();

    // shop name checkboxes
    for (let i = 0; i < this.shopNameList.length; i++) {
      if (this.shopChecked[i] == true) {
        console.log("shop chosen:", this.shopNameList[i].name)
        this.selectedShop.value.push(this.shopNameList[i].value);
      }
    }
    console.log(this.selectedShop.value)

    // item type checkboxes
    for (let i = 0; i < this.itemTypeList.length; i++) {
      if (this.typeChecked[i] == true) {
        console.log("type chosen:", this.itemTypeList[i])
        this.selectedShop.itemType.push(this.itemTypeList[i]);
      }
    }

    if (this.selectedShop.value.length > 0) {
      this.bsdataservice.getTypesFromShops(this.selectedShop).subscribe((returnedData) => {
        if (returnedData !== null) {
          let returnedDataList = returnedData;
          for (let item in returnedDataList) {
            this.result.push(returnedDataList[item])
          }
          console.log("this.result:", this.result)
        }
      })
    }
    // else {
    //   console.log("selecting all from " + this.selectedShop.value);
    //   this.bsdataservice.getAllFromShop(this.selectedShop).subscribe((returnedData) => {
    //     console.log(returnedData)
    //   })
    // }

  }
}
