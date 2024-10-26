import { Component } from '@angular/core';
import { PhoneNumber } from './phone-number.model';
import { WindowsService } from '../../common/windows.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-phone-number',
  standalone: true,
  imports: [],
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.css'
})
export class PhoneNumberComponent {

  // windowRef: any;

  // phoneNumber = new PhoneNumber();

  // verificationCode: string | undefined;

  // user: any;

  // constructor(private win: WindowsService) { }

  // ngOnInit() {
  //   this.windowRef = this.win.windowRef
  //   this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

  //   this.windowRef.recaptchaVerifier.render()
  // }


  // sendLoginCode() {

  //   const appVerifier = this.windowRef.recaptchaVerifier;

  //   const num = this.phoneNumber.e164;

  //   firebase.auth().signInWithPhoneNumber(num, appVerifier)
  //           .then(result => {

  //               this.windowRef.confirmationResult = result;

  //           })
  //           .catch( error => console.log(error) );

  // }

  // verifyLoginCode() {
  //   this.windowRef.confirmationResult
  //                 .confirm(this.verificationCode)
  //                 .then( (result: { user: any; }) => {

  //                   this.user = result.user;

  //   })
  //   .catch( (error: any) => console.log(error, "Incorrect code entered?"));
  // }
  
}
