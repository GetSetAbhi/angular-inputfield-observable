import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  fromEvent<T extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    eventName: T
  ) {
    return new Observable<HTMLElementEventMap[T]>((observer) => {
      const handler = (e: HTMLElementEventMap[T]) => observer.next(e);

      // Add the event handler to the target
      target.addEventListener(eventName, handler);

      return () => {
        // Detach the event handler from the target
        target.removeEventListener(eventName, handler);
      };
    });
  }

  ngOnInit(): void {
    const nameInput = document.getElementById('name') as HTMLInputElement;

    const subscription = this.fromEvent(nameInput, 'keydown').subscribe(
      (e: KeyboardEvent) => {
        console.log(e);
        nameInput.value = 'asdasd';
      }
    );
  }
}
