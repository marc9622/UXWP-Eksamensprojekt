import * as fs from "fs/promises";
const UNI_FILE = "./institution/institutions.json";

export async function getAll() {
    try {
        let institutionText = await fs.readFile(UNI_FILE, 'utf8');
        let uniList = JSON.parse(institutionText);
        console.log(uniList);
        return uniList;
    } catch (err) {
        if (err.code === "ENOENT") {
            // file does not exits
            await save([]); // create a new file with empty array
            console.log("No unis found, returning empty array");
            return []; // return empty array
        } // cannot handle this exception, so rethrow
        else throw err;
    }
}
