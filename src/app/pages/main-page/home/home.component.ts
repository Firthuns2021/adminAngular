import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {OrdersService} from '../../../services/orders.service';
import {ProductsService} from '../../../services/products.service';
import {SalesService} from '../../../services/sales.service';
import {environment} from '../../../../environments/environment';
import {StoresService} from '../../../services/stores.service';
import {functions} from '../../../helpers/functions';

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
    data:  [ ],
    columnNames: [ 'Date' ,  'Total' ],
    options: {
      colors: ['#FFC107']
    }

  };

  totalSales = 0;

  /*=============================================
  RANGOS DE FECHAS
  =============================================*/

  startDate = new Date(new Date().getFullYear(), 0, 1); // Se trae to.do lo del año actual
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
    console.log('this.startDate', functions.formatDate(  this.startDate));
    console.log('this.endDate', this.endDate);
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
  private getStores(): any {

    this.loadStores = true;

    this.storesService.getData()
      .subscribe((resp?: any) => {

        this.stores = Object.keys(resp).length;
        this.loadStores = false;

      });
  }

  private getSales(): any {
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

    /*=============================================
 Filtrar ventas por fechas
=============================================*/
    this.salesService.getDataByDate(functions.formatDate(this.startDate), functions.formatDate(this.endDate))
      .subscribe((resp?: any) => {
        /*=============================================
 Separar mes y total
=============================================*/
        const sales: any = [] ;
        Object.keys(resp).map( (a, i ) => {

          if ( resp[a].status === 'success'){
            sales[i] = {
              date: resp[a].date.substring(0, 7),
              total: Number(resp[a].commission)
            };
          }
          sales.sort( (x: { date: string | number | Date; }, y: { date: string | number | Date; } ) => new Date(x.date).getTime() > new Date(y.date).getTime())
          console.log(sales.sort( (x: { date: string | number | Date; }, y: { date: string | number | Date; } ) => new Date(x.date).getTime() > new Date(y.date).getTime()));
     });
        // console.log('sales', sales);

        /*=============================================
          Sumar total en mes repetido
=============================================*/
     const result = sales.reduce((r: any, o: any) => ( r[o.date] ? (r[o.date].total += o.total) : (r[o.date] = {...o}), r), {});
        // console.log('result', result);
        /*=============================================
      Agregar el arreglo a la data del gráfico
      =============================================*/
     Object.keys(result).map( (a) => {

          const data = [ result[a].date, result[a].total];

          this.chart.data.push(data);


          /*=============================================
    Sumar el total  de ventas
    =============================================*/

          this.chart.data.forEach((value: any) => {

            this.totalSales += value[1];

          });
        });

      });


    this.loadSales = false;
  }

  getUsers(): any {
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
