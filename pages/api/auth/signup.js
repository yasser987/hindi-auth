import connectMongoose from "../../../database/connect";
import Users from "../../../model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  try {
    await connectMongoose(); // Wait for the database connection to complete

    //only post method which accepted
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ message: "You don't have data" });
      } else if (req.body) {
        const { username, email, password } = req.body;

        //check existing user

        // [1]
        // const checkExisting=await Users.findOne({ email }); // => "error": "Connection to the database failed"

        // [2]
        const checkExisting = Users.findOne({ email }); //  => "message": "checkExisting is user.findOne({ email: 'eng.yasserelbana2001@gmail.com' })"
        return res
          .status(201)
          .json({ message: `checkExisting is ${checkExisting}` });

        //
        //
        //the following logic has no response in the postman
        //if (checkExisting) {
        //  return res.status(201).json({ message: "User Already Exists!" });
        //} else if (!checkExisting) {
        //  //Users.create({ username, email, password }, function (error, data) {
        //  //  if (error) return res.status(404).json({ error });
        //  //  res.status(201).json({ status: true, user: data });
        //  //});
        //  return res.status(201).json({ message: "yees" });
        //}
      }
    } else {
      res
        .status(500)
        .json({ message: "HTTP method not valid, only POST accepted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Connection to the database failed" });
  }
}
