import { Observable } from "rxjs";

/** Print fucntion with type specification */
function print(val: String, type: any) {
  let el = document.createElement(type);
  el.innerText = val;
  document.body.appendChild(el);
}

/** Add Function to add "li" element to the unordered list */
function addItem(val: any) {
  let node = document.createElement("li");
  let textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}

/** Basic Introduction of an Observable */
const subObservable = Observable.create((observer: any) => {
  try {
    observer.next("1st Message");
    observer.next("2nd Message");
    setInterval(() => {
      observer.next("Repeat");
    }, 1666);
    //observer.complete();
    observer.next("3rd Message");
  } catch (err) {
    observer.error(err);
  }
});

let observer = subObservable.subscribe(
  (val: any) => addItem(val),
  (error: any) => addItem(error),
  () => addItem("Completed")
);

setTimeout(() => {
  observer.unsubscribe();
}, 5000);

/** Connectable vs Hot vs Cold */
print("Connectable vs Hot vs Cold Observables", "h2");

/** Cold Header */
print("Cold: ", "h3");

/** Example for a cold observable */
const coldExample = Observable.create((observer: any) => {
  observer.next(Math.random());
});

print(
  "A cold observable waits until a reactor subcribes to it before it begins to emit data. Therefore, it is guaranteed to see the whole sequence from the beginning. Function initialised once the subscription starts",
  "h5"
);
coldExample.subscribe((val: String) => {
  print(`Cold Value 1: ${val}`, "p");
});
coldExample.subscribe((val: String) => {
  print(`Cold Value 2: ${val}`, "p");
});

/** Connectable Header */
print("Connectable", "h3");

/** Example for a connectable observable, by making a cold observable connectable */
print(
  "A connectable observable may begin emitting items on creation and so any watcher who later subscribes to that Observable may start observing the sequance somewhere in the middle, publish is first called(). Only emits data once the corresponding connect() is called.",
  "h5"
);
const connectExample = coldExample.publish();

connectExample.subscribe((val: String) => {
  print(`Connectable Value 1: ${val}`, "p");
});
connectExample.subscribe((val: String) => {
  print(`Connectable Value 2: ${val}`, "p");
});

connectExample.connect();
