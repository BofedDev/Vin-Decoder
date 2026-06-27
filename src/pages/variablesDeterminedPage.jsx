import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";


const VariablesDeterminedPage = () => {
    const {variableId} = useParams();
    const [variable, setVariable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`)
            .then(res => {
                if (!res.ok) throw new Error('Сетевая ошибка');
                return res.json();
            })
            .then(data => {
                const found = data.Results.find(item => item.ID === Number(variableId));
                setVariable(found);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
                return(<p>Error getting variable</p>);
            });

    }, [variableId]);

    const renderVariable = () => {
        if (!variable) return null;
        const keys = Object.keys(variable);
        return keys.map(key => (
            <p key={key}>{key}: {variable[key]}</p>
        ))
    }




    return (
        <div>

            {loading ? (
                <p >Variable: {variableId} is loading</p>
                ):
                (<div>{renderVariable()}</div>)
            }
            {error && <p>Помилка завантаження</p>}
        </div>
    )




}

export default VariablesDeterminedPage