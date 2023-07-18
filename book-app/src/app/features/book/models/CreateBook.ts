export class CreateBook {
  id?: number
  url?: string
  tableContents?: string
  dedication?: string
  preface?: string
  chapters?: Chapter[]
  author?: string
  title?: string
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