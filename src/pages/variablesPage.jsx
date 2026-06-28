import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const VariablesPage = () => {
    const navigate = useNavigate();
    const [variables, setVariables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json')
            .then(res => res.json())
            .then(data => {
                setVariables(data.Results || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Помилка при завантаженні");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Завантаження...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Змінні ({variables.length})</h1>
            <ol>
                {variables.map((item) => (
                    <li key={item.ID}>
                        <button onClick={() => navigate(`/variables/${item.ID}`)}>
                            <strong>{item.Name}</strong>
                            {item.Description && (
                                <p>{item.Description.replace(/<[^>]+>/g, '')}</p>
                            )}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default VariablesPage;