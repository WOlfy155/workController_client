import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsController} from "../../../controller/NewsController";
import {SubSink} from "../../../util/SubSink";
import {NewsWeb} from "../../../models/news-web";
import {RssController} from "../../../controller/RssController";
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  news: NewsWeb[] = [];
  isPageLoaded = false;

  private subs = new SubSink();

  constructor(
    private newsController: NewsController,
    private rssController: RssController,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit() {
    this.subs.sink = this.newsController.loadAllNews().subscribe(
      news => {
        this.news = news;
        this.isPageLoaded = true;
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getRssFeedLink() {
    this.clipboardService.copy('http://www.localhost:4400/rss/feed');
    alert("Rss-рассылка скопирована");
  }
}
