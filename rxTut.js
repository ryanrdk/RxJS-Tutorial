function print(val, type) {
  let el = document.createElement(type);
  el.innerText = val;
  document.body.appendChild(el);
}

/** Basic Introduction of an Observable */
const observableBasic = Rx.Observable.create(observer => {
  observer.next("ReactiveX Observables\n");
});

observableBasic.subscribe(val => print(val, "h1"));

/** Hot vs Cold */
const hotColdHeader = Rx.Observable.create(observer => {
  observer.next("Hot vs Cold Observables");
});

hotColdHeader.subscribe(val => print(val, "h2"));

/** Cold Header */
const coldHeader = Rx.Observable.create(observer => {
  observer.next("Cold: ");
});

coldHeader.subscribe(val => print(val, "h3"));

/** Example for a cold observable */
const coldExample = Rx.Observable.create(observer => {
  observer.next(Math.random());
});

print("function initialised once the subscription starts", "p");
coldExample.subscribe(val => print(`Cold Value 1: ${val}`, "p"));
coldExample.subscribe(val => print(`Cold Value 2: ${val}`, "p"));

/** Hot Header */
const hotHeader = Rx.Observable.create(observer => {
  observer.next("Hot: ");
});

hotHeader.subscribe(val => print(val, "h3"));

/** Example for a hot observable, by making a cold observabnle hot */
print(
  "publish is first called(). Only emits data once the corresponding connect() is called.",
  "p"
);
const hotExample = coldExample.publish();

hotExample.subscribe(val => print(`Hot Value 1: ${val}`, "p"));
hotExample.subscribe(val => print(`Hot Value 2: ${val}`, "p"));

hotExample.connect();
