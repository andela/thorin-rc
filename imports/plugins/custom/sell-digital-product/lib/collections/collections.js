import { Mongo } from "meteor/mongo";
import { DigitalProduct } from "./digital-products";

export const DigitalProducts = new Mongo.Collection("DigitalProducts");

DigitalProducts.attachSchema(DigitalProduct);
