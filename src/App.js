import React from 'react';
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

var winter = [w0, w1, w2, w3];
var summer = [s0, s1, s2, s3];
var autumn = [a0, a1, a2, a3];
var clickCount = 0;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      character: {},
      weather: '',
      cityInput: '',
      city: '',
      temp: '',

      date: '',
      country: '',
      displayWidget: 'noDisplay',
      picture: '',
      carousel0: '',
      carousel1: '',
      carousel2: '',
      carousel3: '',
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ cityInput: event.target.value });
  };

  handleClick = (event) => {
    clickCount = 0;
    this.setState({
      loading: true,
    });

    event.preventDefault();

    let city = this.state.cityInput;

    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&APPID=daae827db6346edc7ba462a1a3a48509'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          character: data,
        });

        if (this.state.character.cod === '404' || this.state.cityInput === '') {
          this.setState({
            weather: 'city not found',
            city: '',
            cityInput: '',
            displayWidget: 'widget',
          });
        } else {
          let cord = this.state.character.weather[0].description;
          let temp = Math.round(this.state.character.main.temp - 273);
          let country = this.state.character.sys.country;

          let town = this.state.character.name;
          var today = new Date();
          var day = today.getDate();
          var month = today.getMonth();
          var year = today.getFullYear();
          var useMonth = month + 1;
          var date = day + '/' + useMonth + '/' + year;

          this.setState({
            weather: cord,
            cityInput: '',
            city: town,
            temp: temp,
            date: date,
            country: country,
            displayWidget: 'widget',
          });
        }

        if (this.state.temp <= 10) {
          this.setState({
            picture: winter[clickCount],
            carousel0: w0,
            carousel1: w1,
            carousel2: w2,
            carousel3: w3,
          });
        }
        if (this.state.temp >= 17) {
          this.setState({
            picture: summer[clickCount],
            carousel0: s0,
            carousel1: s1,
            carousel2: s2,
            carousel3: s3,
          });
        }
        if (this.state.temp < 17 && this.state.temp > 10) {
          this.setState({
            picture: autumn[clickCount],
            carousel0: a0,
            carousel1: a1,
            carousel2: a2,
            carousel3: a3,
          });
        }
      });
  };

  render() {
    return (
      <div>
        <div className='container'>
          <form>
            <input
              type='text'
              value={this.state.cityInput}
              onChange={this.handleChange}
              id='city'
              placeholder='Enter Your City Here'
              required
            />

            <button className='mybtn' onClick={this.handleClick}>
              Check the weather!
            </button>
          </form>

          <div className={this.state.city === '' ? 'noDisplay' : 'card'}>
            <div className='card-body image-center text-center '>
              <div className='card-text'>
                <b>
                  <span>
                    {this.state.city
                      ? this.state.city + ', ' + this.state.country + ','
                      : ''}{' '}
                  </span>
                </b>
                <b>
                  {this.state.loading ? (
                    <h3>loading...</h3>
                  ) : (
                    this.state.weather + ',  '
                  )}
                </b>

                <b>{this.state.city ? this.state.temp : ''}</b>

                <b className={this.state.city === '' ? 'noDisplay' : ''}>
                  <sup>0</sup>C
                </b>
                <p>{this.state.city ? this.state.date : ''}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          id='myCarousel'
          class={this.state.city === '' ? 'noDisplay' : 'carousel slide'}
          data-ride='carousel'>
          <ol class='carousel-indicators'>
            <li data-target='#myCarousel' data-slide-to='0' class='active'></li>
            <li data-target='#myCarousel' data-slide-to='1'></li>
            <li data-target='#myCarousel' data-slide-to='2'></li>
            <li data-target='#myCarousel' data-slide-to='3'></li>
          </ol>
          <div class='carousel-inner'>
            <div class='item active text-center'>
              <img
                src={this.state.carousel0}
                alt='weather1'
                style={{ width: '500px', height: '500px' }}
              />
            </div>

            <div class='item'>
              <img
                src={this.state.carousel1}
                alt='weather2'
                style={{ width: '500px', height: '500px' }}
              />
            </div>

            <div class='item'>
              <img
                src={this.state.carousel2}
                alt='weather3'
                style={{ width: '500px', height: '500px' }}
              />
            </div>
            <div class='item'>
              <img
                src={this.state.carousel3}
                alt='weather4'
                style={{ width: '500px', height: '500px' }}
              />
            </div>
          </div>

          <a class='left carousel-control' href='#myCarousel' data-slide='prev'>
            <span class='glyphicon glyphicon-chevron-left'></span>
            <span class='sr-only'>Previous</span>
          </a>
          <a
            class='right carousel-control'
            href='#myCarousel'
            data-slide='next'>
            <span class='glyphicon glyphicon-chevron-right'></span>
            <span class='sr-only'>Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
