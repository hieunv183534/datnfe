import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {ImageModule} from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from "primeng/card";
import { HttpClientModule } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { ScrollTopModule } from 'primeng/scrolltop';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ReasonComponent } from './components/common/reason/reason.component';
import { SponsorComponent } from './components/common/sponsor/sponsor.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeHeaderComponent } from './components/common/home-header/home-header.component';
import { StartuperSpaceComponent } from './components/startuper/startuper-space.component';
import { InvestorSpaceComponent } from './components/investor/investor-space.component';
import { ProjectForInvestorComponent } from './components/investor/project-for-investor/project-for-investor.component';
import { ProjectForStartuperComponent } from './components/startuper/project-for-startuper/project-for-startuper.component';
import { StartuperForStartuperComponent } from './components/startuper/startuper-for-startuper/startuper-for-startuper.component';
import { InvestorForStartuperComponent } from './components/startuper/investor-for-startuper/investor-for-startuper.component';
import { HistorySearchComponent } from './components/startuper/history-search/history-search.component';
import { StartuperForInvestorComponent } from './components/investor/startuper-for-investor/startuper-for-investor.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BaseService } from './services/base.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { InvestorService } from './services/investor.service';
import { ProjectService } from './services/project.service';
import { StartuperService } from './services/startuper.service';
import { StartuperItemComponent } from './components/common/startuper-item/startuper-item.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { HistorySearchItemComponent } from './components/common/history-search-item/history-search-item.component';
import { PopupConnectComponent } from './components/common/popup-connect/popup-connect.component';
import { RegisterStartuperInfoComponent } from './components/startuper/register-startuper-info/register-startuper-info.component';
import { AddNewProjectComponent } from './components/startuper/add-new-project/add-new-project.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProjectItemComponent } from './components/common/project-item/project-item.component';
import { ProjectDetailComponent } from './components/common/project-item/project-detail/project-detail.component';
import { ProjectSpaceComponent } from './components/startuper/project-space/project-space.component';
import { ListProjectMemberComponent } from './components/startuper/project-space/list-project-member/list-project-member.component';
import { ListProjectMemberInviteComponent } from './components/startuper/project-space/list-project-member-invite/list-project-member-invite.component';
import { ListProjectInviteMemberComponent } from './components/startuper/project-space/list-project-invite-member/list-project-invite-member.component';
import { ListProjectFileComponent } from './components/startuper/project-space/list-project-file/list-project-file.component';
import { TooltipModule } from 'primeng/tooltip';
import { UpdateUserInfoComponent } from './components/common/header/update-user-info/update-user-info.component';
import { UpdateProjectComponent } from './components/startuper/project-space/update-project/update-project.component';
import { EventService } from './services/event.service';
import { UserDetailComponent } from './components/common/user-detail/user-detail.component';
import { AddPostComponent } from './components/startuper/project-space/project-event/add-post/add-post.component';
import { ProjectEventComponent } from './components/startuper/project-space/project-event/project-event.component';
import { ProjectWorkComponent } from './components/startuper/project-space/project-work/project-work.component';
import { PostComponent } from './components/startuper/project-space/project-event/post/post.component';
import { FileItemComponent } from './components/common/file-item/file-item.component';
import { ProjectCalendarComponent } from './components/startuper/project-space/project-calendar/project-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { AddConversationComponent } from './components/chat/add-conversation/add-conversation.component';
import { UpdateConversationComponent } from './components/chat/update-conversation/update-conversation.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ListAdminComponent } from './components/admin/admin-home/list-admin/list-admin.component';
import { ListProjectComponent } from './components/admin/admin-home/list-project/list-project.component';
import { ListStartuperComponent } from './components/admin/admin-home/list-startuper/list-startuper.component';
import { TopSimilarProjectComponent } from './components/startuper/project-space/top-similar-project/top-similar-project.component';
import { RequestInfoComponent } from './components/startuper/project-space/list-project-invite-member/request-info/request-info.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { VideoCallComponent } from './components/chat/video-call/video-call.component';
import { WorkHistorySummaryComponent } from './components/common/work-history-summary/work-history-summary.component';
import { ModalConnectComponent } from './components/common/startuper-item/modalConnect/modal-connect.component';
import { ModalDetailConnectComponent } from './components/common/startuper-item/modalDetailConnect/modal-detail-connect.component';
import { InformationBoxComponent } from './components/chat/information-box/information-box.component';
import {HomePageNewComponent} from './components/home-page-new/home-page-new.component';
import {CarouselModule} from 'primeng/carousel';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PanelMenuModule} from 'primeng/panelmenu';
@NgModule({
  declarations: [
    HomePageNewComponent,
    InformationBoxComponent,
    AppComponent,
    HomePageComponent,
    ReasonComponent,
    SponsorComponent,
    FooterComponent,
    HeaderComponent,
    HomeHeaderComponent,
    StartuperSpaceComponent,
    InvestorSpaceComponent,
    ProjectForInvestorComponent,
    ProjectForStartuperComponent,
    StartuperForStartuperComponent,
    InvestorForStartuperComponent,
    HistorySearchComponent,
    StartuperForInvestorComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    StartuperItemComponent,
    ProfileComponent,
    PopupConnectComponent,
    RegisterStartuperInfoComponent,
    AddNewProjectComponent,
    ProjectItemComponent,
    ProjectDetailComponent,
    ProjectSpaceComponent,
    ListProjectMemberComponent,
    ListProjectMemberInviteComponent,
    ListProjectInviteMemberComponent,
    ListProjectFileComponent,
    UpdateUserInfoComponent,
    UpdateProjectComponent,
    UserDetailComponent,
    AddPostComponent,
    ProjectEventComponent,
    ProjectWorkComponent,
    PostComponent,
    FileItemComponent,
    ProjectCalendarComponent,
    ChatComponent,
    MessageComponent,
    AddConversationComponent,
    UpdateConversationComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminHomeComponent,
    ListStartuperComponent,
    ListProjectComponent,
    ListAdminComponent,
    TopSimilarProjectComponent,
    RequestInfoComponent,
    VideoCallComponent,
    WorkHistorySummaryComponent,
    ModalConnectComponent,
    ModalDetailConnectComponent,
    HistorySearchItemComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    ImageModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    TagModule,
    ToastModule,
    MenubarModule,
    SpeedDialModule,
    TreeTableModule,
    DialogModule,
    ChipsModule,
    ConfirmDialogModule,
    PaginatorModule,
    FieldsetModule,
    ToolbarModule,
    TableModule,
    SliderModule,
    TreeSelectModule,
    SelectButtonModule,
    AccordionModule,
    TabViewModule,
    CheckboxModule,
    PanelModule,
    SplitterModule,
    ChartModule,
    OverlayPanelModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
    GalleriaModule,
    BadgeModule,
    ScrollTopModule,
    CalendarModule,
    StepsModule,
    CardModule,
    AvatarModule,
    ImageCropperModule,
    MultiSelectModule,
    InputSwitchModule,
    TooltipModule,
    MenuModule,
    DataViewModule,
    CascadeSelectModule,
    EditorModule,
    FullCalendarModule,
    RadioButtonModule,
    DragDropModule,
    ToggleButtonModule,
    PickerModule,
    SidebarModule,
    ButtonModule,
    CarouselModule,
    VirtualScrollerModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    BaseService,
    AuthService,
    ChatService,
    InvestorService,
    ProjectService,
    StartuperService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
