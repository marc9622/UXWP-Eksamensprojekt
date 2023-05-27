import { useEffect, useState } from "react";

export default function Index() {
    const [uniList, setUniList] = useState([]);

    async function fetchUniList() {
        const response = await fetch('http://localhost:3001/unilist', {
            method: 'GET',
        });
        const json = await response.json();
        console.log(json);
        return json;
    }

    useEffect(() => {
        fetchUniList().then(data => setUniList(data));
    }, []);

    return (
        <div>
            <h1>Front Page</h1>
        </div>
    );
}
