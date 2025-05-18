export interface File {
  id: string,
  filename: string;
    attributes: {
    uri: {
      url: string
    }
  }
}

export interface Image {
  id: string,
  alt: string;
  attributes: {
    uri: {
      url: string
    }
  }
}