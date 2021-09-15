<template>
  <footer>
    <div class="container grid">
      <div class="links">
        <ul class="grid center">
          <li>
            <router-link :to="{ name: 'Artworks' }">HOME</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Categories' }">CATEGORIES</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Randomizer' }">RANDOMIZER</router-link>
          </li>
        </ul>
      </div>
      <div class="copyright center">
        <p>&copy; 2021 Arty</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({});
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";

  footer {
    background-color: $clr-red-dark;
    font-family: $ff-primary;
    color: $clr-white;
    margin-top: 1em;

    .grid {
      grid-template-columns: 1fr;
      gap: 0;
      padding: 0 10em;
    }

    .links .grid {
      grid-template-columns: 1fr;
      list-style: none;

      li {
        padding: 0.2em 0;
        transition: all 0.5s ease;

        a {
          text-decoration: none;
          color: $clr-white;
          font-size: 1.2rem;
          transition: all 0.5s ease;
        }

        a:hover {
          color: $clr-red-primary;
          letter-spacing: 0.03em;
        }
      }
    }

    .copyright {
      font-family: $ff-accent;
      font-size: 0.9rem;
    }
  }

  // Starting from a large mobile screen size
  @media (min-width: 425px) {
    footer .container .grid {
      grid-template-columns: repeat(3, 1fr);

      li {
        padding: 0 0.7em;
      }
    }
  }

  // Starting from a tablet's screen size
  @media (min-width: 768px) {
    footer .grid {
      padding: 0;
    }
  }
</style>
