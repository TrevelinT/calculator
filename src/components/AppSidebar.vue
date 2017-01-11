<template lang="html">
  <aside class="app-sidebar" :class="{ 'is-open': isMenuOpened }">
    <div class="profile">
        <span class="profile-picture"></span>
        <p class="profile-name">Danilo Trevelin</p>
        <a class="profile-email" href="#">danilo.muller.trevelin@gmail.com</a>
    </div>
    <ul class="links-list">
        <li><a class="links-item" href="#">Github</a></li>
        <li><a class="links-item" href="#">LinkedIn</a></li>
    </ul>
    <ul class="links-list">
        <li><a class="links-item" href="#">Made with Vue 2.0</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    isMenuOpened: Boolean
  }
}
</script>

<style lang="css">
/* ==========================================================================
   Sidebar
   ========================================================================== */

 .app-sidebar {
   position: absolute;
   z-index: 3;
   top: 0;
   left: -70%;
   width: 70%;
   height: 100vh;
   background-color: #f2f4f4;
   transition: left 0.5s ease-out;
 }

 .app-sidebar.is-open {
   left: 0%;
   transition: left 0.5s ease-in;
 }

 .app-sidebar.is-open + .overlay {
   position: absolute;
   z-index: 2;
   top: 0;
   left: 0;
   height: 100vh;
   width: 100vw;
   background-color: rgba(0,0,0,0.5);
 }

@media all and (min-width: 45em) {
  .app-sidebar {
    position: relative;
    left: 0;
    width: 33%;
    height: 88vh;
  }
}

/*
   Profile
   ========================================================================== */

  .profile {
    padding: 1em;
    background-color: #fbfbfb;
  }

  .profile-picture {
    display: block;
    width: 60px;
    height: 60px;
    margin-bottom: 1em;
    background-color: #ccc;
    border-radius: 50%;
  }

  .profile-name,
  .profile-email {
    margin: 0;
  }

  .profile-email {
    font-size: 0.825em;
  }

/*
   Links list
   ========================================================================== */

   .links-list {
     margin: 0 1em;
     padding: 0;
     list-style-type: none;
   }

   .links-list > li {
     display: block;
   }

   .links-list + .links-list {
     padding-top: 0.5em;
     margin-top: 0.5em;
     border-top: 1px solid  #ccc;
   }

   .links-item {
     padding: 0.5em;
     display: block;
     text-decoration: none;
     color: #666;
   }

</style>
