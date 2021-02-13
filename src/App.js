import React, { useState } from 'react';
import './App.css';
import s0 from './images/summer1.jpg';
import s1 from './images/summer2.jpeg';
import s2 from './images/summer3.jpg';
import s3 from './images/summer4.png';
import w0 from './images/winter1.jpeg';
import w1 from './images/winter2.jpg';
import w2 from './images/winter3.png';
import w3 from './images/winter4.jpg';
import a0 from './images/autumn1.jpg';
import a1 from './images/autumn2.jpg';
import a2 from './images/autumn3.jpg';
import a3 from './images/autumn4.jpg';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [carousel0, setCarousel0] = useState('');
  const [carousel1, setCarousel1] = useState('');
  const [carousel2, setCarousel2] = useState('');
  const [carousel3, setCarousel3] = useState('');

  let handleChange = (enteredText) => {
    setCityInput(enteredText.target.value);
  };

  let handleClick = (input) => {
    setLoading(true);
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        input +
        '&APPID=daae827db6346edc7ba462a1a3a48509'
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCarousel0('');
        setCarousel1('');
        setCarousel2('');
        setCarousel3('');

        if (data.cod === '404') {
          setWeather('city not found');
          setCity('');
          setCityInput('');
        } else {
          let mytemp = Math.round(data.main.temp - 273);
          let today = new Date();
          let day = today.getDate();
          let month = today.getMonth();
          let year = today.getFullYear();
          let useMonth = month + 1;
          let date = day + '/' + useMonth + '/' + year;

          setWeather(data.weather[0].description);
          setCityInput('');
          setCity(data.name);
          setTemp(mytemp);
          setDate(date);
          setCountry(data.sys.country);
          if (mytemp <= 10) {
            setCarousel0(w0);
            setCarousel1(w1);
            setCarousel2(w2);
            setCarousel3(w3);
          }
          if (mytemp >= 17) {
            setCarousel0(s0);
            setCarousel1(s1);
            setCarousel2(s2);
            setCarousel3(s3);
          }
          if (mytemp < 17 && mytemp > 10) {
            setCarousel0(a0);
            setCarousel1(a1);
            setCarousel2(a2);
            setCarousel3(a3);
          }
        }
      });
  };
  let submitClicked = (event) => {
    event.preventDefault();
    if (cityInput !== '') {
      handleClick(cityInput);
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='myform' data-testid='searchBox'>
          <input
            type='text'
            value={cityInput}
            onChange={handleChange}
            id='city'
            placeholder='Enter Your City Here'
            required
          />

          <button
            className='mybtn'
            data-testid='submitButton'
            onClick={submitClicked}>
            Check the weather!
          </button>
        </div>

        <div className={city === '' ? 'noDisplay' : 'card'}>
          <div className='card-body image-center text-center '>
            <div className='card-text'>
              <b>
                <span>{city ? city + ', ' + country + ',' : ''} </span>
              </b>
              <b>{loading ? <h3>loading...</h3> : weather + ',  '}</b>

              <b>{city ? temp : ''}</b>

              <b className={city === '' ? 'noDisplay' : ''}>
                <sup>0</sup>C
              </b>
              <p>{city ? date : ''}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        id='myCarousel'
        className={city === '' ? 'noDisplay' : 'carousel slide'}
        data-ride='carousel'>
        <ol className='carousel-indicators'>
          <li
            data-target='#myCarousel'
            data-slide-to='0'
            className='active'></li>
          <li data-target='#myCarousel' data-slide-to='1'></li>
          <li data-target='#myCarousel' data-slide-to='2'></li>
          <li data-target='#myCarousel' data-slide-to='3'></li>
        </ol>
        <div className='carousel-inner'>
          <div className='item active text-center'>
            <img
              src={carousel0}
              alt='weather1'
              style={{ width: '500px', height: '500px' }}
            />
          </div>

          <div className='item'>
            <img
              src={carousel1}
              alt='weather2'
              style={{ width: '500px', height: '500px' }}
            />
          </div>

          <div className='item'>
            <img
              src={carousel2}
              alt='weather3'
              style={{ width: '500px', height: '500px' }}
            />
          </div>
          <div className='item'>
            <img
              src={carousel3}
              alt='weather4'
              style={{ width: '500px', height: '500px' }}
            />
          </div>
        </div>

        <a
          className='left carousel-control'
          href='#myCarousel'
          data-slide='prev'>
          <span className='glyphicon glyphicon-chevron-left'></span>
          <span className='sr-only'>Previous</span>
        </a>
        <a
          className='right carousel-control'
          href='#myCarousel'
          data-slide='next'>
          <span className='glyphicon glyphicon-chevron-right'></span>
          <span className='sr-only'>Next</span>
        </a>
      </div>
    </div>
  );
};
export default App;
