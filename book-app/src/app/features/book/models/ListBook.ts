export class ListBook {
  id?: number
  url?: string
  tableContents?: string
  dedication?: string
  preface?: string
  title?: string
  chapters?: Chapter[]
  author?: string
}

export class Title {
  id?: number
  title?: string
}

export class Chapter {
  titleModel?: TitleModel
  id?: number
  title?: string
  body?: string
}

export class TitleModel {
  id?: number
  title?: string
}