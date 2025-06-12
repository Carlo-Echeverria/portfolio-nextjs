export interface File {
  id: string,
  filename: string;
  attributes: {
    langcode: string,
    uri: {
      url: string
    }
  }
}

export interface Image {
  id: string,
  alt: string;
  attributes: {
    langcode: string,
    uri: {
      url: string
    }
  }
}