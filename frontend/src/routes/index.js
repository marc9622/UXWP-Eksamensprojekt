import { useEffect, useState } from "react";

export default function Index() {
    const [universities, setUniversities] = useState([]);

    async function fetchUniversities() {
        console.log('fetching universities');
        const response = await fetch('http://localhost:3001/universities', {
            method: 'GET',
        });
        const json = await response.json();
        console.log(json.test);
        return json;
    }

    useEffect(() => {
        fetchUniversities().then(data => setUniversities(data));
    }, []);

    return (
        <div>
            {universities.map(uni =>
                <div>
                    <h1>{uni.name}</h1>
                </div>
            )}
        </div>
    );
}
