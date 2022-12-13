<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/" class="titleApp">ECO EasyMarket</RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/market">Market</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.titleApp {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  margin-left: 0.8rem;
}
nav {
 /* Place the navigation at the top of the page */
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5rem 0.5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
   
    font-size: 1rem;

    
    margin-top: 1rem;
  }
}
</style>
