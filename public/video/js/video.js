/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 视频会议
 *  @data 2021/8/24
 **/
var vm = new Vue({
  el:'#content',
  data: {
    // 获取音量
    audioLevelTimerMap: new Map(),
    //  直播实列
    client: null,
    // 本地流
    localStream: null,
    // 分享流
    shareStream: null,
    // 当前进入的用户列表
    userList: [],
    // 所有用户列表
    alluserList: [],
    // 是否允许进入
    isJoin: true,
    // 用户名称
    userId: '',
    // 房间号
    roomId: null,
    // 是否为主持人
    privilege: '',
    // 是否屏幕分享
    stream: false,
    // 是否打开视频
    video: true,
    // 是否打开音频
    audio: true,
    // 服务器地址
    url: '',
    // 当前页数
    current: 1,
    // 每页条数
    size: 1000,
    model: {
      // 会议名称
      meetName: '',
      // 会议状态(字典控制 1.待开始  2.进行中  3.已结束)
      meetingState: '',
      // 开始时间
      beginTime: ''
    },
    // 租户
    tenant: null,
    // token
    token: null,
    // 签名
    userSig: null,
    // 请求头
    headers:{
      "Content-Type":"application/json;charset=UTF-8",
      "tenant": null,
      "token": null
    },
    // 会议名称
    meetName: '',
    // 最高权限
    privateMapKey: '',

  },
  mounted(){
    let ishttps = 'https:' == document.location.protocol ? true : false
    if(ishttps){
      this.url ='https://'+ window.location.hostname+":"+window.location.port+'/'
    }else{
      this.url ='http://'+ window.location.hostname+":"+window.location.port+'/'
    }

    this.userId = this.getUrlParam('userId')
    this.roomId = this.getUrlParam('roomId')
    this.tenant = this.getUrlParam('tenant')
    this.token = this.getUrlParam('token')
    this.privilege = this.getUrlParam('privilege')
    this.meetName = this.getUrlParam('meetName')

    this.headers.tenant = this.tenant
    this.headers.token = this.token

    this.ischeck()
  },
  methods: {
    // 获取所有参会人员列表-接口
    getAllJoinPer(userId){
      let _this = this
      let userIds = []
      userIds.push(userId)
      let params = {
        roomNum: _this.roomId,
      }
      $.ajax(_this.url + 'djapi/partycloud/participants/findJoin',{
        type:'POST',
        //服务器返回json格式数据
        dataType: 'JSON',
        //超时时间设置为10秒；
        timeout: 30000,
        headers: _this.headers,
        data:JSON.stringify(params),
        success(res){
          if(res.code === 0){
            _this.alluserList = res.data
            _this.anchorJoin()
          }else{
            _this.alluserList = []
          }
        },
        error(XMLHttpRequest, textStatus, errorThrown){
          // 通常情况下textStatus和errorThown只有其中一个有值
          console.log("获取所有参会人员列表异常：",XMLHttpRequest,textStatus,errorThrown)
        }
      })
    },
    // 移除用户-接口
    removeUsers(userId){
      let _this = this

      let userIds = []
      userIds.push(userId)

      let params = {
        roomId: _this.roomId,
        userIds: userIds
      }

      $.ajax(_this.url + 'djapi/partycloud/tencent/removeUsers',{
        type:'POST',
        //服务器返回json格式数据
        dataType: 'JSON',
        //超时时间设置为10秒；
        timeout: 30000,
        headers: _this.headers,
        data:JSON.stringify(params),
        success(res){
          // console.log("移除用户成功:",res)
        },
        error(XMLHttpRequest, textStatus, errorThrown){
          // 通常情况下textStatus和errorThown只有其中一个有值
          // console.log("移除用户异常：",XMLHttpRequest,textStatus,errorThrown)
        }
      })
    },
    // 解散房间-接口
    dissolveRoom(){
      let _this = this
      if(_this.privilege == '255'){
        let params = {
          roomId: _this.roomId,
        }
        $.ajax(_this.url + 'djapi/partycloud/tencent/dissolveRoom',{
          type:'POST',
          //服务器返回json格式数据
          dataType: 'JSON',
          //超时时间设置为10秒；
          timeout: 30000,
          headers: _this.headers,
          data:JSON.stringify(params),
          success(res){
            _this.signOut()
          },
          error(XMLHttpRequest, textStatus, errorThrown){
            // 通常情况下textStatus和errorThown只有其中一个有值
            // console.log("解散房间异常：",XMLHttpRequest,textStatus,errorThrown)
          }
        })
      }else{
        _this.signOut()
      }
    },
    // 获取签名-接口
    getUserSig(){
      let _this = this
      let params = {
        expire: 86400,
        userid: this.userId,
        roomid: this.roomId,
        privilegeMap: this.privilege,
      }
      $.ajax(_this.url + 'djapi/partycloud/tencent/genPrivateMapKey',{
        type:'POST',
        //服务器返回json格式数据
        dataType: 'JSON',
        //超时时间设置为10秒；
        timeout: 30000,
        headers: _this.headers,
        data:JSON.stringify(params),
        success(res){
          if(res && (res.code === 0)){
            _this.userSig = res.data.userSig
            _this.privateMapKey = res.data.privateMapKey
            _this.getAllJoinPer()
          }
        },
        error(XMLHttpRequest, textStatus, errorThrown){
          // 通常情况下textStatus和errorThown只有其中一个有值
          // console.log("获取签名异常：",XMLHttpRequest,textStatus,errorThrown)
        }
      })
    },
    // 获取地址栏参数
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) {
        return decodeURIComponent(r[2]);
      }
      return null;
    },
    // 检测浏览器是否支持
    ischeck(){
      let _this = this
      TRTC.checkSystemRequirements().then(checkResult => {
        if (!checkResult.result) {
          // 根据用户设备类型建议用户使用 SDK 支持的浏览器
          alert("目前浏览器暂不支持在线会议功能！")
        }else {
          _this.getUserSig()
        }
      })
    },
    // 进入房间
    anchorJoin(){
      let _this = this
      if(_this.isJoin){
        _this.isJoin = false;
        // 判断房间ID是否为字符串
        let useStringRoomId = ((typeof  _this.roomId) === 'string')
        _this.client = TRTC.createClient({
          mode: 'rtc',
          sdkAppId:genTestUserSig(_this.userId).sdkAppId,
          userId: _this.userId,
          userSig: _this.userSig,
          privateMapKey:  _this.privateMapKey,
          roomId:  _this.roomId,
          useStringRoomId: useStringRoomId
        });

        const members = new Map();
        const config = genTestUserSig(_this.userId);
        const sdkAppId = config.sdkAppId;
        const userSig = _this.userSig;
        // 远端流 通过 监听 (远端流增加)
        _this.client.on('stream-added', event => {
          const remoteStream = event.stream;
          // 订阅远端流
          _this.subscribe(_this.client,remoteStream);

          // 用户列表音视频控制
          if(_this.userList && _this.userList.length ){
            _this.userList.forEach(item => {
              if(remoteStream.getUserId() === item.userId){
                item.video = remoteStream.hasVideo()
              }
            })

            _this.userList.forEach(item => {
              if(remoteStream.getUserId() === item.userId){
                item.micr = remoteStream.hasAudio()
              }
            })
          }
        });
        // 以观众角色进房收看 audience:观众 anchor:主播
        _this.client.join({
          roomId:  _this.roomId,
          privateMapKey:  _this.privateMapKey,
        })
          .catch(error => {
            _this.isJoin = true;
            return 'error'
          })
          .then((res) => {
            if(res !== 'error'){
              let isHost = (_this.privilege == '255')
              let user = {
                headImg: '',
                userId: _this.userId,
                isHost: isHost,
                micr: true,
                video: true,
                myself: true,
              }
              if(isHost){
                _this.userList.unshift(user)
              }else{
                _this.userList.push(user)
              }

              // 创建本地音视频流
              let localStream = TRTC.createStream({
                userId: _this.userId,
                audio: true,
                video: true ,
                mirror:false
              });
              _this.localStream = localStream
              // 初始化本地音视频流
              localStream.initialize()
                .catch(error => {
                  _this.isJoin = true;
                  // console.error('初始化本地流失败 ' + error);
                  return 'error';
                })
                .then((res) => {
                  if(res !== 'error'){
                    // 创建视频
                    _this.foundMe()
                    // 播放本地流
                    localStream.play('live-box');
                    // 发布本地流
                    _this.publish(localStream)
                    _this.startGetAudioLevel(localStream,_this.userId);
                  }
                });

              // 监听用户音量
              _this.client.on('audio-volume', event => {
                event.result.forEach(({ userId, audioVolume, stream}) => {
                  if(document.getElementById(userId)){
                    document.getElementById(userId).style.height = audioVolume+"%";
                  }
                })
              })

              // 开启音量回调，并设置每 1000ms 触发一次事件
              _this.client.enableAudioVolumeEvaluation(100);

              // 监听用户进房
              _this.client.on('peer-join', event => {
                // 用户列表
                _this.alluserList.forEach(item => {
                  if(event.userId === item.userName){
                    let isHost = (item.privilege == '255')
                    let user = {
                      headImg: '',
                      userId: event.userId,
                      isHost: isHost,
                      micr: true,
                      video: true,
                      myself: false,
                    }
                    if(isHost){
                      _this.userList.unshift(user)
                    }else{
                      _this.userList.push(user)
                    }
                  }
                })
              });

              // 远端用户禁用音频通知
              _this.client.on('mute-audio', event => {
                const userId = event.userId
                // 用户列表
                _this.userList.forEach(item => {
                  if(userId === item.userId){
                    item.micr = false
                  }
                })
              });

              // 远端用户启用音频通知
              _this.client.on('unmute-audio', event => {
                const userId = event.userId
                // 用户列表
                _this.userList.forEach(item => {
                  if(userId === item.userId){
                    item.micr = true
                  }
                })
              });

              // 远端用户禁用视频通知。
              _this.client.on('mute-video', event => {
                const userId = event.userId;
                let box = document.getElementById('live-box' + userId)
                if(box.classList.contains('active')){
                  box.classList.remove('active')
                }
                _this.setHeigW()

                // 用户列表
                _this.userList.forEach(item => {
                  if(userId === item.userId){
                    item.video = false
                  }
                })

              });
              // 远端用户启用视频通知
              _this.client.on('unmute-video', event => {
                const userId = event.userId;
                if(!document.getElementById('live-box' + userId)){
                  _this.foundOther(userId)
                }else{
                  if(!document.getElementById('live-box' + userId).classList.contains('active')){
                    document.getElementById('live-box' + userId).classList.add('active')
                  }
                }
                _this.setHeigW()

                // 用户列表
                _this.userList.forEach(item => {
                  if(userId === item.userId){
                    item.video = true
                  }
                })
              });

              // 监听用户被踢出房间通知
              _this.client.on('client-banned', error => {
                // 退出
                _this.signOut()
              });

              // 监听用户退出
              _this.client.on('peer-leave', event => {
                _this.userList.forEach((item,index) =>{
                  if(event.userId === item.userId){
                    _this.userList.splice(index,1)
                  }
                })
              });

              // 监听远端流增加事件
              _this.client.on('stream-subscribed', event => {
                const remoteStream = event.stream;
                // 创建视频
                _this.foundOther(remoteStream.getUserId())
                remoteStream.setAudioVolume(0.5)
                // 播放远端流
                remoteStream.play('live-box' + remoteStream.getUserId());
                // 开启音量回调，并设置每 1000ms 触发一次事件
                _this.client.enableAudioVolumeEvaluation(100);

                // 用户列表音视频控制
                if(_this.userList && _this.userList.length ){
                  _this.userList.forEach(item => {
                    if(remoteStream.getUserId() === item.userId){
                      item.video = remoteStream.hasVideo()
                    }
                  })

                  _this.userList.forEach(item => {
                    if(remoteStream.getUserId() === item.userId){
                      item.micr = remoteStream.hasAudio()
                    }
                  })
                }
              });
              // 远端流移除事件
              _this.client.on('stream-removed', event => {
                const remoteStream = event.stream;
                if(document.getElementById('live-box' + remoteStream.getUserId())){
                  let box = document.getElementById('live-box' + remoteStream.getUserId())
                  $(".live-card")[0].removeChild(box)
                  _this.setHeigW()
                }

                if(remoteStream.getVideoTrack() === null){
                  // 用户列表音视频控制
                  setTimeout(() => {
                    _this.userList.forEach(item => {
                      if(remoteStream.getUserId() === item.userId){
                          item.video = false,
                          item.micr = false
                      }
                    })
                  },300)
                }
              });
            }else{
              alert("未成功进入会议，请稍后尝试！")
            }
          });
      }
    },
    // 退出房间
    signOut(){
      let _this = this
      _this.client.leave().catch(error => {
          return 'error'
        })
        .then((res) => {
          if(res !== 'error'){
            _this.clearGetAudioLevelTimer();
            userList = [];
            let box=document.getElementsByClassName("live-card")[0];
            box.innerHTML = "";
            $(".join-room").css("display","block")
            $(".live-room").css("display","none")
            if(_this.localStream){
              _this.localStream.stop();
              _this.localStream.close();
              _this.localStream = null;
            }
            if(_this.shareStream){
              _this.shareStream.stop();
              _this.shareStream.close();
              _this.shareStream = null;
            }
            _this.isJoin = true;
            // 取消监听用户音量大小
            _this.client.enableAudioVolumeEvaluation(-1);
            // 取消获取所有音量
            _this.client = null;
            // 关闭当前窗口
            window.opener=null;
            window.open('','_self');
            window.close();
          }else{
            alert('退出失败')
          }
        });
    },
    // 订阅远端流
    subscribe(client,remoteStream){
      this.client.subscribe(remoteStream, { audio: true, video: this.video }).catch(e => {})
    },
    // 取消订阅远端流
    unsubscribe(client,remoteStream){
      this.client.unsubscribe(remoteStream).catch(e => {})
    },
    // 发布本地流
    publish(localStream){
      this.client.publish(this.localStream)
        .catch(error => {})
        .then(() => {});
    },
    // 取消发布本地流
    unpublish(localStream){
      let _this = this
      _this.client.unpublish(_this.localStream)
      .catch(error => {
        return 'error';
      }).then((res) => {
        if(res !== 'error'){
          // 取消发布本地流成功
          _this.localStream.stop();
        }
      });
    },
    // 开始获取指定流音量
    startGetAudioLevel(stream,doc) {
      let timer = this.setAnimationFrame(() => {
        const volume = stream.getAudioLevel();
        if(document.getElementById(doc)){
          document.getElementById(doc).style.height = volume*100+"%";
        }
      });
      this.audioLevelTimerMap.set(stream.getId(), timer);
    },
    // 停止获取指定流音量
    stopGetAudioLevel(stream) {
      let timer = this.audioLevelTimerMap.get(stream.getId());
      this.clearAnimationFrame(timer);
    },
    // 停止获取所有流的音量
    clearGetAudioLevelTimer() {
      let _this = this
      _this.audioLevelTimerMap.forEach(audioLevelTimer => {
        audioLevelTimer && _this.clearAnimationFrame(audioLevelTimer);
      });
      _this.audioLevelTimerMap.clear();
    },
    // 设置AnimationFrame
    setAnimationFrame(render) {
      // 计时器
      let timer = {};
      function animeLoop() {
        render();
        timer.id = requestAnimationFrame(animeLoop);
      }
      animeLoop();
      return timer;
    },
    // 清除AnimationFrame
    clearAnimationFrame(timer) {
      cancelAnimationFrame(timer.id);
    },
    // 打开视频
    openVideo(user){
      if(!user.myself){
        return false
      }

      let _this = this
      if(_this.video !== true){
        _this.video = true;
        // 打开摄像头，增加视频通话
        const videoStream = TRTC.createStream({
          userId: _this.userId,
          audio: false,
          video: true,
          mirror:false
        });
        videoStream.initialize().then(() => {
          _this.userList.forEach(item => {
            if(_this.userId === item.userId){
              item.video = true
            }
          })
          // 增加视频通话
          _this.localStream.addTrack(videoStream.getVideoTrack()).then(() => {
            _this.localStream.unmuteVideo();
          });
        });

      }else{
        _this.video = false;
        _this.localStream.muteVideo();
        // 关闭视频通话
        const videoTrack = _this.localStream.getVideoTrack();
        if (videoTrack) {
          _this.localStream.removeTrack(videoTrack).then(() => {
            // 用户列表
            _this.userList.forEach(item => {
              if(_this.userId === item.userId){
                item.video = false
              }
            })
            // 关闭摄像头
            videoTrack.stop();
          });
        }
      }
    },
    // 打开音频
      openAudio(user){
      if(!user.myself){
        return false
      }
      let _this= this
      if(_this.audio){
        _this.audio = false

        _this.userList.forEach(item => {
          if(_this.userId === item.userId){
            item.micr = false
          }
        })

        if(_this.stream){
          _this.shareStream.muteAudio();
        }else{
          _this.localStream.muteAudio();
        }
      }else{
        _this.audio = true

        _this.userList.forEach(item => {
          if(_this.userId === item.userId){
            item.micr = true
          }
        })

        if(_this.stream){
          _this.shareStream.unmuteAudio();
        }else{
          _this.localStream.unmuteAudio();
        }
      }
    },
    // 打开屏幕分享
    openShare(type){
      let _this = this
      if(!_this.stream){
        _this.unpublish(_this.localStream)
        // 打开摄像头，增加视频通话
        _this.shareStream = TRTC.createStream({ audio: true, screen: true, userId: _this.userId });
        _this.shareStream.initialize()
          .catch(e=>{
            // 当屏幕分享流初始化失败时, 提醒用户并停止后续进房发布流程
            switch (e.name) {
              case 'NotReadableError':
                // 提醒用户确保系统允许当前浏览器获取屏幕内容
                alert('确保系统允许当前浏览器获取屏幕内容')
                _this.localStream.initialize()
                  .catch(error => {
                    // console.error('初始化本地流失败 ' + error);
                    _this.isJoin = true;
                    return 'error';
                  })
                  .then((res) => {
                    // 播放本地流
                    _this.localStream.play('live-box');
                    // 发布本地流
                    _this.publish(_this.localStream)
                    _this.startGetAudioLevel(_this.localStream, _this.userId);
                  })
                return 'error';
              case 'NotAllowedError':
                if (e.message === 'Permission denied by system') {
                  // 提醒用户确保系统允许当前浏览器获取屏幕内容
                  alert('确保系统允许当前浏览器获取屏幕内容')
                  _this.localStream.initialize()
                    .catch(error => {
                      _this.isJoin = true;
                      return 'error';
                    })
                    .then((res) => {
                      // 播放本地流
                      _this.localStream.play('live-box');
                      // 发布本地流
                      _this.publish(localStream)
                      _this.startGetAudioLevel(_this.localStream, _this.userId);
                    })
                } else {
                  // 用户拒绝/取消屏幕分享
                  alert('拒绝/取消屏幕分享')
                  _this.localStream.initialize()
                    .catch(error => {
                      // console.error('初始化本地流失败 ' + error);
                      _this.isJoin = true;
                      return 'error';
                    })
                    .then((res) => {
                      // 播放本地流
                      _this.localStream.play('live-box');
                      // 发布本地流
                      _this.publish(_this.localStream)
                      _this.startGetAudioLevel(_this.localStream, _this.userId);
                    })
                }
                return 'error';
              default:
                // 初始化屏幕分享流时遇到了未知错误，提醒用户重试
                alert('初始化屏幕分享流时遇到了未知错误')
                _this.localStream.initialize()
                  .catch(error => {
                    // console.error('初始化本地流失败 ' + error);
                    _this.isJoin = true;
                    return 'error';
                  })
                  .then((res) => {
                    // 播放本地流
                    _this.localStream.play('live-box');
                    // 发布本地流
                    _this.publish(_this.localStream)
                    _this.startGetAudioLevel(_this.localStream, _this.userId);
                  })
                return 'error';
            }
          })
          .then((res) => {
            if(res !== 'error'){
              _this.stream = true;
              _this.shareStream.play('live-box');
              _this.publishShare(_this.shareStream);
              _this.startGetAudioLevel(_this.localStream, _this.userId);
            }
          });
      }else{
        _this.closeShare()
      }

      // 屏幕分享流监听屏幕分享停止事件
      _this.shareStream.on('screen-sharing-stopped', event => {
        _this.closeShare()
      });
    },
    // 关闭屏幕分享
    closeShare(){
      let _this = this
      _this.stream = false;
      // 屏幕分享客户端停止推流
      _this.unpublishShare(_this.shareStream);
      _this.shareStream.close();
      if(!_this.video){
        // 打开摄像头，增加视频通话
        const videoStream = TRTC.createStream({ userId: _this.userId, audio: false, video: true });
        videoStream.initialize().then(() => {
          // 增加视频通话
          _this.localStream.addTrack(videoStream.getVideoTrack()).then(() => {});
        });
        _this.localStream.unmuteVideo();
      }
      _this.localStream.initialize()
        .catch(error => {
          _this.isJoin = true;
          return 'error';
        })
        .then((res) => {
          _this.localStream.play('live-box');
          _this.publish(_this.localStream)
        })
    },
    // 发布屏幕分享
    publishShare(shareStream){
      this.client.publish(this.shareStream)
      .catch(error => {})
      .then(() => {});
    },
    // 停止屏幕分享
    unpublishShare(shareStream){
      let _this = this
      _this.client.unpublish(_this.shareStream)
      .catch(error => {}).then(() => {
        _this.shareStream.stop();
      });
    },
    // 创建自己视频窗口
    foundMe(){
      let box = document.createElement("div")
      box.id = 'live-box';
      box.className = 'live-box active';
      $(".live-card")[0].appendChild(box);
      this.setHeigW()
    },
    // 创建其他人窗口
    foundOther(otherId){
      let box = document.createElement("div")
      box.id = 'live-box' + otherId;
      box.className = 'live-box active';
      $(".live-card")[0].appendChild(box);
      this.setHeigW()
    },
    // 画面大小
    setHeigW(){
      if($(".active").length === 2){
        $(".active").css("width",50+"%")
        $(".active").css("height",100+"%")
      }else{
        $(".active").css("width",(100/Math.ceil(Math.sqrt($(".active").length)))+"%")
        $(".active").css("height",(100/Math.ceil(Math.sqrt($(".active").length)))+"%")
      }
    }
  }
})

