import { Mongo } from "meteor/mongo";
import * as Schemas from "./schemas";

export const AllReviews = new Mongo.Collection("AllReviews");
AllReviews.attachSchema(Schemas.AllReviews);
