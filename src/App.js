import React, { useState } from 'react';

// Array of calculator types
const typeofCalc = [
  { id: 987, name: "Age" },
  { id: 986, name: "Discount" },
  { id: 985, name: "BMI" },
];

// Reusable Button component
function Button({ children, onClick, type = "button" }) {
  return (
    <button className='button' onClick={onClick} type={type}>
      {children}
    </button>
  );
}

// Main App component
export default function App() {
  const [showCalculator, setShowCalculator] = useState(null);

  const toggleCalculator = (name) => {
    setShowCalculator(showCalculator === name ? null : name);
  };

  return (
    <div className='app'>
      <header>
        <h1>Calculator</h1>
      </header>

      <div className='sidebar'>
        <ListofCalc typeofCalc={typeofCalc} toggleCalculator={toggleCalculator} />
      </div>

      {showCalculator === "Age" && <Age />}
      {showCalculator === "Discount" && <Discount />}
      {showCalculator === "BMI" && <BMI />}
    </div>
  );
}

// Component to list all calculator types
function ListofCalc({ typeofCalc, toggleCalculator }) {
  return (
    <ul>
      {typeofCalc.map((type) => (
        <Type type={type} key={type.id} toggleCalculator={toggleCalculator} />
      ))}
    </ul>
  );
}

// Component to display each calculator type
function Type({ type, toggleCalculator }) {
  return (
    <li>
      <Button onClick={() => toggleCalculator(type.name)}>{type.name}</Button>
    </li>
  );
}

// Age Calculator component
function Age() {
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [age, setAge] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (birthDate && currentDate) {
      const birth = new Date(birthDate);
      const today = new Date(currentDate);

      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
      }
      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }
      setAge({ years, months, days });
    }
  }

  return (
    <div>
      <h3>Age Calculator</h3>
      <form onSubmit={handleSubmit}>
        <label>Date of birth: </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label>Today: </label>
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
        <Button type="submit">Calculate Age</Button>
      </form>

      {age && (
        <output>
          <p>Age: {age.years} years, {age.months} months, and {age.days} days</p>
        </output>
      )}
    </div>
  );
}

// BMI Calculator component
function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  function handleBMICalculate() {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);

      if (calculatedBMI < 18.5) {
        setCategory("Underweight");
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
        setCategory("Normal");
      } else {
        setCategory("Overweight");
      }
    }
  }

  return (
    <div>
      <h3>BMI Calculator</h3>
      <label>Weight (kg): </label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Enter weight in kg"
      />
      <br />
      <label>Height (cm): </label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Enter height in cm"
      />
      <br />
      <Button onClick={handleBMICalculate}>Calculate BMI</Button>
      {bmi && (
        <output>
          <p>Your BMI: {bmi}</p>
          <p>{category}</p>
        </output>
      )}
    </div>
  );
}

// Discount Calculator component
function Discount() {
  const [billAmount, setBillAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);

  function handleDiscountCalculate() {
    if (billAmount && discountPercentage) {
      const discountAmount = (billAmount * discountPercentage) / 100;
      const finalPrice = billAmount - discountAmount;
      setDiscountedPrice(finalPrice.toFixed(2));
    }
  }

  return (
    <div>
      <h3>Discount Calculator</h3>
      <label>Bill Amount: </label>
      <input
        type="number"
        value={billAmount}
        onChange={(e) => setBillAmount(e.target.value)}
        placeholder="Enter bill amount"
      />
      <br />
      <label>Discount Percentage: </label>
      <input
        type="number"
        value={discountPercentage}
        onChange={(e) => setDiscountPercentage(e.target.value)}
        placeholder="Enter discount percentage"
      />
      <br />
      <Button onClick={handleDiscountCalculate}>Calculate Discount</Button>
      {discountedPrice && (
        <output>
          <p>Final Price: ₹{discountedPrice}</p>
        </output>
      )}
    </div>
  );
}
