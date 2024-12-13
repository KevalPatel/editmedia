import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { ConfirmationResult, RecaptchaVerifier } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";
import { WindowsService } from '../../common/windows.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'phone-verification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './phone-verification.component.html',
  styleUrl: './phone-verification.component.css'
})
export class PhoneVerificationComponent implements OnInit {

  windowRef: any;
  phoneNumber: string = '';
  verificationCode: string = '';
  confirmationResult: ConfirmationResult | null = null;

  constructor(private afAuth: AngularFireAuth, private win: WindowsService) {
  }

  ngOnInit() {
    // timeout is important, because getAuth require firebase initialization completed.
    setTimeout(() => {
      const auth = getAuth();
      this.windowRef = this.win.windowRef;
      this.windowRef.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha solved', response);
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
        }
      });
      this.windowRef.recaptchaVerifier.render();
    }, 1000);
   
  }

  sendVerificationCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    this.afAuth
      .signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then((confirmationResult: any) => {
        this.confirmationResult = confirmationResult;
        console.log('Code sent successfully!');
      })
      .catch(error => {
        console.error('Error sending code:', error);
      });
  }

  verifyCode() {
    if (this.confirmationResult) {
      this.confirmationResult
        .confirm(this.verificationCode)
        .then(result => {
          console.log('Phone number verified!', result.user);
        })
        .catch(error => {
          console.error('Error verifying code:', error);
        });
    }
  }
  
  
}

export class PhoneNumber {
  country: string = '';
  area: string = '';
  prefix: string = '';
  line: string = '';

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}