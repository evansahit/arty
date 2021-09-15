<template>
  <div class="container">
    <section class="artworks-on-category" v-if="category">
      <!-- Title text -->
      <div class="title center">
        <h1>Artworks in the category of</h1>
        <h1>{{ category }}</h1>
      </div>
      <!-- Artworks based on a category -->
      <div class="artworks grid">
        <div
          class="card center"
          v-for="artwork in relevantArtworks"
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
    <section
      class="error-loading"
      v-if="relevantArtworksError || relevantArtworks.length == 0"
    >
      <div v-if="relevantArtworksError">
        <h3 class="center">
          {{ relevantArtworksError.value }}
        </h3>
      </div>

      <div v-if="!relevantArtworksError && relevantArtworks.length == 0">
        <h3 class="center">Loading artwork...</h3>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useRoute } from "vue-router";
  import { getRelevant } from "@/service/Service";
  import store from "@/store";

  export default defineComponent({
    setup() {
      const route = useRoute();
      const category = route.params.category;

      const {
        relevantArtworks,
        relevantArtworksError,
        relevantArtworksLoad,
      } = getRelevant(category);

      relevantArtworksLoad();

      const artworksStore = store.store;
      const setRelevantTerms = (relevantTerms: string) => {
        artworksStore.setRelevantTerms(relevantTerms);
      };

      return {
        relevantArtworks,
        relevantArtworksError,
        category,
        setRelevantTerms,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";
  .artworks-on-category {
    margin-top: 4.5em;

    .title {
      padding: 0.5em;
      color: $clr-white;
      background-color: $clr-red-dark;
      border-radius: 5px;
      margin-bottom: 1em;

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

    .title:hover h1:nth-child(2) {
      color: $clr-red-primary;
      letter-spacing: 0.03em;
    }

    .grid {
      grid-template-columns: 1fr;
    }

    .artworks .card {
      margin-bottom: 1em;
    }
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

    .container .artworks-on-category .grid {
      grid-template-columns: 1fr 1fr;

      .card {
        width: 22em;
      }
    }
  }

  @media (min-width: 1024px) {
    .container .artworks-on-category .artworks .card {
      width: 30em;
    }
  }
</style>
