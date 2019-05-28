import { Injectable } from '@angular/core';
import { RestclientService } from './restclient.service';
import { Blogshop } from '../objects/blogshop/blogshop.object';

@Injectable({
  providedIn: 'root'
})
export class BsDataService {

  constructor(private restClient: RestclientService) { }

  getAllFromShop(selectedShop: Blogshop) {
    console.log("/getAllFromShop/" + selectedShop.value)
    return this.restClient.getJson("/getAllFromShop/" + selectedShop.value)
  }

  getTypesFromShops(selectedShop: Blogshop) {
    let shopNames = selectedShop.value[0];
    for (let i = 1; i < selectedShop.value.length; i++) {
      shopNames += "&" + selectedShop.value[i]
    }

    let itemTypes = selectedShop.itemType[0];
    for (let i = 1; i < selectedShop.itemType.length; i++) {
      itemTypes += "&" + selectedShop.itemType[i]
    }

    return this.restClient.getJson("/getTypesFromShops/"+ shopNames + "/" + itemTypes)
  }
}
