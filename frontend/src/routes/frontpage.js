import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FrontPage() {
    const [universities, setUniversities] = useState([]);

    async function fetchUniversities() {
        return await fetch('http://localhost:3001/unilist', {method: 'GET'}).then(res => res.json());
    }

    useEffect(() => {fetchUniversities().then(data => setUniversities(data))}, []);

    return (
        <div>
            <h1>Universities</h1>
            {universities.map(uni =>
                <div>
                    <Link to={'/uni/' + uni.id}>{uni.name}</Link>
                </div>
            )}
        </div>
    );
}
