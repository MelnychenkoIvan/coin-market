import { Component, OnInit }                                  from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

const data = [
  {
    id       : 1,
    name     : 'Whirlwind',
    addresses: [
      { street: '123 Main', city: 'Anywhere', state: 'CA', zip: '94801' },
      { street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226' }
    ]
  },
  {
    id       : 2,
    name     : 'Bombastic',
    addresses: [
      { street: '789 Elm', city: 'Smallville', state: 'OH', zip: '04501' }
    ]
  },
  {
    id       : 3,
    name     : 'Magneta',
    addresses: []
  }
];
export const states = ['CA', 'MD', 'OH', 'VA'];

export const emailMatcher = (control: AbstractControl) => {
  const email = control.get('email');
  const confirm = control.get('confirm');
  if (!email || !confirm) {
    return null;
  }
  return email.value === confirm.value ? null : { nomatch: true };
};

@Component({
  selector   : 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls  : ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {

  form: FormGroup;
  states: string[] = states;
  items = data;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm();
    console.log(this.form);
  }

  buildForm() {
    return this._fb.group({
      items: this._fb.array(this.initForm())
    });
  }

  addAddress(): void {
    const addresses = this.form.get('addresses') as FormArray;
    addresses.push(this.createAddress());
  }

  createAddress(): FormGroup {
    return this._fb.group({
      street: '',
      city  : '',
      state : '',
      zip   : ''
    });
  }

  private initForm() {
    return this.items.map(item => {
      return this._fb.group({
        id       : item.id,
        name     : item.name,
        addresses: this._fb.array(this.initAddresses(item.addresses))
      });
    });
  }

  private initAddresses(addresses = []) {
    return addresses.map(address => {
      return this._fb.group({
        street: address.street,
        city  : address.city,
        state : address.state,
        zip   : address.zip
      });
    });
  }
}
