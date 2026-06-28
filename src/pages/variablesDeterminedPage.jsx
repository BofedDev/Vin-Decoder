import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

const VariablesDeterminedPage = () => {
    const { variableId } = useParams();
    const [variable, setVariable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`)
            .then(res => {
                if (!res.ok) throw new Error('Мережева помилка');
                return res.json();
            })
            .then(data => {
                const found = data.Results.find(item => item.ID === Number(variableId));
                setVariable(found);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [variableId]);

    if (loading) return <p>Завантаження...</p>
    if (error) return <p>Помилка завантаження</p>
    if (!variable) return <p>Змінну не знайдено</p>

    return (
        <article>
            <h1>{variable.Name}</h1>
            {variable.GroupName && <p>Група: {variable.GroupName}</p>}
            {variable.Description && (
                <p>{variable.Description.replace(/<[^>]+>/g, '')}</p>
            )}
        </article>
    )
}

export default VariablesDeterminedPage