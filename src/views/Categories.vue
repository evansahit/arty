<template>
  <div class="container">
    <section class="artwork-categories">
      <!-- Title text -->
      <div class="title center">
        <h1>Browse artworks by their</h1>
        <h1>categories</h1>
      </div>
      <!-- The categories -->
      <div class="categories grid">
        <div
          class="category center"
          v-for="(category, index) in categories"
          :key="index"
        >
          <router-link
            :to="{ name: 'ArtworksOnCategory', params: { category: category } }"
          >
            <h2>{{ category }}</h2>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Categories",
    setup() {
      const categories: string[] = [
        "Paintings",
        "Prints and Drawings",
        "Porcelain",
        "Textiles",
        "Ceramic",
        "Sculptures",
        "Installations",
      ];

      return { categories };
    },
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";

  .container .artwork-categories .title {
    background-color: $clr-red-dark;
    color: $clr-white;
    padding: 0.5em;
    border-radius: 5px;
    margin-top: 4.5em;

    h1 {
      font-family: $ff-primary;
      font-weight: lighter;
      font-size: 1.5rem;
      margin: 0;
      transition: all 0.5s ease;
    }

    h1:nth-child(2) {
      font-family: $ff-accent;
    }
  }

  .container .artwork-categories {
    .title:hover h1:nth-child(2) {
      color: $clr-red-primary;
      letter-spacing: 0.03em;
    }

    .grid {
      grid-template-columns: 1fr;
    }

    .categories {
      margin-top: 1em;

      .category {
        margin: 0 1em;
        border: 2px solid $clr-red-dark;
        color: $clr-white;
        border-radius: 5px;
        cursor: pointer;

        transition: all 0.5s ease;

        a {
          text-decoration: none;

          h2 {
            font-family: $ff-primary;
            font-weight: lighter;
            font-size: 1.5rem;
            color: $clr-black;

            transition: all 0.5s ease;
          }
        }
      }

      .category:hover {
        background-color: $clr-white;
        box-shadow: 10px 7px $clr-black;
        transform: translateY(-0.3em);

        h2 {
          color: $clr-red-dark;
          letter-spacing: 0.03em;
        }
      }

      .category:active {
        transform: translateY(0);
      }

      .category:last-child {
        margin-bottom: 1em;
      }
    }
  }

  // Starting from a large mobile screen size
  @media (min-width: 425px) {
    .container .artwork-categories .categories .category {
      width: 23.4583125em;
      margin: 0 auto;
    }
  }

  // Starting from a tablet's screen size
  @media (min-width: 768px) {
    .container .artwork-categories .title {
      margin-top: 6em;
    }
  }
</style>
