interface Artwork {
  id: number; //In API: id
  title: string; //In API: title
  artist_title: string; //In API: artist_title
  date_display: string; //In API: date_display
  place_of_origin: string; //In API: place_of_origin
  dimensions: string; //In API: dimensions
  category_titles: string[]; //In API: category_titles
  artwork_type_title: string; //In API: artwork_type_title
  style_title: string; //In API: style_title
  material_titles: string[]; //In API: material_titles
  image_id: string; //In API: image_id
}

export default Artwork;
