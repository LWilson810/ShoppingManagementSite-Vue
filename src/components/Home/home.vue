<template>
  <div>
    <div id='Header'>
      <div class="toptab"></div>
      <div class="toptab">
        <ul v-if = "isAuthenticated" class="ul-hd">
          <li class = 'ul-hd drp'><a href = '/About'><i class = "fa fa-hand-o-right"></i>제품소개</a></li>
          <li class = "ul-hd dropdown" style = "padding:2px">
            <a style = "font-size:15px; cursor:pointer" data-toggle = "dropdown" class = "dropdown-toggle" data-hover = "dropdown">{{handle}}</a>
              <ul class="dropdown-menu dropdown-menu-user" style = "background-color:lightgray">
                <li ><a href = "" @click = "onClickLogout"><i class = "fa fa-sign-out"></i>가입탈퇴</a></li>
                <li><a href = "" @click = "onClickLockBtn"><i class = "icon-lock"></i>화면잠금</a></li>
                <li><a href = '/Profile'><i class = "fa fa-user"></i>사용자정보</a></li>
              </ul>
          </li>
          <li class = 'ul-hd drp'><router-link to ='/Main'><i class = "fa fa-home"></i>기본페지로...</router-link></li>
          <li class="ul-hd drp"><a href = "/Task"><i class = "fa fa-edit"></i>나의 일정</a></li>
        </ul>
        <ul v-if = "!isAuthenticated" class="ul-hd">
          <li class ='ul-hd drp'><router-link to = '/About' ><i class = "fa fa-hand-o-right"></i>제품소개</router-link></li>
          <li class ='ul-hd drp'><router-link to = '/Register' ><i class = "fa fa-user-plus"></i>등록</router-link></li>
          <li class ='ul-hd drp'><router-link to = '/Login' ><i class = "fa fa-sign-in"></i>가입</router-link></li>
        </ul>
        <!-- {this.props.auth.isAuthenticated ? (loggedTab) : (unloggedTab)} -->
      </div>  
    </div>
    <section id="home-sec" class = "fadeInRight delay-02s animated" style = "visibility:visible; animation-name:fadeInRight"> 
      <div class="overlay text-center" >
          <h1 class = "wow fadeInLeft delay-04s">다양한 기능 & 활발한 교류</h1>
          <hr class="hr-set"/>
      </div>
    </section>
    <section id="services-sec" class = "wow fadeIn delay-08s">
      <div class="container">
        <div class="row text-center" >
          <div class="col-md-4 col-sm-4 wow flipInY delay-02s">
            <a title = "새 일정을 추가합니다." href = '/Task'><i class="fa fa-edit fa-5x icon-custom-1 color-1"></i></a>
            <h3>오늘 계획</h3>
          </div>
          <div class="col-md-4 col-sm-4 wow fadeInDown delay-02s">
            <h3>나의 일정 </h3>
            <p>
                하루 자기자신의 계획을 세우십시오.<br/>
                하루 계획을 완성하도록 자신을 채찍질합시다. <br/>
                한번 세운 계획은 다시 수정할수 없습니다.<br/>
                오늘 계획을 수행하였습니까? <br/>
                이제라도 늦지 않았습니다.
            </p>
          </div>
          <div id = "eventItem" class="col-md-4 col-sm-4 wow flipInX delay-02s">
            <a title = "일정관리를 진행합니다." href = "/Task" v-on:click = "checkEvent"><i class="fa fa-calendar fa-5x icon-custom-1 color-1"></i>
            </a>

          <h3>일정관리</h3>
          </div>
        </div>
        <!-- <div class="row text-center wow fadeInDown delay-02s">
          <div id="chartdiv" class = {this.props.auth.isAuthenticated ? null:cn('hidden')}>
            <Chart options={this.state.options} series={this.state.series} type = 'bar' width={'100%'} height={320} />
          </div>
        </div> -->
        
      </div>
    </section>
    <section id="features-sec"  >
      <div class="container">  
        <div class="row text-center" >
          <div class="col-md-6 col-sm-6 wow lightSpeedIn delay-02s" >
            <router-link to = '/Main/QuesAndAns'><i class="fa fa-exclamation fa-3x icon-custom-2 color-2"></i></router-link>
            <h4>물음과 대답</h4>
            <p>
                관리부에 질문을 제기합니다. <br/>
                관리부에서는 질문에 해당한 답변을 제기합니다.<br/>
                조금이라도 의문되는 점은 모두 제기합시다. 
            </p>

          </div>
          <div class="col-md-6 col-sm-6 wow fadeInRight delay-02s " >
            <router-link to = '/Main/Eboard/Article/1___'><i class="fa fa-comments-o fa-3x icon-custom-2 color-2"></i></router-link>
            <h4>전자게시판 </h4>
            <p>
                경험기사, 상식자료, 외국어학습자료 등을 게재할수 있습니다. <br/>
                기사들에 대한 의견글을 올리면서 추천 및 반대의향을 표시합니다. 
            </p>
          </div>
        </div>
        <div class="row text-center" >
          <div class="col-md-6 col-sm-6 wow fadeInLeft delay-02s " >
            <router-link to = "/Main/Notification"><i class="fa fa-bell-o fa-3x icon-custom-2 color-2"></i></router-link>
            <h4>알리는 소식</h4>
            <p>
                최근 소식을 볼수 있습니다. 
            </p>
          </div>
          <div class="col-md-6 col-sm-6 wow lightSpeedIn delay-02s " >
            <a href = '/Main/Discuss'><i class="fa fa-users fa-3x icon-custom-2 color-2"></i></a>
            <h4>토론마당</h4>
            <p>
                토론마당에서 친구들과 열기띤 토론을 벌릴수 있습니다.<br/>
                <span><a  href = "#testimonial-sec">구체적으로...</a></span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="services-sec" class = "wow fadeInLeft delay-04s">
      <div class="container">
        <div class="row text-center" >
          <div class="col-md-8 col-sm-8">
            <h3>프로그람봉사  </h3>
            <p>
                요구하는 프로그람을 구입할수 있습니다.
                여러가지 유희오락프로그람 및 사무처리프로그람 등 다양한 프로그람들이 적재되여 있습니다. <br/>
            </p>
          </div>
          <div class="col-md-4 col-sm-4 wow rotateInDownLeft delay-02s">
            <a title = "프로그람봉사를 합니다."><i class="fa fa-android fa-5x icon-custom-1 color-1"></i></a>
          </div>
        </div>
      </div>
    </section>
    <div id="testimonial-sec">
      <div class="container">
        <div class="row ">
          <div class="col-md-2 wow rotateInUpLeft delay-02s">
            <p style = "text-align:center; margin-top:50px"><a href = '/Main/Discuss'><i class="fa fa-users fa-3x icon-custom-2 color-2"></i></a></p>
            <h4 style = "text-align:center; color:white">토론마당</h4>
          </div>
          <div class="col-md-8 wow zoomIn delay-02s">
            <div id="carousel-example" style = "margin-top:0" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carousel-example" data-slide-to="0" class="active"></li>
                <li data-target="#carousel-example" data-slide-to="1"></li>
                <li data-target="#carousel-example" data-slide-to="2"></li>
                <li data-target="#carousel-example" data-slide-to="3"></li>
              </ol>
              <div class="carousel-inner">
                <div class="item active">
                  <div class="container center">
                    <div class="col-md-6 col-md-offset-1 slide-custom">
                              
                      <h4><i class="fa fa-quote-left"></i>1대1 본문대화를 진행하여 경험교류를 실현합니다. 본문대화진행정형을 보관하는 리력보관기능도 있습니다. 널리 리용하여 주십시오. <i class="fa fa-quote-right"></i></h4>
                      <div class="user-img pull-right">
                      </div>
                      <h5 class="pull-right"><strong class="c-black">본문대화</strong></h5>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="container center">
                    <div class="col-md-6 col-md-offset-1 slide-custom">
                      <h4> <i class="fa fa-quote-left"></i> 친구목록에 있는 망가입자들과 동시에 본문대화를 진행하는 회의주최기능이 있습니다. 회의기록을 보관하는 리력보관기능도 있습니다. 널리 리용하여 주십시오. <i class="fa fa-quote-right"></i></h4>
                    <div class="user-img pull-right">
                    </div>
                    <h5 class="pull-right"><strong class="c-black">회의주최</strong></h5>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="container center">
                    <div class="col-md-6 col-md-offset-1 slide-custom">
                      <h4><i class="fa fa-quote-left"></i>동영상호출기능이 있습니다. 널리 리용하여 주십시오. <i class="fa fa-quote-right"></i></h4>
                    <div class="user-img pull-right">
                    </div>
                    <h5 class="pull-right"><strong class="c-black">동영상호출</strong></h5>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="container center">
                    <div class="col-md-6 col-md-offset-1 slide-custom">
                      <h4> <i class="fa fa-quote-left"></i> 음성우편 및 전자우편을 보낼수 있습니다. 상대방이 망에 가입하지 않았을 때 매우 유용합니다. 다중전자우편기능도 추가하였습니다. 널리 리용해주십시오.<i class="fa fa-quote-right"></i></h4>
                    <div class="user-img pull-right">
                      <i class="fa fa-envelope"></i>
                    </div>
                    <h5 class="pull-right"><strong class="c-black">음성 및 전자우편</strong></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </div>
    <section id="footer-sec">
      <div class="container">
        <div class="row">
          <div class="col-md-4  wow bounceIn delay-02s">
            <h2 class="text-light"><i class = "fa fa-hand-o-right"></i>간단한 소개</h2>
            <p class = 'footer-content'>강성이동통신홈페지에서는 회선료금지불봉사, 명의변경접수, 분실신청확인봉사를 비롯하여 이동통신망에서 진행하는 봉사를 받을수 있으며 이동통신과 관련한 정보들을 열람할수 있습니다.</p>
          </div>
          <div class="col-md-4  wow bounceIn delay-02s">
          <h2 class="text-light"><i class = "fa fa-comment-o"></i>의견글 보내기</h2>
          <textarea class="footer-comment" placeholder = '의견글에는 반드시 련계번호가 있어야 합니다.'></textarea>
                  
          </div>
          <div class="col-md-4  wow bounceIn delay-02s">
            <h2 class="text-light"><i class = "fa fa-rss"></i>우리와의 련계</h2>
            <h2 class = 'text-light'><i class = "fa fa-phone-square"></i>191-266-3770</h2>
            <p class = "footer-content">
            <i class = "fa fa-home"></i>:평양시 대동강구역 문신동<br /><br />
            <i class = "fa fa-envelope"></i>:kms981014@pt.net.kp
            </p>

          </div>
              
        </div>
              
      </div>
    </section>
    <a id = "toTop" class = "scrollTopBtn color-1 hidden"><i class = "fa fa-angle-up fa-3x"></i></a>
    <a id = "toDown" class = "scrollDownBtn color-1 active"><i class = "fa fa-angle-down fa-3x"></i></a>
  </div>
</template>

<script>
import './style.css'
import jwt_decode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import logo from '@/common/logo.svg'
import img from '@/common/Lighthouse.jpg';
import {setCurrentUser, isTodayEvent} from '@/actions/authActions';
import setAuthToken from '@/utils/setAuthToken';
import {getCurrentNotification, clearCurrentNotification} from '@/actions/notificationActions';
import {getTaskHistory} from '@/actions/taskActions';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  mounted () {
    if(localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.$store.commit('SET_CURRENT_USER', decoded);
      this.isAuthenticated = this.$store.state.isAuthenticated;
      this.handle = this.$store.state.user.handle;
      console.log(this.isAuthenticated, this.handle);
    }
  },
  data () {
    return {
      isAuthenticated: false,
      handle: ""
    }
  },

  methods: {
    ...mapActions([
      'logoutUser',
      'lockScreen'
    ]),
    onClickLogout() {
      this.$store.dispatch('logoutUser');
    },

    onClickLockBtn() {
      this.lockScreen();
    },
    checkEvent() {
      const decoded = jwt_decode(localStorage.jwtToken);
      decoded['isTodayEventChecked'] = true;
      //localStorage.setItem('jwtToken')
      const payload = {
        handle: decoded.handle,
        id: decoded.id,
        password: decoded.password,
        name: decoded.name,
        isTodayEventChecked: decoded.isTodayEventChecked,
        isNotificationChecked: decoded.isNotificationChecked,
        currentNotificationCheck: decoded.currentNotificationCheck,
        notificationCheck: decoded.notificationCheck,
        locked: decoded.locked
      }
      //console.log(decoded)
      jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
        localStorage.setItem('jwtToken', "Bearer " + token);
        setAuthToken(token);
      })
    }
  },
  destroyed () {

  }
  // components: { Menu }
}
</script>

<style scoped>
  h1, h2, h3{
    color:white;
  }
</style>