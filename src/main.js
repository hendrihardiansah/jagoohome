import {web} from "./application/web.js";
import dotenv from "dotenv";

dotenv.config();

/* Server berhasil run */

const init = async () => {
    try {
        const port = process.env.PORT;
        web.listen(port, () => {
            console.log('Server is running successfully !');
        });
    } catch (error) {
        console.error(error);
    }
}

init();