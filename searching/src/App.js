import React, { useState } from 'react';
import dataSet from './dataSet';
import './App.css';

function App() {
  const [searchNumber, setSearchNumber] = useState();
  const [searchType, setSearchType] = useState('linear');
  const [error, setError] = useState();
  const [result, setResult] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchNumber) {
      setError('Please enter a number');
    } else {
      setError('');

      if (searchType === 'linear') {
        setResult(linearSearch(dataSet, parseInt(searchNumber)));
      }
      if (searchType === 'binary') {
        const tempData = dataSet.sort((a, b) => a - b);
        setResult(binarySearch(tempData, parseInt(searchNumber)));
      }
    }
  };
  const handleSearchNumber = (num) => {
    setSearchNumber(num);
  };
  const handleSearchType = (type) => {
    setSearchType(type);
  };

  const linearSearch = (arr, num) => {
    let tries = 0;
    for (let i = 0; i < arr.length; i++) {
      tries++;
      if (arr[i] === num) {
        return {
          num,
          found: true,
          tries,
        };
      }
    }
    return {
      num,
      found: false,
      tries,
    };
  };
  const binarySearch = (
    arr,
    num,
    start = 0,
    end = arr.length - 1,
    tries = 0
  ) => {
    tries++;
    if (start > end) {
      return {
        num,
        found: false,
        tries,
      };
    }
    const index = Math.floor((start + end) / 2);
    const midVal = arr[index];
    if (num === midVal) {
      return {
        num,
        found: true,
        tries,
      };
    } else if (num > midVal) {
      return binarySearch(arr, num, index + 1, end, tries);
    } else if (num < midVal) {
      return binarySearch(arr, num, start, index - 1, tries);
    }
  };

  return (
    <div className='App'>
      <form className='SearchForm' onSubmit={(e) => handleSubmit(e)}>
        <h3>Search Numbers Array</h3>
        <div className='Input'>
          <label htmlFor='number'>Enter a number to search for:</label>
          <input
            id='number'
            type='number'
            onChange={(e) => handleSearchNumber(e.target.value)}
          />
          {error && <p className='Error'>{error}</p>}
        </div>
        <div className='InputGroup'>
          <div className='Input'>
            <label htmlFor='linear'>Linear Search</label>
            <input
              type='radio'
              id='linear'
              name='searchType'
              value='linear'
              checked={searchType === 'linear' ? true : false}
              onChange={(e) => handleSearchType(e.target.value)}
            />
          </div>
          <div className='Input'>
            <label htmlFor='binary'>Binary Search</label>
            <input
              type='radio'
              id='binary'
              name='searchType'
              value='binary'
              checked={searchType === 'binary' ? true : false}
              onChange={(e) => handleSearchType(e.target.value)}
            />
          </div>
        </div>
        <div className='SearchButton'>
          <button type='submit'>Search</button>
        </div>
      </form>
      {result && (
        <div className='Result'>
          <ul>
            <li>
              Number Searched for: <strong>{result.num}</strong>
            </li>
            <li>
              Number found: <strong>{result.found ? 'Yes' : 'No'}</strong>
            </li>
            <li>
              Number of tries: <strong>{result.tries}</strong>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
