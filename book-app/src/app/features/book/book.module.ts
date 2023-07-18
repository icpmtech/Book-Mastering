import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ListBookComponent } from './list-book/list-book.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';

import {
  TuiActiveZoneModule,
  TuiAlertHostModule,
  TuiAutoFocusModule,
  TuiAutofilledModule,
  TuiCheckedModule,
  TuiControlModule,
  TuiCopyProcessorModule,
  TuiDialogHostModule,
  TuiDragModule,
  TuiDropdownHostModule,
  TuiDroppableModule,
  TuiElementModule,
  TuiFilterPipeModule,
  TuiFocusTrapModule,
  TuiFocusVisibleModule,
  TuiFocusableModule,
  TuiFocusedModule,
  TuiForAsyncModule,
  TuiForModule,
  TuiHighDpiModule,
  TuiHoveredModule,
  TuiIsPresentPipeModule,
  TuiItemModule,
  TuiKeysPipeModule,
  TuiLetModule,
  TuiMapperPipeModule,
  TuiMediaModule,
  TuiObscuredModule,
  TuiOverscrollModule,
  TuiPanModule,
  TuiPortalModule,
  TuiPressedModule,
  TuiPreventDefaultModule,
  TuiRepeatTimesModule,
  TuiReplacePipeModule,
  TuiResizeModule,
  TuiResizerModule,
  TuiSwipeModule,
  TuiValidatorModule,
  TuiValueChangesModule,
  TuiZoomModule
} from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiCalendarModule,
  TuiCalendarSheetPipeModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiFlagPipeModule,
  TuiFormatDatePipeModule,
  TuiFormatNumberPipeModule,
  TuiFormatPhonePipeModule,
  TuiGroupModule,
  TuiHintModule,
  TuiHintsHostModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiMaskAccessorModule,
  TuiModeModule,
  TuiMonthPipeModule,
  TuiNotificationModule,
  TuiPrimitiveCalendarModule,
  TuiPrimitiveCheckboxModule,
  TuiPrimitiveSpinButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiPrimitiveYearMonthPaginationModule,
  TuiPrimitiveYearPickerModule,
  TuiRootModule,
  TuiScrollControlsModule,
  TuiScrollIntoViewModule,
  TuiScrollbarModule,
  TuiSvgDefsHostModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiThemeNightModule,
  TuiTooltipModule,
  TuiWrapperModule
} from '@taiga-ui/core';
import {
  TextMaskModule,
  TuiAccordionModule,
  TuiActionModule,
  TuiArrowModule,
  TuiAvatarModule,
  TuiBadgeModule,
  TuiBadgedContentModule,
  TuiBreadcrumbsModule,
  TuiCalendarMonthModule,
  TuiCalendarRangeModule,
  TuiCarouselModule,
  TuiCheckboxBlockModule,
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListDropdownManagerModule,
  TuiDataListWrapperModule,
  TuiElasticContainerModule,
  TuiExtractCountryCodeModule,
  TuiFieldErrorPipeModule,
  TuiFilesModule,
  TuiFilterByInputPipeModule,
  TuiFilterModule,
  TuiHighlightModule,
  TuiInputCopyModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputInlineModule,
  TuiInputModule,
  TuiInputMonthModule,
  TuiInputMonthRangeModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiInputRangeModule,
  TuiInputSliderModule,
  TuiInputTagModule,
  TuiInputTimeModule,
  TuiInputYearModule,
  TuiIslandModule,
  TuiIsoToCountryCodeModule,
  TuiItemsWithMoreModule,
  TuiLazyLoadingModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
  TuiMultiSelectOptionModule,
  TuiPaginationModule,
  TuiPdfViewerModule,
  TuiPresentModule,
  TuiPrimitiveCalendarRangeModule,
  TuiProgressModule,
  TuiProjectClassModule,
  TuiPromptModule,
  TuiPushModule,
  TuiRadioBlockModule,
  TuiRadioGroupModule,
  TuiRadioLabeledModule,
  TuiRadioListModule,
  TuiRadioModule,
  TuiRangeModule,
  TuiRatingModule,
  TuiRoutableDialogModule,
  TuiSelectModule,
  TuiSelectOptionModule,
  TuiSliderModule,
  TuiSortCountriesPipeModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule,
  TuiStringifyPipeModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule,
  TuiTilesModule,
  TuiToYearPipeModule,
  TuiToggleModule,
  TuiTreeModule,
  TuiUnfinishedValidatorModule,
  TuiValueAccessorModule
} from '@taiga-ui/kit';
import {
  TuiArcChartModule,
  TuiAxesModule,
  TuiBarChartModule,
  TuiBarModule,
  TuiBarSetModule,
  TuiLegendItemModule,
  TuiLineChartModule,
  TuiLineDaysChartModule,
  TuiPieChartModule,
  TuiRingChartModule
} from '@taiga-ui/addon-charts';
import {
  TuiCardModule,
  TuiCurrencyPipeModule,
  TuiFormatCardModule,
  TuiInputCVCModule,
  TuiInputCardGroupedModule,
  TuiInputCardModule,
  TuiInputExpireModule,
  TuiMoneyModule
} from '@taiga-ui/addon-commerce';
import {
  TuiAppBarModule,
  TuiElasticStickyModule,
  TuiMobileCalendarDialogModule,
  TuiMobileCalendarModule,
  TuiMobileDialogModule,
  TuiMobileTabsModule,
  TuiPullToRefreshModule,
  TuiRippleModule,
  TuiSheetModule,
  TuiSidebarModule,
  TuiTabBarModule,
  TuiThemeAndroidModule,
  TuiThemeIosModule,
  TuiTouchableModule
} from '@taiga-ui/addon-mobile';
import {
  TuiPreviewActionModule,
  TuiPreviewDialogModule,
  TuiPreviewModule
} from '@taiga-ui/addon-preview';
import {
  TuiReorderModule,
  TuiTableFiltersModule,
  TuiTableModule,
  TuiTablePaginationModule
} from '@taiga-ui/addon-table';
import {
  TuiTableBarsHostModule
} from '@taiga-ui/addon-tablebars';
import { RouterModule, Routes } from '@angular/router';
import { BookService } from './book.service';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { ModalAddChapterToBookComponent } from './modal/modal-add-chapter-book.component';
const routes: Routes = [
{ path: 'list-books', component: ListBookComponent },
{ path: 'create-books', component: CreateBookComponent },
{ path: 'edit-books/:id', component: EditBookComponent },
{ path: 'detail-books/:id', component: DetailBookComponent },
{ path: 'delete-books/:id', component: DeleteBookComponent },
{ path: 'add-chapter-book/:id', component: ModalAddChapterToBookComponent },
];
export const ALL_TAIGA_UI_MODULES = [

  /* CDK */
  TuiActiveZoneModule,
  TuiAlertHostModule,
  TuiAutoFocusModule,
  TuiAutofilledModule,
  TuiCheckedModule,
  TuiControlModule,
  TuiCopyProcessorModule,
  TuiDialogHostModule,
  TuiDragModule,
  TuiDropdownHostModule,
  TuiDroppableModule,
  TuiElementModule,
  TuiFilterPipeModule,
  TuiFocusTrapModule,
  TuiFocusVisibleModule,
  TuiFocusableModule,
  TuiFocusedModule,
  TuiForAsyncModule,
  TuiForModule,
  TuiHighDpiModule,
  TuiHoveredModule,
  TuiIsPresentPipeModule,
  TuiItemModule,
  TuiKeysPipeModule,
  TuiLetModule,
  TuiMapperPipeModule,
  TuiMediaModule,
  TuiObscuredModule,
  TuiOverscrollModule,
  TuiPanModule,
  TuiPortalModule,
  TuiPressedModule,
  TuiPreventDefaultModule,
  TuiRepeatTimesModule,
  TuiReplacePipeModule,
  TuiResizeModule,
  TuiResizerModule,
  TuiSwipeModule,
  TuiValidatorModule,
  TuiValueChangesModule,
  TuiZoomModule,
  /* CORE */
  TuiAlertModule,
  TuiButtonModule,
  TuiCalendarModule,
  TuiCalendarSheetPipeModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiFlagPipeModule,
  TuiFormatDatePipeModule,
  TuiFormatNumberPipeModule,
  TuiFormatPhonePipeModule,
  TuiGroupModule,
  TuiHintModule,
  TuiHintsHostModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiMaskAccessorModule,
  TuiModeModule,
  TuiMonthPipeModule,
  TuiNotificationModule,
  TuiPrimitiveCalendarModule,
  TuiPrimitiveCheckboxModule,
  TuiPrimitiveSpinButtonModule,
  TuiPrimitiveTextfieldModule,
  TuiPrimitiveYearMonthPaginationModule,
  TuiPrimitiveYearPickerModule,
  TuiRootModule,
  TuiScrollControlsModule,
  TuiScrollIntoViewModule,
  TuiScrollbarModule,
  TuiSvgDefsHostModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiThemeNightModule,
  TuiTooltipModule,
  TuiWrapperModule,
  /* KIT */
  TextMaskModule,
  TuiAccordionModule,
  TuiActionModule,
  TuiArrowModule,
  TuiAvatarModule,
  TuiBadgeModule,
  TuiBadgedContentModule,
  TuiBreadcrumbsModule,
  TuiCalendarMonthModule,
  TuiCalendarRangeModule,
  TuiCarouselModule,
  TuiCheckboxBlockModule,
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListDropdownManagerModule,
  TuiDataListWrapperModule,
  TuiElasticContainerModule,
  TuiExtractCountryCodeModule,
  TuiFieldErrorPipeModule,
  TuiFilesModule,
  TuiFilterByInputPipeModule,
  TuiFilterModule,
  TuiHighlightModule,
  TuiInputCopyModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputInlineModule,
  TuiInputModule,
  TuiInputMonthModule,
  TuiInputMonthRangeModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiInputRangeModule,
  TuiInputSliderModule,
  TuiInputTagModule,
  TuiInputTimeModule,
  TuiInputYearModule,
  TuiIslandModule,
  TuiIsoToCountryCodeModule,
  TuiItemsWithMoreModule,
  TuiLazyLoadingModule,
  TuiLineClampModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
  TuiMultiSelectOptionModule,
  TuiPaginationModule,
  TuiPdfViewerModule,
  TuiPresentModule,
  TuiPrimitiveCalendarRangeModule,
  TuiProgressModule,
  TuiProjectClassModule,
  TuiPromptModule,
  TuiPushModule,
  TuiRadioBlockModule,
  TuiRadioGroupModule,
  TuiRadioLabeledModule,
  TuiRadioListModule,
  TuiRadioModule,
  TuiRangeModule,
  TuiRatingModule,
  TuiRoutableDialogModule,
  TuiSelectModule,
  TuiSelectOptionModule,
  TuiSliderModule,
  TuiSortCountriesPipeModule,
  TuiStepperModule,
  TuiStringifyContentPipeModule,
  TuiStringifyPipeModule,
  TuiTabsModule,
  TuiTagModule,
  TuiTextAreaModule,
  TuiTilesModule,
  TuiToYearPipeModule,
  TuiToggleModule,
  TuiTreeModule,
  TuiUnfinishedValidatorModule,
  TuiValueAccessorModule,
  /* ADDON-CHARTS */
  TuiArcChartModule,
  TuiAxesModule,
  TuiBarChartModule,
  TuiBarModule,
  TuiBarSetModule,
  TuiLegendItemModule,
  TuiLineChartModule,
  TuiLineDaysChartModule,
  TuiPieChartModule,
  TuiRingChartModule,
  /* ADDON-COMMERCE */
  TuiCardModule,
  TuiCurrencyPipeModule,
  TuiFormatCardModule,
  TuiInputCVCModule,
  TuiInputCardGroupedModule,
  TuiInputCardModule,
  TuiInputExpireModule,
  TuiMoneyModule,
  /* ADDON-MOBILE */
  TuiAppBarModule,
  TuiElasticStickyModule,
  TuiMobileCalendarDialogModule,
  TuiMobileCalendarModule,
  TuiMobileDialogModule,
  TuiMobileTabsModule,
  TuiPullToRefreshModule,
  TuiRippleModule,
  TuiSheetModule,
  TuiSidebarModule,
  TuiTabBarModule,
  TuiThemeAndroidModule,
  TuiThemeIosModule,
  TuiTouchableModule,
  /* ADDON-PREVIEW */
  TuiPreviewActionModule,
  TuiPreviewDialogModule,
  TuiPreviewModule,
  /* ADDON-TABLE */
  TuiReorderModule,
  TuiTableFiltersModule,
  TuiTableModule,
  TuiTablePaginationModule,
  /* ADDON-TABLEBARS */
  TuiTableBarsHostModule,
  /* EXAMPLE MODULES */
  
];
@NgModule({
  declarations: [ListBookComponent, CreateBookComponent, EditBookComponent, DeleteBookComponent,DetailBookComponent,ModalAddChapterToBookComponent ],
  providers: [BookService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ALL_TAIGA_UI_MODULES,
    RouterModule.forChild(routes),
  ]
})
export class BookModule { }
