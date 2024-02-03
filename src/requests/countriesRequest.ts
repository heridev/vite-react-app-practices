export const fetchCountriesPromise = async (fetchUrl: string) => {
  try {
    const fetchRequest = await fetch(fetchUrl);
    const fetchedData = await fetchRequest.json();
    return fetchedData;
  } catch (excep) {
    console.log(excep, 'exceptions');
  }
}
