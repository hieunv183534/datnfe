import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
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
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from "primeng/card";
import { HttpClientModule } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
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
import { PopupConnectComponent } from './components/common/popup-connect/popup-connect.component';
import { RegisterStartuperInfoComponent } from './components/startuper/register-startuper-info/register-startuper-info.component';
import { AddNewProjectComponent } from './components/startuper/add-new-project/add-new-project.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProjectItemComponent } from './components/common/project-item/project-item.component';
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

@NgModule({
  declarations: [
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
    StartuperForInvestorComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    StartuperItemComponent,
    PopupConnectComponent,
    RegisterStartuperInfoComponent,
    AddNewProjectComponent,
    ProjectItemComponent,
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
    UpdateConversationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
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
    CascadeSelectModule,
    EditorModule,
    FullCalendarModule,
    RadioButtonModule,
    DragDropModule
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
