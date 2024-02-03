import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';

// searching all countries
// path: /all

// searching countries by capital
// path: capital / { capital }

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

const BASE_URL: string = 'https://restcountries.com/v3.1';
const FILTERABLE_CAPITALS = [
  'All',
  'Tallin',
  'Helsinki',
  'Stockholm',
  'Oslo',
  'Copenhagen',
  'Reykjavik',
] as const;

type Capital = (typeof FILTERABLE_CAPITALS)[number];

const CountriesWithRequestInsideUseEffect = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCapital, setSelectedCapital] = useState<Capital>(FILTERABLE_CAPITALS[0]);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    if (!event.target.value) return;

    setSelectedCapital(event.target.value as Capital);
  }

  const renderCapitalSelectOptions = () => (
    <Select
      value={selectedCapital}
      onChange={handleSelectChange}
      labelId="capitals">
      {FILTERABLE_CAPITALS.map((capital) => <MenuItem key={capital} value={capital} >{capital}</MenuItem>)}
    </Select>
  )

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchUrl = selectedCapital === 'All' ? '/all' : `/capital/${selectedCapital}`;
      const fetchAllUrl = `${BASE_URL}${fetchUrl}`;
      const fetchRequest = await fetch(fetchAllUrl);
      const fetchedData = await fetchRequest.json();
      setCountries(fetchedData);
    }
    fetchCountries();
  }, [selectedCapital])

  return (
    <>
      <h1>List of Countries</h1>
      {renderCapitalSelectOptions()}
      {countries.map(country => <CountryCard key={country.name.common} country={country} />)}
    </>
  )
}

export default CountriesWithRequestInsideUseEffect;
