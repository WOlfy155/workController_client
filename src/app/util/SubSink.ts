import {Subscription} from "rxjs";

export class SubSink {

  protected _subs: Subscription[] = [];

  constructor() {}

  add(...subscriptions: Subscription[]) {
    this._subs = this._subs.concat(subscriptions);
  }

  set sink(subscription: Subscription) {
    this._subs.push(subscription);
  }

  unsubscribe() {
    this._subs.forEach(sub => sub.unsubscribe());
    this._subs = [];
  }
}
