<template>
  <div class="container">
    <!-- Artwork detail info  -->
    <section class="artwork-detail" v-if="artwork">
      <div class="grid">
        <div class="title center">
          <h1>More details on</h1>
          <h1>{{ artwork.title }}</h1>
        </div>
        <div class="artwork">
          <img :src="artwork.image_id" :alt="artwork.title" />

          <h2>Artist</h2>
          <p v-if="artwork.artist_title">{{ artwork.artist_title }}</p>
          <p v-else>Not listed</p>

          <h2>Artwork type</h2>
          <p v-if="artwork.artwork_type_title">
            {{ artwork.artwork_type_title }}
          </p>
          <p v-else>Not listed</p>

          <h2>Style</h2>
          <p v-if="artwork.style_title">
            {{ artwork.style_title }}
          </p>
          <p v-else>Not listed</p>

          <h2>Date of creation</h2>
          <p v-if="artwork.date_display">
            {{ artwork.date_display }}
          </p>
          <p v-else>Not listed</p>

          <h2>Place of origin</h2>
          <p v-if="artwork.place_of_origin">
            {{ artwork.place_of_origin }}
          </p>
          <p v-else>Not listed</p>

          <h2>Categories</h2>
          <p v-if="artwork.category_titles">
            <span
              v-for="(category, index) in artwork.category_titles"
              :key="index"
            >
              {{ capitalizeFirstLetter(category) }}
              <span
                v-if="artwork && index != artwork.category_titles.length - 1"
                >-
              </span>
            </span>
          </p>
          <p v-else>
            Not listed
          </p>

          <h2>Materials used in creating this artwork</h2>
          <p v-if="artwork.material_titles">
            <span
              v-for="(material, index) in artwork.material_titles"
              :key="index"
            >
              {{ capitalizeFirstLetter(material) }}
              <span
                v-if="artwork && index != artwork.material_titles.length - 1"
                >-
              </span>
            </span>
          </p>
          <p v-else>
            Not listed
          </p>
        </div>
      </div>
    </section>

    <!-- Relevant artworks -->
    <section class="relevant-artworks" v-if="relevantArtworks && artwork">
      <div class="title center">
        <div class="grid">
          <h1>Artworks relevant to</h1>
          <h1>{{ artwork.title }}</h1>
        </div>
      </div>

      <div class="artworks">
        <div class="grid">
          <!-- Only show 3 artworks as the getRelevant() function returns 10 by default -->
          <div
            class="card center"
            v-for="artwork in relevantArtworks.slice(0, 3)"
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
        <h3 class="center">Loading artwork...</h3>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent } from "vue";
  import { useRoute } from "vue-router";
  import { getOne, getRelevant } from "@/service/Service";
  import store from "@/store";

  export default defineComponent({
    setup() {
      const route = useRoute();
      const artworkId = computed(() => route.params.id) as ComputedRef<string>;
      const { artwork, error, load } = getOne(parseInt(artworkId.value));

      load();

      const artworksStore = store.store;
      const relevantTerms = artworksStore.state.relevantTerms;

      const setRelevantTerms = (relevantTerms: string) => {
        artworksStore.setRelevantTerms(relevantTerms);
      };

      const {
        relevantArtworks,
        relevantArtworksError,
        relevantArtworksLoad,
      } = getRelevant(relevantTerms);

      relevantArtworksLoad();

      const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };

      return {
        artwork,
        error,
        relevantArtworks,
        relevantArtworksError,
        capitalizeFirstLetter,
        setRelevantTerms,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/global.scss";

  .grid {
    grid-template-columns: 1fr;
  }

  .title {
    .grid {
      gap: 0;
    }

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

    h1:nth-child(2) {
      font-family: $ff-accent;
    }
  }

  .title:hover h1:nth-child(2) {
    color: $clr-red-primary;
    letter-spacing: 0.2px;
  }

  .artwork-detail {
    margin-top: 4.5em;

    .artwork {
      min-width: 18em;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
      }

      h2 {
        font-family: $ff-accent;
        font-size: 1rem;
      }

      p {
        font-family: $ff-primary;
        font-size: 0.9rem;
        line-height: 0.7;
      }
    }
  }

  .relevant-artworks {
    .artworks {
      margin-top: 1em;
    }
    .card {
      margin-bottom: 1em;
    }
  }

  .error-loading {
    margin-top: 20em;
  }

  // Starting from a large mobile screen size
  @media (min-width: 425px) {
    .artwork-detail .artwork {
      img {
        max-width: 35em;
        max-height: 25em;
      }
    }
    .relevant-artworks .card {
      width: 25em;
    }
  }

  // Starting from a tablet's screen size
  @media (min-width: 768px) {
    .artwork-detail {
      .title {
        margin-top: 2em;
      }

      .artwork {
        img {
          width: 35em;
          height: 25em;
        }

        h2 {
          font-size: 1.2rem;
        }

        p {
          font-size: 1rem;
        }
      }
    }

    .relevant-artworks .card {
      width: 35em;
    }
  }

  // Starting from a laptop's screen size
  @media (min-width: 1024px) {
    .relevant-artworks .artworks {
      // margin-top: 5em;

      .grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 0;

        .card {
          margin-top: 1em;
          width: 20em;
          // height: 100%;
        }
      }
    }
  }

  // Starting from a large laptop's screen size
  @media (min-width: 1440px) {
    .relevant-artworks .artworks .grid {
      gap: 0;
      .card {
        width: 20em;
      }
    }
  }
</style>
