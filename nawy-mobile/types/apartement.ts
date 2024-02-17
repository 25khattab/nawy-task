export type Apartement = {
    _id:string;
    apartementArea:number;
    bathrooms:number;
    bedrooms:number;
    location:ApartemntLocation
    price:number
}

type ApartemntLocation = {
    longitude:number,
    latitude:number,
    area:string,
    city:string,
}