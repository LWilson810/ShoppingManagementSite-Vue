<template>
  <div class="timerModal" id = 'timerModal'>
    <span class = "timerTitle" id = "timerTitle"></span>&nbsp;
    <a style = 'color:white' @click = "Lock"><span><i class = "icon-lock"></i></span></a>
  </div>
</template>

<script>

import $ from 'jquery';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { mapActions } from 'vuex';


var timer; 
var waitTime = 5*1000;
var deadTime = 10*60*1000;
var limitTime = deadTime + waitTime;
function startTimer () {
  limitTime = deadTime + waitTime;
  var totalTime = limitTime;
  // $("#timerTitle").text(`${parseInt(deadTime/1000/60)}:${deadTime/1000%60}`);
  timer = setTimeout(() => {
    if(window.location.pathname != '/lockscreen') {
      // this.lockScreen(this.$router);
      store.dispatch('lockScreen');
      // store.dispatch(lockScreen(this.$router));
    }
  },totalTime);
}

function listenEvent() {
  document.addEventListener('mousemove', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('click', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('dblclick', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('keydown', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('keypress', function() {
    clearTimeout(timer);
    startTimer();
  })
  // document.addEventListener('DOMMouseScroll', function() {
  //   clearTimeout(timer);
  //   startTimer();
  // })
  document.addEventListener('scroll', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('mousewheel', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('mousemove', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('touchstart', function() {
    clearTimeout(timer);
    startTimer();
  })
  document.addEventListener('touchmove', function() {
    clearTimeout(timer);
    startTimer();
  })
}



export default {
  
  
  methods: {
    ...mapActions([
      'lockScreen'
    ]),
    Lock() {
      this.lockScreen()
    }
  },
  mounted() {
    if(window.location.pathname != '/LockScreen' && localStorage.jwtToken) {
      // window.alert("sdf");
      $("#timerModal").show();
      clearInterval(timer);
      startTimer();
      listenEvent();
      setInterval( () => {
        // warning.pause();
        // warning.load();
        limitTime -= 1000;
        if(limitTime <= deadTime) {
          limitTime = limitTime < 0 ? 0: limitTime;
          var min = parseInt(limitTime/1000/60);
          var sec = (limitTime/1000)%60;
          limitTime < 10*1000 ? ($("#timerTitle").css('color', 'red')) : ($("#timerTitle").css('color', 'white'));
          if(limitTime > 0 && limitTime < 10*1000) {
            // warning.play();
          }
          $("#timerTitle").text(`${min}:${sec}`);
        } else {
          $("#timerTitle").css('color', 'white')
          $("#timerTitle").text(`${parseInt(deadTime/1000/60)}:${deadTime/1000%60}`);
        }
      }, 1000)
    } else {
      $("#timerModal").hide();
    }
  },
  updated() {
    if(window.location.pathname == '/LockScreen') {

    }
  }
}

</script>