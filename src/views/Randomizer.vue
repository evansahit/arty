<template>
  <div class="container">
    <!-- Title text -->
    <section class="title center">
      <h1>Random selection of artwork from the</h1>
      <a href="https://www.artic.edu/">Art Institute of Chicago</a>
    </section>
    <!-- The random artwork -->
    <section class="artwork grid" v-if="artwork">
      <div class="card center">
        <router-link
          :to="{
            name: 'ArtworkDetails',
            params: { id: artwork.id },
          }"
          @click="
            setRelevantTerms(
              artwork?.category_titles +
                ',' +
                artwork?.material_titles +
                ',' +
                artwork?.style_title
            )
          "
        >
          <div class="card-content">
            <img :src="artwork.image_id" :alt="artwork.title" />
            <h2>{{ artwork.title }}</h2>
            <p>{{ artwork.artist_title }}</p>
            <p>{{ artwork.date_display }}</p>
            <p>{{ artwork.place_of_origin }}</p>
            <p>{{ artwork.dimensions }}</p>
          </div>
        </router-link>
      </div>

      <div class="random-button center">
        <button @click="load()">Another random artwork</button>
      </div>
    </section>

    <!-- Error and loading -->
    <section class="error-loading" v-if="error || !artwork">
      <div v-if="error">
        <h3 class="center">
          {{ error.value }}
        </h3>
      </div>

      <div v-if="!error && !artwork">
        <h3 class="center">Loading artworks...</h3>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { getRandom } from "@/service/Service";
  import store from "@/store";

  export default defineComponent({
    name: "Randomizer",
    setup() {
      const { artwork, error, load } = getRandom();

      load();

      const artworksStore = store.store;
      const setRelevantTerms = (relevantTerms: string) => {
        artworksStore.setRelevantTerms(relevantTerms);
      };

      return {
        setRelevantTerms,
        artwork,
        error,
        load,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";

  .title {
    margin-top: 4em;
    padding: 0.5em;
    color: $clr-white;
    background-color: $clr-red-dark;
    border-radius: 5px;

    h1 {
      font-family: $ff-primary;
      font-weight: lighter;
      font-size: 1.5rem;
      margin: 0;

      transition: all 0.5s ease;
    }

    a {
      text-decoration: none;
      font-family: $ff-accent;
      color: $clr-white;
      font-size: 1.5rem;

      transition: all 0.5s ease;
    }
  }

  .title:hover a {
    color: $clr-red-primary;
    letter-spacing: 0.03em;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .artwork {
    margin: 1em 0;
  }

  .random-button button {
    padding: 1em;
    background-color: $clr-red-dark;
    color: $clr-white;
    font-family: $ff-primary;
    font-size: 1.2rem;
    border: 2px solid $clr-red-dark;
    border-radius: 5px;
    cursor: pointer;

    transition: all 0.5s ease;
  }

  .random-button button:hover {
    background-color: $clr-white;
    border-color: $clr-red-dark;
    color: $clr-black;
    box-shadow: 10px 7px $clr-black;
    transform: translateY(-0.3em);
  }

  .random-button button:active {
    transform: translateY(0);
  }

  // Starting from a large mobile screen size
  @media (min-width: 425px) {
    .card {
      width: 25em;
    }
  }

  // Starting from a tablet's screen size
  @media (min-width: 768px) {
    .title {
      margin-top: 5.5em;
    }

    .card {
      width: 35em;
    }
  }
</style>
