import {useState, useEffect} from 'react'
const Form = () => {
    const [vin, setVin] = useState("")
    const [error, setError] = useState("")
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('history')
        return saved ? JSON.parse(saved) : []
    })
    const [result, setResult] = useState(null);
    const validate = (value) => {
        if (!value) return "Поле не може бути порожнім"

        const normalized = value.toString().trim().toUpperCase();

        if (normalized.length > 17) return "Максимум 17 символів"
        if (normalized.length < 17) return "Поле має містити 17 символів"

        if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(normalized))
            return "Недопустимі символи (дозволені тільки A-H, J-N, P, R-Z та цифри)"

        return ""
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const err = validate(vin)
        if(err){
            setError(err)
            return
        }
        setError("");
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
            .then(res => res.json())
            .then(data => {setResult(data)
                setHistory(prev => {
                const newHistory = [vin, ...prev];
                return newHistory.slice(0, 3);
            })
                setVin("")

            })
            .catch(err => {
                console.error(err);
                setError("Помилка при запиті до API");
            });

    }

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history])
    const handleHistoryClick = (item) => {
        setVin(item)
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${item}?format=json`)
            .then(res => res.json())
            .then(data => {setResult(data)})
            .catch(() => setError("Помилка при запиті до API"))
    }

    const renderHistory = (history) => {
        if (history.length === 0) return null;

        return (
            <div className="history-container">
                <h3>Історія запитів</h3>

                {history.map((item, index) =>
                    <button key={index} onClick={() => handleHistoryClick(item)}>
                        {item}
                    </button>
                )}
            </div>
        )
    }

    return (
        
        <div className="container">
            <form onSubmit={handleSubmit} >
                <label>
                    Vin-номер:
                    <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        maxLength={17}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </label>
                <button >Перевірити</button>

            </form>
            {renderHistory(history)}
            {result && (
                <section>
                    <h3>Результат декодування</h3>
                    <ul>
                        {result.Results
                            .filter(item => item.Value && item.Value !== "Not Applicable")
                            .map(item => (
                                <li key={item.VariableId}>
                                    <span>{item.Variable}</span>
                                    <span>{item.Value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            )}


        </div>
    )


}


export default Form