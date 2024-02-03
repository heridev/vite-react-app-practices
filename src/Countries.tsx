import React, { useState, useEffect } from 'react';

const BASE_URL: string = 'https://restcountries.com/v3.1';

// searching countries by capital
// path: capital / { capital }

// searching all countries
// path: /all

interface Country {
  name: {
    common: string
  }
  capital: string
}

interface CountryCardProps {
  country: Country
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <h3>{country.name.common}</h3>
  )
}

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountries = async (callbackFunc: (countries: Country[]) => void) => {
    const fetchAllUrl = `${BASE_URL}/all`;
    const fetchRequest = await fetch(fetchAllUrl);
    const fetchedData = await fetchRequest.json();
    callbackFunc(fetchedData);
  }

  useEffect(() => {
    fetchCountries(setCountries);
  }, [])

  return (
    <>
      <h1>List of Countries</h1>
      {countries.map(country => <CountryCard key={country.name.common} country={country} />)}
    </>
  )
}

export default Countries;
