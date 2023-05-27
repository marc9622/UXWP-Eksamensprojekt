import { useEffect, useState } from "react";

export default function Index() {
    const [universities, setUniversities] = useState([]);
    const [clients, setClients] = useState([]);

    async function fetchUniversities() {
        console.log('fetching unilist');
        const response = await fetch('http://localhost:3001/unilist', {
            method: 'GET',
        });
        const json = await response.json();
        console.log(json.test);
        return json;
    }

    /*useEffect(() => {
        fetchUniversities().then(data => setUniversities(data));
    }, []);
    */


    async function fetchClients(){
        console.log("fetching clients");
        const response = await fetch('http://localhost:3001/clientlist', {
            method: 'GET',
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    useEffect(() => {
        fetchClients().then(data => setClients(data));
    }, []);


    return (
        <div>
            {clients.map(client =>
                <div>
                    <h1>Name: {client.name}</h1>
                    <h1>Last Name: {client.lastName}</h1>
                    <h1>ID: {client.id}</h1>
                </div>
            )}
        </div>
    );
}
