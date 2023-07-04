import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ProjectService } from 'src/app/services/project.service';
import { CalendarEventType } from 'src/app/model/enum';
import { MessageService } from 'primeng/api';
import { AddProjectCalendarEventDto } from 'src/app/model/project.class';
import { INITIAL_EVENTS } from './event-util';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-project-calendar',
  templateUrl: './project-calendar.component.html',
  styleUrls: ['./project-calendar.component.css']
})
export class ProjectCalendarComponent implements OnInit {

  @Input() projectId: string = "";
  currentUserId: string = "";

  eventTypes: any[] = [
    {
      name: "Khoảng thời gian",
      code: CalendarEventType.TimePeriod
    },
    {
      name: "Mốc thời gian",
      code: CalendarEventType.Timeline
    }
  ];

  events: EventInput[] = [];
  myEvents: any[] = [];

  type: CalendarEventType = CalendarEventType.TimePeriod;
  title: string = ""
  start?: Date;
  end?: Date;
  allDay: boolean = false;
  autoDeleteWhenEnd?: boolean = false;

  selectEvent: any = {
    type: CalendarEventType.TimePeriod,
    title: "",
    start: null,
    end: null,
    allDay: false,
    autoDeleteWhenEnd: false
  }

  ngOnInit() {
    this.getListEvent();
    let userInfo = this.getDecodedAccessToken();
    this.currentUserId = userInfo["nameid"];
  }


  calendarOptions: CalendarOptions = {
    events: this.events,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  isShowAddEvent: boolean = false;
  isShowSelectEvent: boolean = false;

  constructor(
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    private projectService: ProjectService
  ) {
  }

  getListEvent() {
    debugger
    this.projectService.getProjectCalendarEvents(this.projectId).then((res: any) => {
      this.myEvents = res.data;
      this.events = res.data.map((e: any) => {
        return {
          id: e.id,
          title: e.title,
          start: e.start,
          end: e.end,
          allDay: e.allDay
        }
      });
      this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Thất bại",
        detail: "Lấy danh sách event thất bại!",
      });
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    this.start = selectInfo.start;
    this.end = selectInfo.end;
    this.allDay = selectInfo.allDay;
    this.title = "";
    this.autoDeleteWhenEnd = false;
    this.type = CalendarEventType.TimePeriod;
    this.isShowAddEvent = true;
  }

  handleEventClick(clickInfo: EventClickArg) {
    let myEvent = this.myEvents.find(x => x.id == clickInfo.event.id);
    this.selectEvent = {
      id: myEvent.id,
      type: myEvent.type,
      title: myEvent.title,
      start: new Date(myEvent.start),
      end: new Date(myEvent.end),
      allDay: myEvent.allDay,
      autoDeleteWhenEnd: myEvent.autoDeleteWhenEnd,
      createdBy: myEvent.createdBy
    };
    this.isShowSelectEvent = true;
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  addEvent() {
    if (this.title) {
      let input = new AddProjectCalendarEventDto();
      input.projectId = this.projectId;
      input.allDay = this.allDay;
      input.autoDeleteWhenEnd = this.autoDeleteWhenEnd;
      input.start = this.start;
      input.end = this.end;
      input.type = this.type;
      input.title = this.title;
      this.projectService.addCalendarEvent(input).then((res: any) => {
        this.getListEvent();
        this.messageService.add({
          key: "toast",
          severity: "success",
          summary: "Thành công",
          detail: "Thêm event thành công!",
        });
        this.isShowAddEvent = false;
      }).catch((err: any) => {
        this.messageService.add({
          key: "toast",
          severity: "error",
          summary: "Thất bại",
          detail: "Thêm event thất bại vui lòng thử lại!",
        });
      });
    } else {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Cảnh báo",
        detail: "Bạn chưa nhập tiêu đề event!",
      });
    }
  }

  deleteEvent(){
    this.projectService.deleteCalendarEvent(this.selectEvent.id).then((res: any) => {
      this.getListEvent();
      this.messageService.add({
        key: "toast",
        severity: "success",
        summary: "Thành công",
        detail: "Xóa event thành công!",
      });
      this.isShowSelectEvent = false;
    }).catch((err: any) => {
      this.messageService.add({
        key: "toast",
        severity: "error",
        summary: "Thất bại",
        detail: "Xóa event thất bại vui lòng thử lại!",
      });
    });
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }
}
