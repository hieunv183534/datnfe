import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgoraService } from 'src/app/services/agora.service';
import jwt_decode from 'jwt-decode';
import AgoraRTC from "agora-rtc-sdk-ng";

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, AfterViewInit {

  @Input() visible: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();

  options: any = {
    appId: '48f5a9f8d4e644a6a1ca96376fdcf441',
    channel: 'string',
    token: '00648f5a9f8d4e644a6a1ca96376fdcf441IADQXos5oYdXR0IlFZ8ibKuezAzhbWdLsokqhmOsnQ36A6myvp6TOkrwEADBz/d8Q7XYZAEAAQBEtdhk ',
    uid: "3a0ca927-1857-2c69-801f-67ae7a8c8d79",
  };

  channelParameters: any = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null
  };

  agoraEngine: any = null;

  @ViewChild('localPlayerContainer') localPlayerContainer!: ElementRef;
  @ViewChild('remotePlayerContainer') remotePlayerContainer!: ElementRef;

  constructor(
    private agoraService: AgoraService,
    @Inject(DOCUMENT) document: Document
  ) {
    this.agoraService.getRtcToken("string").then((res: any) => {
      this.options.token = res.data;
      let myInfo = this.getDecodedAccessToken();
      this.options.uid = myInfo.nameid;
    });
  }

  ngAfterViewInit(): void {
    debugger
    console.log(this.remotePlayerContainer);
  }

  ngOnInit() {
    this.agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
    this.agoraEngine.on("user-published", async (user: any, mediaType: any) => {
      await this.agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");
      if (mediaType == "video") {
        // Retrieve the remote video track.
        this.channelParameters.remoteVideoTrack = user.videoTrack;
        // Retrieve the remote audio track.
        this.channelParameters.remoteAudioTrack = user.audioTrack;
        // Save the remote user id for reuse.
        this.channelParameters.remoteUid = user.uid.toString();
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        this.remotePlayerContainer.nativeElement.id = user.uid.toString();
        this.channelParameters.remoteUid = user.uid.toString();
        this.remotePlayerContainer.nativeElement.textContent = "Remote user " + user.uid.toString();

        this.channelParameters.remoteVideoTrack.play(this.remotePlayerContainer.nativeElement);
      }
      // Subscribe and play the remote audio track If the remote user publishes the audio track only.
      if (mediaType == "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        this.channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        this.channelParameters.remoteAudioTrack.play();
      }
    });
  }

  async join() {
    await this.agoraEngine.join(this.options.appId, this.options.channel, this.options.token, this.options.uid);
    this.channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    this.channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await this.agoraEngine.publish([this.channelParameters.localAudioTrack, this.channelParameters.localVideoTrack]);
    this.channelParameters.localVideoTrack.play(this.localPlayerContainer.nativeElement);
  }

  async leave() {
    this.channelParameters.localAudioTrack.close();
    this.channelParameters.localVideoTrack.close();
    await this.agoraEngine.leave();
    this.close.emit();
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem("TOKEN") ?? "");
    } catch (Error) {
      return null;
    }
  }

}
