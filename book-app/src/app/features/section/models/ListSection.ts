export class ListSection {
  id?: number
  url?: string
  tableContents?: string
  dedication?: string
  preface?: string
  title?: Title
  chapters?: Section[]
}

export class Title {
  id?: number
  title?: string
}

export class Section {
  titleModel?: TitleModel
  id?: number
  title?: string
  body?: string
}

export class TitleModel {
  id?: number
  title?: string
}