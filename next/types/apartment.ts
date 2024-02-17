import { ObjectId } from "mongodb"

export type Apartment = {
    _id:ObjectId;
    apartmentArea:number;
    bathrooms:number;
    bedrooms:number;
    location:ApartmentLocation
    price:number
}

type ApartmentLocation = {
    longitude:number,
    latitude:number,
    area:string,
    city:string,
}