import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { Blogshop } from "src/app/objects/blogshop/blogshop.object";
import { BsDataService } from "src/app/services/bs-data.service";
import { NameValueModel } from "src/app/objects/blogshop/namevaluemodel.object";

@Component({
  selector: "app-comparision-page",
  templateUrl: "./comparision-page.component.html",
  styleUrls: ["./comparision-page.component.css"],
})
export class ComparisionPageComponent implements OnInit {
  constructor(private bsdataservice: BsDataService) {}

  selectedShop: Blogshop;
  shopNameList: Array<NameValueModel>;
  itemTypeList: Array<NameValueModel>;
  priceList: Array<NameValueModel>;
  result: Array<Blogshop>;

  shopChecked: Array<Boolean>;
  typeChecked: Array<Boolean>;
  errorMsg: string;

  isLoading: boolean;
  displayScrollToTopBtn: boolean;
  displayParallaxImg: boolean;

  ngOnInit() {
    this.isLoading = false;
    this.errorMsg = "";
    this.result = new Array<Blogshop>();
    this.selectedShop = new Blogshop();
    this.selectedShop.shopName = new Array<string>();
    this.selectedShop.itemType = new Array<string>();
    this.selectedShop.itemPrice = "";
    // set checkbox lists
    this.shopNameList = Array<NameValueModel>();
    this.shopNameList = [
      { name: "The Tinsel Rack", value: "TTR" },
      { name: "Shop Sassy Dream", value: "SSD" },
      { name: "Lovet", value: "LOVET" },
      { name: "All", value: "ALL" },
    ];
    this.itemTypeList = Array<NameValueModel>();
    this.itemTypeList = [
      { name: "Dress", value: "dress" },
      { name: "Skirt", value: "skirt" },
      { name: "Shorts", value: "shorts" },
      { name: "Top", value: "top" },
      { name: "Pants", value: "pants" },
      { name: "Bottoms", value: "bottoms" },
      { name: "One-piece", value: "one-piece" },
      { name: "Romper", value: "romper" },
      { name: "Outerwear", value: "outerwear" },
      { name: "All", value: "all" },
    ];

    // this.priceList = ['10', '20', '25','30', '40', ]
    this.priceList = Array<NameValueModel>();
    this.priceList = [
      { name: "$10", value: "10" },
      { name: "$20", value: "20" },
      { name: "$25", value: "25" },
      { name: "$30", value: "30" },
      { name: "$40", value: "40" },
      { name: "$50", value: "50" },
    ];

    // reset list of checkboxes
    this.shopChecked = new Array<Boolean>();
    this.typeChecked = new Array<Boolean>();
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    console.log(document.documentElement.scrollTop);
    console.log(document.documentElement.offsetHeight);
    console.log(document.documentElement.scrollHeight);
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos > 1000) {
      //Do your action here
      this.displayScrollToTopBtn = true;
    } else {
      this.displayScrollToTopBtn = false;
    }

    if (pos > 1500 && pos < 2000) {
      this.displayParallaxImg = true;
    } else {
      this.displayParallaxImg = false
    }
  }

  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  shopNameCheckboxAction(index) {
    // if all is selected
    if (index === this.shopNameList.length - 1) {
      for (let i = 0; i < this.shopNameList.length; i++) {
        this.shopChecked[i] = this.shopChecked[index];
      }
    } else {
      let maxIndex = this.shopNameList.length - 1;
      this.shopChecked[maxIndex] = false;
    }
  }

  itemTypeCheckboxAction(index) {
    // if all is selected
    if (index === this.itemTypeList.length - 1) {
      for (let i = 0; i < this.itemTypeList.length; i++) {
        this.typeChecked[i] = this.typeChecked[index];
      }
    } else {
      let maxIndex = this.itemTypeList.length - 1;
      this.typeChecked[maxIndex] = false;
    }
  }

  validateFields() {
    let isValidShopName = false;
    let isValidItemType = false;
    // selected shop name checkboxes
    for (let i = 0; i < this.shopNameList.length; i++) {
      if (this.shopChecked[i] == true) {
        isValidShopName = true;
        console.log("shop chosen:", this.shopNameList[i].name);
        this.selectedShop.shopName.push(this.shopNameList[i].value);
      }
    }

    // selected item type checkboxes
    for (let i = 0; i < this.itemTypeList.length; i++) {
      if (this.typeChecked[i] == true) {
        isValidItemType = true;
        console.log("type chosen:", this.itemTypeList[i].name);
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
    this.isLoading = true;
    let isValidForm = this.validateFields();

    if (!isValidForm) {
      this.errorMsg = "Please select a blogshop and an item type";
      this.isLoading = false;

      return;
    } else {
      this.errorMsg = "";
    }

    //console.log("item price: ", this.selectedShop.itemPrice)

    // get result from data service
    if (
      this.selectedShop.shopName.length > 0 &&
      this.selectedShop.itemType.length > 0
    ) {
      this.bsdataservice
        .getTypesFromShops(this.selectedShop)
        .subscribe((returnedData) => {
          console.log("returnedData:", returnedData);
          if (returnedData !== null) {
            let tempResultList = new Array<Blogshop>();
            let returnedDataList = returnedData;
            for (let item in returnedDataList) {
              tempResultList.push(returnedDataList[item]);
            }

            // price filter
            if (
              this.selectedShop.itemPrice !== null &&
              parseInt(this.selectedShop.itemPrice) > 0
            ) {
              for (let item in tempResultList) {
                if (
                  parseInt(tempResultList[item].itemPrice) >
                  parseInt(this.selectedShop.itemPrice)
                ) {
                  //console.log("removing:", tempResultList[item])
                } else {
                  this.result.push(tempResultList[item]);
                }
              }
            } else {
              this.result = tempResultList;
            }
            this.isLoading = false;

            console.log("this.result:", this.result);
          }
        });
    }
  }
}
