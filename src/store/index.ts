// A store to persist relevant terms across components in order to display relevant artworks in the ArtworkDetails component
/* eslint-disable */
import { reactive } from "vue";

const store = {
  state: reactive({
    relevantTerms: [],
  }),

  setRelevantTerms(relevantTerms: any) {
    this.state.relevantTerms = relevantTerms;
  },
};

export default {
  store,
};
