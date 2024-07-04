import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #00c6ff, #0072ff);
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  margin-bottom: 1rem;
  width: 300px;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;

`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #0072ff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Span = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: #0072ff;
`;


const Front = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <Container>
      <Title>Diabetes Prediction</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          name="Pregnancies"
          placeholder="Pregnancies"
          value={formData.Pregnancies}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Glucose"
          placeholder="Glucose"
          value={formData.Glucose}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="BloodPressure"
          placeholder="Blood Pressure"
          value={formData.BloodPressure}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="SkinThickness"
          placeholder="Skin Thickness"
          value={formData.SkinThickness}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Insulin"
          placeholder="Insulin"
          value={formData.Insulin}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="BMI"
          placeholder="BMI"
          value={formData.BMI}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="DiabetesPedigreeFunction"
          placeholder="Diabetes Pedigree Function"
          value={formData.DiabetesPedigreeFunction}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Age"
          placeholder="Age"
          value={formData.Age}
          onChange={handleChange}
        />
        <Button type="submit">Predict</Button>
      </Form>
      {result && (
        <Result>
          <h2>Prediction Result</h2>
          <Span>{result.prediction}</Span>
        </Result>
      )}
    </Container>
  );
};

export default Front;
