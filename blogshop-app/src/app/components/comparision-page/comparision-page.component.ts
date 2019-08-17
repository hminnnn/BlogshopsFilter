import { Component, OnInit, ViewChild } from '@angular/core';
import { Blogshop } from 'src/app/objects/blogshop/blogshop.object';
import { BsDataService } from 'src/app/services/bs-data.service';
import { NameValueModel } from 'src/app/objects/blogshop/namevaluemodel.object';

@Component({
  selector: 'app-comparision-page',
  templateUrl: './comparision-page.component.html',
  styleUrls: ['./comparision-page.component.css']
})
export class ComparisionPageComponent implements OnInit {
  constructor(private bsdataservice: BsDataService) { }

  selectedShop: Blogshop;
  shopNameList: Array<NameValueModel>;
  itemTypeList: Array<NameValueModel>;
  priceList: Array<NameValueModel>;
  result: Array<Blogshop>;

  shopChecked: Array<Boolean>;
  typeChecked: Array<Boolean>;
  errorMsg: string;


  ngOnInit() {
    this.errorMsg = ""
    this.result = new Array<Blogshop>();
    this.selectedShop = new Blogshop();
    this.selectedShop.shopName = new Array<string>();
    this.selectedShop.itemType = new Array<string>();
    this.selectedShop.itemPrice = ""
    // set checkbox lists 
    this.shopNameList = Array<NameValueModel>();
    this.shopNameList = [
      { name: 'The Tinsel Rack', value: 'TTR' },
      { name: 'Shop Sassy Dream', value: 'SSD' },
      { name: 'All', value: 'ALL' },
    ]
    this.itemTypeList = Array<NameValueModel>();
    this.itemTypeList = [
      { name: 'Dress', value: 'dress' },
      { name: 'Skirt', value: 'skirt' },
      { name: 'Shorts', value: 'shorts' },
      { name: 'Top', value: 'top' },
      { name: 'Pants', value: 'pants' },
      { name: 'Bottoms', value: 'bottoms' },
      { name: 'One-piece', value: 'one-piece' },
      { name: 'Romper', value: 'romper' },
      { name: 'All', value: 'all' },
    ]

    // this.priceList = ['10', '20', '25','30', '40', ]
    this.priceList = Array<NameValueModel>();
    this.priceList = [
      { name: '$10', value: '10' },
      { name: '$20', value: '20' },
      { name: '$25', value: '25' },
      { name: '$30', value: '30' },
      { name: '$40', value: '40' },
      { name: '$50', value: '50' },
    ]

    // reset list of checkboxes
    this.shopChecked = new Array<Boolean>();
    this.typeChecked = new Array<Boolean>();
  }

  shopNameCheckboxAction(index) {
    // if all is selected
    if (index === this.shopNameList.length - 1) {
      for (let i = 0; i < this.shopNameList.length; i++) {
        this.shopChecked[i] = this.shopChecked[index]
      }
    } else {
      let maxIndex = this.shopNameList.length - 1;
      this.shopChecked[maxIndex] = false
    }
  }

  itemTypeCheckboxAction(index) {
    // if all is selected
    if (index === this.itemTypeList.length - 1) {
      for (let i = 0; i < this.itemTypeList.length; i++) {
        this.typeChecked[i] = this.typeChecked[index]
      }
    } else {
      let maxIndex = this.itemTypeList.length - 1;
      this.typeChecked[maxIndex] = false
    }
  }

  validateFields() {

    let isValidShopName = false;
    let isValidItemType = false;
    // selected shop name checkboxes
    for (let i = 0; i < this.shopNameList.length; i++) {
      if (this.shopChecked[i] == true) {
        isValidShopName = true;
        console.log("shop chosen:", this.shopNameList[i].name)
        this.selectedShop.shopName.push(this.shopNameList[i].value);
      }
    }

    // selected item type checkboxes
    for (let i = 0; i < this.itemTypeList.length; i++) {
      if (this.typeChecked[i] == true) {
        isValidItemType = true;
        console.log("type chosen:", this.itemTypeList[i].name)
        this.selectedShop.itemType.push(this.itemTypeList[i].value);
      }
    }

    // selected price checkboxes
    // for (let i = 0; i < this.priceList.length; i++) {
    //   if (this.priceChecked[i] == true) {
    //     console.log("price chosen:", this.priceList[i].name)
    //     this.selectedShop.itemPrice = this.priceList[i].value;
    //   }
    // }

    return isValidShopName && isValidItemType;
  }

  submitForm() {

    // reset from previous saved selections
    this.selectedShop.shopName = new Array<string>();
    this.selectedShop.itemType = new Array<string>();
    this.result = new Array<Blogshop>();

    let isValidForm = this.validateFields();

    if (!isValidForm) {
      this.errorMsg = "Please select a blogshop and an item type"
      return;
    } else {
      this.errorMsg = ""
    }

    //console.log("item price: ", this.selectedShop.itemPrice)

    // get result from data service 
    if (this.selectedShop.shopName.length > 0 && this.selectedShop.itemType.length > 0) {
      this.bsdataservice.getTypesFromShops(this.selectedShop).subscribe((returnedData) => {
        //console.log("returnedData:", returnedData)
        if (returnedData !== null) {
          let tempResultList = new Array<Blogshop>();
          let returnedDataList = returnedData;
          for (let item in returnedDataList) {
            tempResultList.push(returnedDataList[item])
          }

          // price filter 
          if (this.selectedShop.itemPrice !== null && parseInt(this.selectedShop.itemPrice) > 0) {
            for (let item in tempResultList) {
              if (parseInt(tempResultList[item].itemPrice) > parseInt(this.selectedShop.itemPrice)) {
                //console.log("removing:", tempResultList[item])
              } else {
                this.result.push(tempResultList[item])
              }
            }
          } else {
            this.result = tempResultList;
          }

          console.log("this.result:", this.result)
        }
      });

    }
  }
}
