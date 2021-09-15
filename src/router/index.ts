import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Randomizer from "@/views/Randomizer.vue";
import Artworks from "@/views/artworks/Artworks.vue";
import ArtworkDetails from "@/views/artworks/ArtworkDetails.vue";
import ArtworksOnCategory from "@/views/artworks/ArtworksOnCategory.vue";
import NotFound from "@/views/NotFound.vue";
import Categories from "@/views/Categories.vue";
import { getOne } from "@/service/Service";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Artworks",
    component: Artworks,
  },
  {
    path: "/artworks/:id",
    name: "ArtworkDetails",
    component: ArtworkDetails,
    beforeEnter: (to, from, next) => {
      const id = to.params.id.toString();

      const artwork = getOne(parseInt(id.toString()));

      if (!artwork) {
        next({ name: "NotFound" });
      } else {
        next();
      }
    },
  },
  {
    path: "/randomizer",
    name: "Randomizer",
    component: Randomizer,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/categories/:category",
    name: "ArtworksOnCategory",
    component: ArtworksOnCategory,
  },
  // catchall 404 page
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
