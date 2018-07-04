import { Mongo } from "meteor/mongo";
import * as Schemas from "./schemas";

export const OrdersCanceled = new Mongo.Collection("OrdersCanceled");
OrdersCanceled.attachSchema(Schemas.OrdersCanceled);
