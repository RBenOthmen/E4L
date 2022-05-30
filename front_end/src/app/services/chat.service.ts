import { Injectable, OnInit } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { handleError } from './../exceptions/handleError';

// const CHAT_URL = 'ws://'+
//     'localhost:8000' +
//     '/ws/chat/'+
//     'roomName'+
//     '/';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
}

export interface Message {
    id ?:number,
    message: string;
    sender?: number,
    receiver?: number,
    sent_date ? : Date
}

@Injectable({
    providedIn: 'root'
})


export class ChatService {

    private CHAT_URL = 'ws://' +
        'localhost:8000' +
        '/ws/chat/' +
        'roomName' +
        '/';
    private ws !: WebSocket;

    private api_url = 'http://localhost:8000/chat/'
    private subject!: AnonymousSubject<MessageEvent>;
    public messages!: Subject<Message>;

    constructor(private http: HttpClient) {
        this.messages = <Subject<Message>>this.connect(this.CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data);
                    let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }

    initMessages() {
        console.log('here' + this.CHAT_URL)

        this.messages = <Subject<Message>>this.connect(this.CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data);
                    let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }

    setChatUrl(roomName: string) {
        this.CHAT_URL = 'ws://' +
            'localhost:8000' +
            '/ws/chat/' +
            roomName +
            '/';
    }

    public connect(url: string): AnonymousSubject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }


    private create(url: string): AnonymousSubject<MessageEvent> {
        this.ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            this.ws.onmessage = obs.next.bind(obs);
            this.ws.onerror = obs.error.bind(obs);
            this.ws.onclose = obs.complete.bind(obs);
            return this.ws.close.bind(this.ws);
        });
        let observer: Observer<MessageEvent<any>> = {
            error: err => console.log(),
            complete: () => console.log(),
            next: (data: Object) => {
                console.log('Message sent to websocket: ', data);
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify(data));
                }
            }
        };
        return new AnonymousSubject<MessageEvent>(observer, observable);
    }

    public storeMessageDB(message: Message): Observable<Message> {
        console.log('this message will be saved')
        console.log(message)
        return this.http.post<Message>(this.api_url + 'createchat/', {sender_id : message.sender, receiver_id: message.receiver, message : message.message}, httpOptions)
            .pipe(
                catchError(handleError)
            );
    }

    public getAllMessages(senderid :number, receiverid:number): Observable<Message[]> {
        return this.http.post<Message[]>(this.api_url + 'getallmessages/' ,{sender_id : senderid, receiver_id: receiverid} , httpOptions)
            .pipe(
                catchError(handleError)
            );
    }
}

