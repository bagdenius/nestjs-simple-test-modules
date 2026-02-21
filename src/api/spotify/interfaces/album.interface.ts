export interface AlbumResponse {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: 'album';
  uri: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
  }[];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
      artists: [
        {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: 'artist';
          uri: string;
        },
      ];
      available_markets: string[];
      disc_number: 0;
      duration_ms: 0;
      explicit: false;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable: false;
      linked_from: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      restrictions: {
        reason: string;
      };
      name: string;
      preview_url: string;
      track_number: 0;
      type: string;
      uri: string;
      is_local: false;
    }[];
  };
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: [];
  label: string;
  popularity: 0;
}
