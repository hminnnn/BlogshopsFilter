import { Injectable } from '@angular/core';
import { RestclientService } from './restclient.service';
import { Blogshop } from '../objects/blogshop/blogshop.object';

@Injectable({
  providedIn: 'root'
})
export class BsDataService {

  constructor(private restClient: RestclientService) { }

  getAllFromShop(selectedShop: Blogshop) {
    console.log("/getAllFromShop/" + selectedShop.shopName)
    return this.restClient.getJson("/getAllFromShop/" + selectedShop.shopName)
  }

  getTypesFromShops(selectedShop: Blogshop) {
    console.log(selectedShop)
    let shopNames = selectedShop.shopName[0];
    for (let i = 1; i < selectedShop.shopName.length; i++) {
      shopNames += "&" + selectedShop.shopName[i]
    }
    let itemTypes = selectedShop.itemType[0];
    for (let i = 1; i < selectedShop.itemType.length; i++) {
      itemTypes += "&" + selectedShop.itemType[i]
    }
    return this.restClient.getJson("/getTypesFromShops/"+ shopNames + "/" + itemTypes)
  }
}
