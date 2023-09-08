interface IFeature {
  [key: string]: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  images: string[];
  sizes: string[];
  categories: string[];
  colors: string[];
  description: string[];
  features: IFeature[];
  mainFeatures: IFeature[];
  otherFeatures: IFeature[];
}
