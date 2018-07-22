import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from './../chat.service' ;
import { Observable } from 'rxjs';

import { scan } from 'rxjs/operators';
// import 'rxjs/add/operator/scan';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) { }

  ngOnInit() {

    // this.chat.talk();

    // appends to array after each new message is added to feedsource
    this.messages = this.chat.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val) ));
    }

    sendMessage() {
      this.chat.converse(this.formValue);
      this.formValue = '';
    }

}
