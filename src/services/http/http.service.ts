// @ts-nocheck
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';

interface KeyValue {
  key: string;
  value: string;
}

class OptionsBuilder {
  private appendingHeaders: KeyValue[] = [];
  private appendingParams: KeyValue[] = [];

  public get headers(): HttpHeaders {
    const ret: { [name: string]: string | string[] } = {};
    this.appendingHeaders.forEach(h => {
      ret[h.key] = h.value;
    });
    return new HttpHeaders(ret);
  }

  public get params(): { [name: string]: string | string[]; } {
    const ret: { [name: string]: string | string[] } = {};
    this.appendingParams.forEach(h => {
      ret[h.key] = h.value;
    });
    return ret;
  }

  public get paramsAsString(): string {

    const data = new URLSearchParams();

    this.appendingParams.forEach(h => {

      if (h.value !== undefined && h.value !== null) {
        data.append(h.key, h.value);
      }

    });

    return data.toString();
  }

  public appendHeader(key: string, value: string | null): void {
    if (value !== undefined) {
      this.appendingHeaders.push({key, value});
    }
  }

  public appendParam(key: string, value: string | null): void {
    if (value !== undefined) {
      this.appendingParams.push({key, value});
    }
  }

  appendParamsFromKeyValue(keyValue: { [p: string]: any }) {
    keyValueAppender(keyValue, (key, value) => this.appendParam(key, value));
  }
}

const keyValueAppender = (keyValue: { [p: string]: any }, appendFunc: (key: string, value: string | null) => void) => {
  if (!keyValue) {
    return;
  }

  for (const key in keyValue) {
    const value = keyValue[key];

    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'string') {
      appendFunc(key, value as string);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      appendFunc(key, '' + value);
    } else if (value instanceof Date) {
      appendFunc(key, '' + (value as Date).getTime());
    } else if (typeof value === 'object') {
      appendFunc(key, JSON.stringify(value));
    } else {
      throw new Error('Unknown type of parameter `' + key + '` : typeof value = `'
        + (typeof value) + '` : value = `' + value + '`');
    }

  }

};

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    return localStorage.getItem('token') || null;
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  public url(urlSuffix: string): string {
    return this.prefix() + urlSuffix;
  }

  /**
   * Обязательно нужно присвоить в локальный httpService объект который вернул этот метод
   * @param controllerPrefix префикс контроллера на сервере
   */
  public setControllerPrefix(controllerPrefix: string): HttpService {
    const prefixHandler = {
      get(target: any, name, receiver) {
        if (name === 'url') {
          return (urlSuffix) => {
            return target.__proto__.prefix() + controllerPrefix + urlSuffix;
          };
        }
        return Reflect.get(target, name, receiver);
      }
    } as ProxyHandler<HttpService>;
    return new Proxy(this, prefixHandler);
  }

  public get<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<HttpResponse<T>> {

    const ob: OptionsBuilder = this.newOptionsBuilder();

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.get<T>(this.url(urlSuffix), {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
      withCredentials: true,
    });

  }

  public getText(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<HttpResponse<string>> {

    const ob: OptionsBuilder = this.newOptionsBuilder();

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.get(this.url(urlSuffix), {
      observe: 'response',
      responseType: 'text',
      headers: ob.headers,
      params: ob.params,
      withCredentials: true,
    });

  }

  public postValue<T>(urlSuffix: string, keyValue?: string): Observable<HttpResponse<T>> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/json');

    return this.http.post<T>(this.url(urlSuffix), keyValue, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  public post<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<HttpResponse<T>> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.post<T>(this.url(urlSuffix), ob.paramsAsString, {
      observe: 'response',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  public postText(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<HttpResponse<string>> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.post(this.url(urlSuffix), ob.paramsAsString, {
      observe: 'response',
      responseType: 'text',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  public postFile(urlSuffix: string, file: File, keyValue?: { [key: string]: any }): Observable<HttpEvent<string>> {

    const ob = this.newOptionsBuilder();
    const formData: FormData = new FormData();

    keyValueAppender(keyValue, (key, value) => formData.append(key, value));

    formData.append('file', file, file.name);

    return this.http.post(this.url(urlSuffix), formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'text',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  public async downloadResource(urlSuffix: string, keyValue?: { [key: string]: any }): Promise<HttpResponse<Blob>> {

    const ob: OptionsBuilder = this.newOptionsBuilder();
    ob.appendParamsFromKeyValue(keyValue);

    const response: HttpResponse<Blob> = await this.http.get(this.url(urlSuffix), {
      observe: 'response',
      responseType: 'blob',
      headers: ob.headers,
      params: ob.params,
      withCredentials: true,
    }).toPromise();

    // noinspection TypeScriptUnresolvedVariable
    const url = window.URL.createObjectURL(response.body);
    const filename: string = decodeURIComponent(response.headers.get('Content-Disposition')
      .split(';')[1]
      .split('=')[1]
      .replace(/["]/g, ''));

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);
    return response;
  }

  private prefix(): string {
    return environment.urlPrefix;
  }

  private newOptionsBuilder(): OptionsBuilder {
    const ob = new OptionsBuilder();
    if (this.token) {
      ob.appendHeader('Authorization', this.token);
    }
    return ob;
  }

}

export function extractErrorType(reason: HttpErrorResponse): string {
  if (typeof reason.error === 'string') {
    const error = JSON.parse(reason.error);
    return error.error_type;
  }
  return reason.error.error_type;
}
