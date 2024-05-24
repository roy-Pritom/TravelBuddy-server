import { Server } from "http";
import app from "./app";
import config from "./app/config";



async function main() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const server: Server = app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    })
}
main();