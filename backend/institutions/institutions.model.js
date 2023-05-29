import * as fs from "fs/promises";
const UNI_FILE = "./institutions/institutions.json";

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

// save array of users to file
async function save(uni = []) {
    let uniText = JSON.stringify(uni);
    await fs.writeFile(UNI_FILE, uniText);
}

export function setRoutings(router) {

    router.get('/unis-list', async (request, response) => {
        try {
            const uniList = await getAll();
            response.setHeader('Content-Type', 'application/json');
            console.log(uniList);
            response.json(uniList);
        } catch (err) {
            // Handle any errors
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.post('/uni/add', async (request, response) => {
        try {
            const uni = request.body;
            const createdUni = await add(uni);
            console.log(createdUni);
            response.status(201).json(createdUni);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/unis/:id', async (request, response) => {
        try {
            const uni = await getByID(request.params.id);
            response.setHeader('Content-Type', 'application/json');
            console.log(uni);
            response.json(uni);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });

}
