<template>
    <div class="page-404">
        <nav class="navbar fixed-top navbar-expand-md bg-blue-gradient dnm-navbar">
            <router-link to='/' class="navbar-brand d-flex">
                <img alt="Logo" class="company-logo" height="44" src="../../assets/images/logos/branch-logo.png" width="138">
            </router-link>
            <div class="collapse navbar-collapse"></div>
        </nav>

        <div class="container page-404-panel page-404-logo">
            <div class="meter-arrow"></div>
            <h1 class="title-1">Page Not Found</h1>
            <h2 class="title-2">We couldn't find the page you are looking for</h2>
            <h2 class="title-2">Go to <router-link to="/">Dashboard</router-link></h2>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';

.page-404 {
  height: 100vh; 
  background-color: rgba(0,0,0,0.5);
}

.page-404-panel {
  position: absolute;
//   background-repeat: no-repeat;
//   background-position: center top;
  background: url('../../assets/images/404.png') center top no-repeat;
  width: 620px;
  height: 352px;
  left: 50%;
  top: 50%;
  margin-left: -310px;
  margin-top: -176px;
  text-align: center;
  padding: 196px 0px 0px 0px;

  .meter-arrow {
    position: absolute;
    top: 85px;
    left: 50%;
    background-color: @color-accent;
    width: 27px;
    height: 27px;
    margin-left: -12px;
    border-radius: 14px;
    transform: rotate(0deg);
    animation: 0.25s linear 0s infinite alternate arrow_animate;

    &:before {
      content: '';
      position: absolute;
      bottom: 14px;
      left: 8px;
      width: 11px;
      height: 35px;
      background-color: @color-accent;
      border-radius: 5px;
    }
  }

  h1.title-1 {
    color: @color-text-primary;

    font-weight: bold;
    font-size: 72px;
  }

  h2.title-2 {
    color: @color-text-tertiary;
    font-size: 18px;
  }
}

@-webkit-keyframes arrow_animate {
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(45deg);
  }
}

@keyframes arrow_animate {
  from {
    transform: rotate(-45deg);
  }
  to {
    transform: rotate(45deg);
  }
}

</style>