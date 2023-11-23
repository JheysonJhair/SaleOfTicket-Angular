import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { dtoSaleDetail } from 'src/app/interfaces/saleDetail';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {  saleStateHelp: number;
  notificacionesCount: number = 0;
  notificaciones: any[] = [];
  showNotifications: boolean = false;  message: string;
  listSaleDetail: dtoSaleDetail[] = [];
  id:string;
  constructor(
    private router: Router,
    private _saleService: SaleService,
    private aRoute: ActivatedRoute
  ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.getStateStudent();
    this.notificacionesCount = this.notificaciones.length;
  }

  getStateStudent(){
    this._saleService.getSaleGeyByIdStudent(this.id).subscribe((data) => {
      this.listSaleDetail = data;
      this.saleStateHelp = (this.listSaleDetail[0].saleState)
      if(this.listSaleDetail[0].saleState != 0){
        this.notificacionesCount = 2;
      }
      if(this.saleStateHelp == 2){
        this.notificaciones = [
          { mensaje: 'Notificación de gmail.' },
          { mensaje: 'Compra realizada con exito...' },
        ];

      }else if(this.saleStateHelp == 1){
        this.notificaciones = [
          { mensaje: 'Notificación de gmail.' },
          { mensaje: 'Su compra esta en proceso...' },
        ];
      }else if(this.saleStateHelp == 0){
        this.notificaciones = [
          { mensaje: 'Notificación de gmail.' },
          { mensaje: 'No realizo aun la compra...' },
        ];
        this.message = "";
      }else{
        this.notificaciones = [
          { mensaje: 'Notificación de gmail.' },
          { mensaje: 'Su compra fue rechazada...' },
        ];
      }
    });
  }
  handleNotificacionesClick(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
  }

  handleSubMenuClick(mensaje: string) {
    if (mensaje === this.notificaciones[0].mensaje) {
      window.open('https://mail.google.com/mail/u/1/#inbox', '_blank');
    } else {
      console.log(`Clic en notificación: ${mensaje}`);
    }
  }

  handleChangePassword() {
    this.router.navigate(['/pass']);
  }

  handleLogout() {
    this.router.navigate(['/']);
  }
}
