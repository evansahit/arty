<template>
  <nav>
    <div class="container">
      <div class="logo">
        <router-link :to="{ name: 'Artworks' }">arty</router-link>
      </div>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="nav-icon"></span>
      </label>
      <ul class="menu">
        <li class="center">
          <router-link :to="{ name: 'Categories' }">
            <span class="material-icons">category</span>
            <p>Category</p>
          </router-link>
        </li>
        <li class="center">
          <router-link :to="{ name: 'Artworks' }">
            <span class="material-icons">roofing</span>
            <p>Home</p>
          </router-link>
        </li>
        <li class="center">
          <router-link :to="{ name: 'Randomizer' }">
            <span class="material-icons">shuffle</span>
            <p>Randomizer</p>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Menu",
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";

  nav {
    background-color: $clr-white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;

    a {
      display: block;
      text-decoration: none;
      color: $clr-red-dark;
      transition: all 0.5s ease;
    }

    a:hover {
      color: $clr-red-primary;
      letter-spacing: 0.03em;
    }

    .logo {
      float: left;
      font-family: $ff-accent;

      a {
        font-size: 3.2rem;
      }
    }

    // The Category, Home & Randomizer items
    .menu {
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
      font-family: $ff-primary;
      clear: both;
      max-height: 0;
      transition: all 0.5s ease-out;

      span {
        display: none;
      }

      a {
        color: $clr-black;
        font-size: 1.4rem;
        padding: 0.6em 0;
        background-color: $clr-red-dark;
        color: $clr-white;
        border: 1px solid $clr-red-dark;
      }

      a:hover {
        background-color: $clr-white;
        color: $clr-black;
        border: 1px solid $clr-red-dark;
      }
    }

    // Hamburger menu
    .menu-icon {
      padding: 2em 1em;
      position: relative;
      float: right;
      cursor: pointer;
      // middle bar
      .nav-icon {
        background: $clr-black;
        display: block;
        height: 2px;
        width: 20px;
        position: relative;
        transition: all 0.5s ease-out;
      }
      // bottom bar
      .nav-icon:before {
        background: $clr-black;
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 5px;
        transition: all 0.5s ease-out;
      }
      // top bar
      .nav-icon:after {
        background: $clr-black;
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: -5px;
        transition: all 0.5s ease-out;
      }
    }

    .menu-btn {
      display: none;
    }

    // Animate the menu bar to drop down
    .menu-btn:checked ~ .menu {
      max-height: 21em;
    }

    // Hamburger animation into a "X"
    .menu-btn:checked ~ .menu-icon .nav-icon {
      background: transparent;
    }
    .menu-btn:checked ~ .menu-icon .nav-icon:before {
      transform: rotate(-45deg);
      top: 0;
    }
    .menu-btn:checked ~ .menu-icon .nav-icon:after {
      transform: rotate(45deg);
      top: 0;
    }
  }

  // Starting from tablet screen size
  @media (min-width: 768px) {
    nav {
      .logo {
        a {
          font-size: 4rem;
        }
      }

      .menu-icon {
        display: none;
      }

      .menu {
        clear: none;
        float: right;
        max-height: none;
        margin-top: 2em;

        li {
          float: left;

          a {
            padding: 0 0.5em;
            background-color: $clr-white;
            color: $clr-red-dark;
            border: none;

            p {
              opacity: 0;
              margin: 0;
              transition: opacity 0.5s ease-out;
            }

            span {
              display: inline-block;
            }
          }

          a:hover {
            border: none;
            color: $clr-red-primary;
            background-color: $clr-white;
          }

          a:hover p {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
