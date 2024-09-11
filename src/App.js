import './App.css';
import { useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction'; 
    
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, description, datetime}),
    })
    .then(response => {
      // Ensure the response is ok and parse the JSON
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then(json => {
      console.log('result', json);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  return (
    <main>
      <h1>$400<samp>.00</samp></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text" 
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'+200 new Samsung TV'} />
          <input value={datetime}
            onChange={ev => setDatetime(ev.target.value)}
            type='datetime-local' />
        </div>
        <div className='description'>
          <input type='text'
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={'Description'} />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>New Samsung TV</div>
            <div className='description'>It was time for a new TV</div>
          </div>
          <div className='right'>
            <div className='price red'>$700</div>
            <div className='datetime'>2024-09-03 13:23</div>
          </div>
        </div>
        
        <div className='transaction'>
          <div className='left'>
            <div className='name'>Gig job new website</div>
            <div className='description'>Payment for website development</div>
          </div>
          <div className='right'>
            <div className='price green'>+$400</div>
            <div className='datetime'>2024-09-03 13:23</div>
          </div>
        </div>

        <div className='transaction'>
          <div className='left'>
            <div className='name'>iPhone</div>
            <div className='description'>Purchased a new iPhone</div>
          </div>
          <div className='right'>
            <div className='price red'>-$700</div>
            <div className='datetime'>2024-09-03 13:23</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
