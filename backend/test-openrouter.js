import dotenv from "dotenv";
dotenv.config();

import { askAI }
from "./src/services/openRouterService.js";

const run = async () => {

  const result =
    await askAI(
      "What is React? Give short answer."
    );

  console.log(result);

};

run();