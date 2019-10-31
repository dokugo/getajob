/* export const searchRequest = inputData => {
  if (inputData === null) {
    console.log('Fetch cancelled');
    setInputState('error');
    return;
  } else {
    setInputState(null);
    setIsLoading(true);

    toggleAnimation(false);
    fetch(`http://localhost:9000/api/search/${inputData}`)
      .then(response => response.json())
      .then(data => {
        toggleAnimation(true);
        handleDataUpdate(data);
        console.log('Data successfully updated');
        setIsLoading(false);
      })
      .catch(e => console.log('Error: ', e));
  }
};
 */
