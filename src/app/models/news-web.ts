export class NewsWeb {

  id: number;
  title: string;
  content: string;
  created_at: Date;

  constructor(id: number, title: string, content: string, created_at: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = created_at;
  }

}
