<template>
  <div class="container">
    <!-- Title text -->
    <section class="title">
      <div class="title-text center">
        <h1>Explore different art from the</h1>
        <a href="https://www.artic.edu/">Art Institute of Chicago</a>
      </div>
    </section>

    <!-- Artworks -->
    <section class="artworks ">
      <!-- Sorting select input -->
      <div class="sorting-select center">
        <label for="sort">Sort by</label>
        <select v-model="currentSortTerm" name="sort">
          <option
            v-for="term in sortTerms"
            :key="term.value"
            :value="term.value"
          >
            {{ term.displayText }}
          </option>
        </select>
      </div>
      <!-- Artworks cards -->
      <div class="grid">
        <div
          class="card center"
          v-for="artwork in sortedArtworks"
          :key="artwork.id"
        >
          <router-link
            :to="{
              name: 'ArtworkDetails',
              params: { id: artwork.id },
            }"
            @click="
              setRelevantTerms(
                artwork.category_titles +
                  ',' +
                  artwork.material_titles +
                  ',' +
                  artwork.style_title
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
      </div>
    </section>

    <!-- Error and loading -->
    <section class="error-loading" v-if="error || sortedArtworks.length == 0">
      <div v-if="error">
        <h3 class="center">
          {{ error.value }}
        </h3>
      </div>

      <div v-if="!error && sortedArtworks.length == 0">
        <h3 class="center">Loading artworks...</h3>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import Artwork from "@/types/Artwork";
  import SortTerm from "@/types/SortTerm";
  import { getAll } from "@/service/Service";
  import store from "@/store";

  export default defineComponent({
    setup() {
      const artworksStore = store.store;
      const setRelevantTerms = (relevantTerms: string) => {
        artworksStore.setRelevantTerms(relevantTerms);
      };
      const { artworks, error, load } = getAll();

      load();

      // Sorting terms for the select input
      const sortTerms = ref([
        {
          displayText: "Title",
          value: "title",
        },
        {
          displayText: "Date",
          value: "date_display",
        },
        {
          displayText: "Artist name",
          value: "artist_title",
        },
      ]);

      const currentSortTerm = ref<SortTerm>("title");

      // Sort the artworks based on the current sort term
      const sortedArtworks = computed(() => {
        return artworks.value.slice().sort((a: Artwork, b: Artwork) => {
          return a[currentSortTerm.value] > b[currentSortTerm.value] ? 1 : -1;
        });
      });

      return {
        sortedArtworks,
        error,
        sortTerms,
        currentSortTerm,
        setRelevantTerms,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";

  .title {
    margin-top: 4.5em;
    padding: 0.5em;
    color: $clr-white;
    background-color: $clr-red-dark;
    border-radius: 5px;

    h1 {
      font-family: $ff-primary;
      font-weight: lighter;
      font-size: 1.5rem;
      margin: 0;
    }

    a {
      text-decoration: none;
      font-size: 1.5rem;
      font-family: $ff-accent;
      color: $clr-white;
      transition: all 0.5s ease;
    }
  }

  .title:hover a {
    color: $clr-red-primary;
    letter-spacing: 0.03em;
  }

  .artworks .sorting-select {
    font-family: "Open Sans", sans-serif;
    font-size: 1.3rem;
    margin: 2em 0 1em 0;

    label {
      margin-right: 0.4em;
    }

    select {
      cursor: pointer;
      font-family: "Open Sans", sans-serif;
      font-size: 1.3rem;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid #89023e;
      padding: 0.1em;
      background-color: #f4f2f3;
      border-width: 2px;

      transition: all 0.5s;
    }

    select:hover {
      color: #89023e;
    }

    select:focus {
      outline: none;
    }
  }

  .container {
    overflow: hidden;
    padding-top: 1em;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  // Starting from a large mobile screen size
  @media (min-width: 425px) {
    .artworks .grid .card {
      width: 25em;
    }
  }

  // Starting from a tablet's screen size
  @media (min-width: 768px) {
    .title {
      margin-top: 6em;

      a {
        transition: all 0.5s ease;
      }

      a:hover {
        letter-spacing: 0.03em;
      }
    }

    .artworks .grid {
      grid-template-columns: 1fr 1fr;
      padding-bottom: 1em;
      gap: 0.8em;

      .card {
        width: 22em;

        .card-content {
          img {
            width: 100%;
            height: 400px;
          }

          h2 {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  // Starting from a laptop's screen size
  @media (min-width: 1024px) {
    .artworks {
      .grid {
        gap: 1em;
        .card {
          width: 30em;
        }
      }
    }
  }
</style>
