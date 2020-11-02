import React from 'react';
import './App.css';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import a0 from './images/autumn_casual_female.jpg';
import a1 from './images/autumn_casual_male1.jpg';
import a2 from './images/autumn_cultural_male.png';
import a3 from './images/winter_cultural_female.jpeg';
import s0 from './images/summer_casual_female.jpg';
import s1 from './images/summer_casual_male.jpg';
import s2 from './images/summer_casual_male1.jpg';
import s3 from './images/summer_cultural_child.jpeg';
import s4 from './images/summer_cultural_female.jpg';
import s5 from './images/summer_cultural_femalee.jpg';
import s6 from './images/summer_cultural_male.jpg';
import s7 from './images/summer_formal_female.jpg';
import s8 from './images/summer_formal_male.jpg';
import w0 from './images/winter_casual_female.jpg';
import w1 from './images/winter_casual_male.jpg';
import w2 from './images/winter_formal_female.jpeg';
import w3 from './images/winter_formal_male.jpg';
import w4 from './images/winter_formal_femalee.jpg';
import w5 from './images/winter_formal_female.jpg';

var winter = [w0, w1, w2, w3, w4, w5];
var summer = [s0, s1, s2, s3, s4, s5, s6, s7, s8];
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
          });
        }
        if (this.state.temp >= 17) {
          this.setState({
            picture: summer[clickCount],
          });
        }
        if (this.state.temp < 17 && this.state.temp > 10) {
          this.setState({
            picture: autumn[clickCount],
          });
        }
      });
  };

  handleForwardClick = () => {
    if (this.state.temp <= 10) {
      this.setState({ picture: winter[clickCount] });
      var arrayWeatherPictures = [w0, w1, w2, w3, w4, w5];
    } else if (this.state.temp >= 17) {
      this.setState({
        picture: summer[clickCount],
      });
      arrayWeatherPictures = [s0, s1, s2, s3, s4, s5, s6, s7, s8];
    } else {
      if (this.state.temp < 17 && this.state.temp > 10) {
        this.setState({ picture: autumn[clickCount] });
        arrayWeatherPictures = [a0, a1, a2, a3];
      }
    }

    if (clickCount === arrayWeatherPictures.length - 1) {
      clickCount = 0;
    } else {
      clickCount = clickCount + 1;
    }
    this.setState({ picture: arrayWeatherPictures[clickCount] });
  };

  handleBackwardClick = () => {
    if (this.state.temp <= 10) {
      this.setState({ picture: winter[clickCount] });
      var arrayWeatherPictures = [w0, w1, w2, w3, w4, w5];
    } else if (this.state.temp >= 17) {
      this.setState({
        picture: summer[clickCount],
      });
      arrayWeatherPictures = [s0, s1, s2, s3, s4, s5, s6, s7, s8];
    } else {
      if (this.state.temp < 17 && this.state.temp > 10) {
        this.setState({ picture: autumn[clickCount] });
        arrayWeatherPictures = [a0, a1, a2, a3];
      }
    }
    if (clickCount === 0) {
      clickCount = arrayWeatherPictures.length - 1;
    } else {
      clickCount = clickCount - 1;
    }
    this.setState({ picture: arrayWeatherPictures[clickCount] });
  };

  render() {
    return (
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

          <button className='btn' onClick={this.handleClick}>
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
            <div>
              <IoIosArrowBack onClick={this.handleBackwardClick} />
              <img
                className='pictures'
                src={this.state.picture}
                alt='weather'
              />
              <IoIosArrowForward onClick={this.handleForwardClick} />
            </div>
          </div>
          <div className='card-footer image-center text-center '></div>
        </div>
      </div>
    );
  }
}

export default App;
