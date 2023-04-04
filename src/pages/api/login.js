import { db } from "@/utils/createDb";
import lodash from "lodash";

export default async function handler(req, res) {
  const { username, password } = await req.body;

  try {
    db.chain = lodash.chain(db.data);

    const user = db.chain
      .get("users")
      .find({ username: username, password: password })
      .value();

      res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
