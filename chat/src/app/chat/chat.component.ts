import { Component, OnInit } from '@angular/core';
import { SocketService } from './../services/socket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  messagecontent:string="";
  messages:string[] = [];
  ioConnection:any;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
    .subscribe((message: string) => {
      //add new message to the array
      this.messages.push(message);
    });
  }

  private chat() {
    if(this.messagecontent){
      //check if there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log("no message to send");
    }
  }
}
