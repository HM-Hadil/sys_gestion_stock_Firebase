import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../UserProfile';
import { UserService } from '../user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  id: any;
  errorMessage: string = '';
  formGroup!: FormGroup;
  errorMessage1: string = '';

  Cin!: string;
  nom!: string;
  prenom!: string;
  Phone!: string;
  userdetails: any = [];

  userforupdate: AngularFireList<any>;

  data = {
    Cin: '',
    nom: '',

    prenom: '',
    Phone: '',
  };
  id1: any;

  constructor(
    private router: Router,
    private firebase: AngularFireDatabase,
    private route: ActivatedRoute,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.route.params.subscribe((params) => {
      this.id = params;
    });
    this.userforupdate = this.firebase.list('users');

    this.id1 = this.route.snapshot.paramMap.get('id');
    console.log(this.id1);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      CIn: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+'),
        Validators.minLength(3),
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z ]+'),
        Validators.minLength(3),
      ]),
      pHone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(8),
        Validators.maxLength(13),
      ]),
    });
    this.userService.getUserById(this.id1).subscribe((results) => {
      this.getuser(results);
    });
  }

  getuser(entries: any[]) {
    this.userdetails = [];

    entries.forEach((element) => {
      let y = element.payload.toJSON();
      y['$key'] = element.key;
      this.userdetails.push(y as User);

      this.data.Cin = this.userdetails[0]['Cin'];
      this.data.nom = this.userdetails[0]['nom'];
      this.data.prenom = this.userdetails[0]['prenom'];
      this.data.Phone = this.userdetails[0]['phone'];
    });
    console.log('res');
    console.log(this.data.prenom);
    console.log(this.userdetails);
  }

  onSubmit1() {
    this.userforupdate
      .update(this.id1, {
        Cin: this.data.Cin,
        Firstname: this.data.nom,
        Lastname: this.data.prenom,
        Phone: this.data.Phone,
      })
      .then((_added) => {
        console.log('User updated successfully!');
        this.userService.getUserById(this.id1).subscribe((results) => {
          this.getuser(results);
          this.changeDetectorRef.detectChanges();
        });
        this.router.navigate(['/users']);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        this.errorMessage1 = error.message;
      });
  }
}
