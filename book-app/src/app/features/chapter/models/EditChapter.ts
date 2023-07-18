export class EditChapter {
  id?: number
  url?: string
  tableContents?: string
  dedication?: string
  preface?: string
  title?: Title
  chapters?: Chapter[]
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