import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hueValue: 180,
      saturationValue: 50,
      lightnessValue: 50
    }
  }

  _moveHue = event => {
    let hueValue = event.target.value

    this.setState((state, props) => {
      return {
        hueValue
      }
    }
    )
  }

  _moveSat = event => {
    let saturationValue = event.target.value

    this.setState((state, props) => {
      return {
        saturationValue
      }
    })
  }

  _moveLight = event => {
    let lightnessValue = event.target.value

    this.setState((state, props) => {
      return {
        lightnessValue
      }
    })
  }
  render() {
    return (
      <div className="App">
        <main>
        <p className="hslValue" style={{ color: `hsl(${this.state.hueValue}, ${this.state.saturationValue}%, ${this.state.lightnessValue}%)` }}>H:{this.state.hueValue} S:{this.state.saturationValue}% L:{this.state.lightnessValue}%</p>
          <aside style={{ backgroundColor: `hsl(${this.state.hueValue}, ${this.state.saturationValue}%, ${this.state.lightnessValue}%)` }}></aside>
          <div className='controls'>
            <h4>Hue</h4>
            <input onChange={this._moveHue} type="range" min="0" max="360" value={this.state.hueValue} />
            <h4>Saturation</h4>
            <input onChange={this._moveSat} type="range" min="0" max="100" value={this.state.saturationValue} />
            <h4>Lightness</h4>
            <input onChange={this._moveLight} type="range" min="0" max="100" value={this.state.lightnessValue} />
          </div>
        </main>
      </div>
    )
  }
}

export default App;
