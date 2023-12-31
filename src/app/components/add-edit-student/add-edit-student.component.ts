import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dtoStudent,insertStudent } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { AdministratorService } from 'src/app/services/administrator.service';
import { dtoAdministrator } from 'src/app/interfaces/administrator';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css'],
})
export class AddEditStudentComponent implements OnInit {
  accion = 'Registrar';
  id:string;
  id_a:string;

  pdfUrl = '../../../assets/pdf/DENEGADOS.pdf';

  addStudent: FormGroup;
  admin: dtoAdministrator[] | undefined;
  dtoStudent: dtoStudent | undefined;
  insertStudent: insertStudent | undefined;

  @ViewChild('denegadosButton') denegadosButton: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _studentService: StudentService,
    private router: Router,
    private _administratorService: AdministratorService,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addStudent = this.fb.group({
      dni: [
        '',
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      condition: ['', Validators.required],
      school: ['', Validators.required],
      faculty: ['', Validators.required],
      disability: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      address: ['', [Validators.required]],
      sex: [
        '',
        [Validators.required, Validators.maxLength(1), Validators.minLength(1)],
      ],
      code: [
        '',
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
    this.id_a = this.aRoute.snapshot.paramMap.get('id_a')!;
  }
  ngOnInit(): void {
    this.esEdit();
    this.getAdmin();
  }

  //------------------------------------------------------GET -ADMIN - SALE- LISTSALE - STUDENT
  getAdmin() {
    this._administratorService.getAdmin(this.id_a).subscribe((data) => {
      this.admin = data;
    });
  }

  esEdit() {
    if (this.id !== null) {
      this.accion = 'Editar';
      this._studentService.getStudent(this.id).subscribe(
        (data) => {
          this.dtoStudent = data;

          this.addStudent.controls['name'].setValue(data[0].name);
          this.addStudent.controls['dni'].setValue(data[0].dni);
          this.addStudent.controls['condition'].setValue(data[0].condition);
          this.addStudent.controls['lastName'].setValue(data[0].lastName);
          this.addStudent.controls['phone'].setValue(data[0].phone);
          this.addStudent.controls['address'].setValue(data[0].address);
          this.addStudent.controls['disability'].setValue(data[0].disability);
          this.addStudent.controls['school'].setValue(data[0].school);
          this.addStudent.controls['faculty'].setValue(data[0].faculty);
          this.addStudent.controls['sex'].setValue(data[0].sex);
          this.addStudent.controls['code'].setValue(data[0].code);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  addEditStudent() {
    if (this.insertStudent == undefined && this.dtoStudent == undefined) {
      console.log("id"+this.id)
      console.log("id2"+this.id_a)
      let studentData = {
        dni: this.addStudent.get('dni')?.value,
        name: this.addStudent.get('name')?.value,
        condition: true,
        lastName: this.addStudent.get('lastName')?.value,
        school: this.addStudent.get('school')?.value,
        faculty: this.addStudent.get('faculty')?.value,
        disability: false,
        phone: this.addStudent.get('phone')?.value,
        address: this.addStudent.get('address')?.value,
        sex: this.addStudent.get('sex')?.value,
        code: this.addStudent.get('code')?.value
      };

      this._studentService.saveStudent(studentData).subscribe(
        (data) => {
          this.toastr.success(
            'El estudiante fue registrado con exito',
            'Registro completo!'
          );
          this.router.navigate(['administrator/'+this.id_a+'/getall']);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
    if (this.id !== null)  {
      let formData = new FormData();
      formData.append('dtoStudent.idStudent', this.id);
      formData.append('dtoStudent.dni', this.addStudent.get('dni')?.value);
      formData.append('dtoStudent.name', this.addStudent.get('name')?.value);
      formData.append('dtoStudent.condition', this.addStudent.get('condition')?.value);
      formData.append('dtoStudent.lastName',this.addStudent.get('lastName')?.value);
      formData.append('dtoStudent.school',this.addStudent.get('school')?.value);
      formData.append('dtoStudent.faculty',this.addStudent.get('faculty')?.value);
      formData.append('dtoStudent.disability',this.addStudent.get('disability')?.value);
      formData.append('dtoStudent.address',this.addStudent.get('address')?.value);
      formData.append('dtoStudent.sex', this.addStudent.get('sex')?.value);
      formData.append('dtoStudent.password', this.addStudent.get('dni')?.value);
      formData.append('dtoStudent.mail', this.addStudent.get('code')?.value+"@unamba.edu.pe");
      formData.append('dtoStudent.code', this.addStudent.get('code')?.value);
      formData.append('dtoStudent.phone', this.addStudent.get('phone')?.value);

      this._studentService.updateStudent(formData).subscribe(
        (data) => {
          this.toastr.info(
            'El estudiante fue actualizado con exito',
            'Estudiante actualizado!'
          );
          this.router.navigate(['administrator/'+this.id_a+'/getall']);
        },
        (error) => {
          this.toastr.error('Opss ocurrio un error', 'Error');
          console.log(error);
        }
      );
    }
  }

  //------------------------------------------------------DONWLOAD PDF
  descargarPDF() {
    this.denegadosButton.nativeElement.click();
  }
}
