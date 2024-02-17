import { ObjectId } from "mongodb"

export type Apartement = {
    _id:ObjectId;
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