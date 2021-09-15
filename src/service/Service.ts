/* eslint-disable */
import Artwork from "@/types/Artwork";
import axios from "axios";
import { ref } from "vue";

const imageAPIUrl: string = "https://www.artic.edu/iiif/2/";
const imageFormats: string = "/full/843,/0/default.jpg";

// Function to get 10 artworks with the search term 'Essential' to show on the home page
// Also sets limit to 15 incase of artwork objects with no image_id
export const getAll = () => {
  const url: string =
    "https://api.artic.edu/api/v1/artworks/search?q=Essentials&fields=id,title,artist_title,date_display,place_of_origin,dimensions,category_titles,artwork_type_title,style_title,material_titles,image_id&page=1&limit=15";
  const max = 10;
  const artworks = ref<Artwork[]>([]);
  const error = ref();

  // a seperate load function which will handle the actual request
  const load = async () => {
    try {
      const response = await axios.get(url);
      const responseArtworks = response.data.data;

      // loop through the response and push artwork objects that have an image_id in the artworks array
      responseArtworks.forEach((artwork: Artwork) => {
        // only add 10 artwork objects to display on the home screen
        while (artworks.value.length < max) {
          if (artwork.image_id) {
            artworks.value.push({
              id: artwork.id,
              title: artwork.title,
              artist_title: artwork.artist_title,
              date_display: artwork.date_display,
              place_of_origin: artwork.place_of_origin,
              dimensions: artwork.dimensions,
              category_titles: artwork.category_titles,
              artwork_type_title: artwork.artwork_type_title,
              style_title: artwork.style_title,
              material_titles: artwork.material_titles,
              // modify the image_id so that it adheres to the IIIF Image API structure
              image_id: imageAPIUrl + artwork.image_id + imageFormats,
            });
          }
          break;
        }
      });
    } catch (errors) {
      error.value = errors;
      console.log(error.value);
    }
  };

  return { artworks, error, load };
};

// Function to get a single artwork by its ID
export const getOne = (id: number) => {
  const url: string = `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_title,date_display,place_of_origin,dimensions,category_titles,artwork_type_title,style_title,material_titles,image_id`;
  const artwork = ref<Artwork>();
  const error = ref();

  // a seperate load function which will handle the actual request
  const load = async () => {
    try {
      const response = await axios.get(url);
      const reponseArtwork = response.data.data;

      artwork.value = {
        id: reponseArtwork.id,
        title: reponseArtwork.title,
        artist_title: reponseArtwork.artist_title,
        date_display: reponseArtwork.date_display,
        place_of_origin: reponseArtwork.place_of_origin,
        dimensions: reponseArtwork.dimensions,
        category_titles: reponseArtwork.category_titles,
        artwork_type_title: reponseArtwork.artwork_type_title,
        style_title: reponseArtwork.style_title,
        material_titles: reponseArtwork.material_titles,
        // modify the image_id so that it adheres to the IIIF Image API structure
        image_id: imageAPIUrl + reponseArtwork.image_id + imageFormats,
      };
    } catch (errors) {
      error.value = errors;
      console.log(error.value);
    }
  };

  return { artwork, error, load };
};

// Function to get artworks relevant to the passed in search terms
// this function will be used for the categories component along with the artworks details component which will show 3 relevant artworks
export const getRelevant = (relevantTerms: string | string[]) => {
  const url: string = `https://api.artic.edu/api/v1/artworks/search?q=${relevantTerms}&fields=id,title,artist_title,date_display,place_of_origin,dimensions,category_titles,artwork_type_title,style_title,material_titles,image_id&page=1&limit=15`;
  const relevantArtworks = ref<Artwork[]>([]);
  const relevantArtworksError = ref();
  const max = 10;

  // a seperate load function which will handle the actual request
  const relevantArtworksLoad = async () => {
    try {
      const response = await axios.get(url);
      const responseArtworks = response.data.data;

      // loop through the reponse and push each artwork object that has an image_id in the artworks array
      responseArtworks.forEach((artwork: Artwork) => {
        // only add 10 artwork objects to be displayed on the categories component
        // in the artwork details component 3 artworks will be taken from the array
        while (relevantArtworks.value.length < max) {
          if (artwork.image_id) {
            relevantArtworks.value.push({
              id: artwork.id,
              title: artwork.title,
              artist_title: artwork.artist_title,
              date_display: artwork.date_display,
              place_of_origin: artwork.place_of_origin,
              dimensions: artwork.dimensions,
              category_titles: artwork.category_titles,
              artwork_type_title: artwork.artwork_type_title,
              style_title: artwork.style_title,
              material_titles: artwork.material_titles,
              // modify the image_id so that it adheres to the IIIF Image API structure
              image_id: imageAPIUrl + artwork.image_id + imageFormats,
            });
          }
          break;
        }
      });
    } catch (errors) {
      relevantArtworksError.value = errors;
      console.log(relevantArtworksError);
    }
  };

  return { relevantArtworks, relevantArtworksError, relevantArtworksLoad };
};

// Function to get a random artwork
// This will return 100 artworks that are considered 'Essentials'. Then a random one of these will be returned.
export const getRandom = () => {
  const randomArtworks = ref<Artwork[]>([]);
  const artwork = ref<Artwork>();
  const error = ref();
  const url = `https://api.artic.edu/api/v1/artworks/search?q=Essentials&fields=id,title,artist_title,date_display,place_of_origin,dimensions,category_titles,artwork_type_title,style_title,material_titles,image_id&page=1&limit=100`;
  const artworksMax = 100;
  // 99 being the index of the 100th element in the randomArtworks array
  const randomMax = 99;
  const min = 0;

  // generates a random number between 0 and 99
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * (randomMax - min + 1) + min);
  };

  // a seperate load function which will handle the actual request
  const load = async () => {
    try {
      const response = await axios.get(url);
      const responseArtworks = response.data.data;
      const randomNumber = generateRandomNumber();

      // loop through the response and push it into the randomArtworks array
      responseArtworks.forEach((artwork: Artwork) => {
        while (randomArtworks.value.length < artworksMax) {
          if (artwork.image_id) {
            randomArtworks.value.push({
              id: artwork.id,
              title: artwork.title,
              artist_title: artwork.artist_title,
              date_display: artwork.date_display,
              place_of_origin: artwork.place_of_origin,
              dimensions: artwork.dimensions,
              category_titles: artwork.category_titles,
              artwork_type_title: artwork.artwork_type_title,
              style_title: artwork.style_title,
              material_titles: artwork.material_titles,
              // modify the image_id so that it adheres to the IIIF Image API structure
              image_id: imageAPIUrl + artwork.image_id + imageFormats,
            });
          }
          break;
        }
      });

      artwork.value = randomArtworks.value[randomNumber];
    } catch (errors) {
      error.value = error;
      console.log(error.value);
    }
  };

  return { artwork, error, load };
};
