import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {OrdersService} from '../../../services/orders.service';
import {ProductsService} from '../../../services/products.service';
import {SalesService} from '../../../services/sales.service';
import {environment} from '../../../../environments/environment';
import {StoresService} from '../../../services/stores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*=============================================
  Variables globales para definir el inventario de productos
  =============================================*/

  products = 0;
  loadProducts = false;
  latestProducts: any = [];

  /*=============================================
  Variable globales para definir el inventario de tiendas
  =============================================*/
  stores = 0;
  loadStores = false;

  /*=============================================
 Variable globales para definir el inventario de ventas
 =============================================*/
  sales = 0;
  loadSales = false;

  /*=============================================
  Variable globales para definir el inventario de usuarios
  =============================================*/
  users = 0;
  loadUsers = false;

  /*=============================================
  ANGULAR GOOGLE CHARTS https://github.com/FERNman/angular-google-charts
  =============================================*/

  chart: any = {
    type: 'AreaChart',
    data:  [
      ['London', 8136000],
      ['New York', 8538000],
      ['Paris', 2244000],
      ['Berlin', 3470000],
      ['Kairo', 19500000],
    ],
    columnNames: [ 'Date' ,  'Total' ],
    options: {
      colors: ['#FFC107']
    }

  };

  totalSales = 0;

  /*=============================================
  RANGOS DE FECHAS
  =============================================*/

  startDate = new Date(new Date().getFullYear(), 0, 1); // Se trae todo lo del año actual
  endDate = new Date();

  /*=============================================
  Últimas órdenes
  =============================================*/
  loadOrders = false;
  latestOrders: any = [];

  /*=============================================
  Variable global que captura la ruta de los archivos de imagen
  =============================================*/

  path = environment.urlFiles;

  /*=============================================
  Variable global que captura la ruta del marketplace público
  =============================================*/
  domainMP = environment.domainMP;

  constructor(private productsService: ProductsService,
              private salesService: SalesService,
              private usersService: UsersService,
              private ordersService: OrdersService,
              private storesService: StoresService) { }

  ngOnInit(): void {

    this.getProducts();
    this.getStores();
    this.getSales();
    this.getUsers();
    this.lastOrders();

  }


  /*=============================================
Inventario de productos
=============================================*/
  private getProducts(): any {

    this.loadProducts = true;

    this.productsService.getData()
      .subscribe((resp?: any) => {

        this.products = Object.keys(resp).length;
        this.loadProducts = false;

        /*=============================================
        Traer los últimos 5 productos
        =============================================*/

      });
  }

  /*=============================================
  Inventario de tiendas
  =============================================*/
  private getStores() {

    this.loadStores = true;

    this.storesService.getData()
      .subscribe((resp?: any) => {

        this.stores = Object.keys(resp).length;
        this.loadStores = false;

      });
  }

  private getSales() {
    this.loadSales = true;
    // this.chart.data = [];

    /*=============================================
    Total ventas
    =============================================*/

    this.salesService.getData()
      .subscribe((resp?: any) => {

        this.sales = Object.keys(resp).length;
        this.loadSales = false;

      });

  }

  private getUsers(): any {
    this.loadUsers = true;

    this.usersService.getData()
      .subscribe((resp?: any) => {

        this.users = Object.keys(resp).length;
        this.loadUsers = false;

      });
  }

     lastOrders(): any {

    /*=============================================
    Traer las últimas 5 ventas
    =============================================*/
    this.loadOrders = true;

    this.salesService.getLatestData()
      .subscribe((resp?: any) => {


        this.loadOrders = false;
        this.users = Object.keys(resp).length;
        // Object.keys(resp).map( (a, i) => {
        //
        //   this.latestOrders[i] = {};
        //
        //   /*=============================================
        //   Traer las últimas 5 órdenes
        //   =============================================*/
        //
        //   this.ordersService.getItem(resp[a].id_order)
        //     .subscribe((resp2?: any) => {
        //
        //
        //       this.latestOrders[i] = {
        //         id: a,
        //         product: resp2.product,
        //         status: resp2.status,
        //         date: resp[a].date
        //       };
        //
        //
        //
        //     });
        //
        // });

      });


  }
}
