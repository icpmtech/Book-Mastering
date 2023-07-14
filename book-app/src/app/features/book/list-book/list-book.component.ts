import { Component} from '@angular/core';
import {
  TuiTablePaginationOptions,
  tuiTablePaginationOptionsProvider,
} from '@taiga-ui/addon-table';
const customOptionContent: TuiTablePaginationOptions['sizeOptionContent'] = ({
  $implicit,
  total,
}) => {
  switch ($implicit) {
      case 10:
          return 'Ten';
      case total:
          return 'Show all rows';
      default:
          return $implicit;
  }
};
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({sizeOptionContent: customOptionContent}),
],
})
export class ListBookComponent {
  items = [
    {
        caption: 'Books',
        routerLink: '/book/list-books',
    },
    
    
];
search = '';
total = 4;
    sizeOptions = [10, 50, 100, this.total];

    readonly rows = [
        ['King Arthur', '-', 'Arrested'],
        ['Sir Bedevere', 'The Wise', 'Arrested'],
        ['Sir Lancelot', 'The Brave', 'Arrested'],
        ['Sir Galahad', 'The Chaste', 'Killed'],
        ['Sir Robin', 'The Not-Quite-So-Brave-As-Sir-Lancelot', 'Killed'],
    ];
}
