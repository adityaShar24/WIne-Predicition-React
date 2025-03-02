import logo from './logo.svg';
import './App.css';
import { useState } from "react";


  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function WinePredictor(){
  const [ features , setFeatures] = userState({
    fixed_acidity : "",
    volatile_acidity: "",
    citric_acid: "",
    residual_sugar: "",
    chlorides: "",
    free_sulfur_dioxide: "",
    total_sulfur_dioxide: "",
    density: "",
    pH: "",
    sulphates: "",
    alcohol: "",
  });

  const [result , setResult] = userState(null)
  const [loading , setLoading] = useState(false)

  const handleChange = (e) => {
    setFeatures({ ...features , [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    
    const response = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      method: {"Content-Type": "application/json"},
      body: JSON.stringify(features)
    })

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Wine Type Prediction</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {Object.keys(features).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            value={features[key]}
            onChange={handleChange}
            placeholder={key.replace("_", " ").toUpperCase()}
            className="p-2 border rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Wine Type"}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold">Prediction Result:</h2>
          <p className="text-md">Type: {result.prediction}</p>
          <p className="text-md">Confidence: {result.confidence}</p>
        </div>
      )}
    </div>
  );


} 


}

export default WinePredictor;