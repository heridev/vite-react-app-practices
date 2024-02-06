import React, { useState, useEffect, useCallback, PointerEvent } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import styled from 'styled-components';

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

// Same definition as below but using React.FC or React.FunctionComponent
// as this is more tied to React functional components and with the type
// both are valid and probably specific to preferences or other requirements
// const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
const CountryCard: React.FunctionComponent<CountryCardProps> = ({ country }) => {
  return (
    <h3>{country.name.common}</h3>
  )
}

// second approach using Direct props typing
// const CountryCard = ({ country }: CountryCardProps) => {
//   return (
//     <h3>{country.name.common}</h3>
//   )
// }


const BASE_URL: string = 'https://restcountries.com/v3.1';
const FILTERABLE_CAPITALS = [
  'All',
  'México',
  'Tallin',
  'Helsinki',
  'Stockholm',
  'Oslo',
  'Copenhagen',
  'Reykjavik',
] as const;

type Capital = (typeof FILTERABLE_CAPITALS)[number];

const CountriesUseCallbackWhenDeclaredOutside = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCapital, setSelectedCapital] = useState<Capital>(FILTERABLE_CAPITALS[0]);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    if (!event.target.value) return;

    setSelectedCapital(event.target.value as Capital);
  }

  const retrieveCountries = async (callbackFunc: (countries: Country[]) => void) => {
    const fetchUrl = selectedCapital === 'All' ? '/all' : `/capital/${selectedCapital}`;
    const fetchAllUrl = `${BASE_URL}${fetchUrl}`;
    const fetchRequest = await fetch(fetchAllUrl);
    const fetchedData = await fetchRequest.json();
    callbackFunc(fetchedData);
  }

  const fetchCountries = useCallback(retrieveCountries, [selectedCapital])
  const [age, setAge] = useState<string>('');

  const handleSelectAgeChange = (event: PointerEvent) => {
    console.log(event, 'event')
  }

  const renderCapitalSelectOptions = () => (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleSelectAgeChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Select
        value={selectedCapital}
        onChange={handleSelectChange}
        labelId="capitals">
        {FILTERABLE_CAPITALS.map((capital) => <MenuItem key={capital} value={capital} >{capital}</MenuItem>)}
      </Select>
    </>
  )

  const Description = styled.h2`
    color: green;
  `

  useEffect(() => {
    fetchCountries(setCountries);
  }, [fetchCountries])

  return (
    <>
      <h1>List of Countries</h1>
      <Description>CountriesUseCallbackWhenDeclaredOutside</Description>
      {renderCapitalSelectOptions()}
      {countries.map(country => <CountryCard key={country.name.common} country={country} />)}
    </>
  )
}

export default CountriesUseCallbackWhenDeclaredOutside;
