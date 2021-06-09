import { React, useState, useEffect }  from 'react';
import Button from './components/button'
import Input from './components/input'
import Questions from './questions'
import magicHat from './assets/hat.png'

import './app.css'

function App() {

  const [play, setPlay] = useState(false)
  const [question, setQuestion] = useState('')
  const [icebreakers, setIceBreakers] = useState(Questions)
  const [toggle, setToggle] = useState(false)
  const [toggleQuestionInput, setToggleQuestionInput] = useState(false)
  const [randomNumbers, setRandomNumbers] = useState([])
  const [time, setTime] = useState(0)
  const [start, setStart] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')


  function randomNumber(){
    const randomNum = Math.floor(Math.random() * icebreakers.length)
    if (randomNumbers.length === icebreakers.length) {
      setRandomNumbers([])
      setMessage("You've gone through all the questions! Click the question button to start over")
    } else if (randomNumbers.includes(randomNum)){
      return randomNumber()
    } else {
      setRandomNumbers([...randomNumbers, randomNum])
      return randomNum
    }
  };
  
  function randomQuestion(){
		const randomNum = randomNumber();
    setQuestion(icebreakers[randomNum]);
	};

  function handleTime(e){
    const timeInSeconds = (e.target.value) * 1000
    setTime(timeInSeconds)
  };
 console.log(time)
  function startTimer(){
    if (time === 0){
      setErrorMessage("You must enter a time")
      return
    } else {
      setStart(!start)
      setErrorMessage('')
    }
  }
  useEffect(() => {
    let interval
    if (start) {
      interval = setInterval(randomQuestion, time);
    } else if (!start && time !== 0){
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  }, [start, time])

  function cancel(){
    setStart(false)
    setToggle(false)
    setTime(0)
    setQuestion('')
  };
  
  function close(){
    setToggleQuestionInput(false)
    setNewQuestion('')
    setMessage('')
  };

  function handleInput(e){
    const newQuestion = e.target.value
    setNewQuestion(newQuestion)
  }

  function addQuestion(){
    if (!newQuestion){
      setErrorMessage('You must enter a question')
      return
    } else {
      setErrorMessage('Question added!')
      setIceBreakers([...icebreakers, newQuestion]);
    }
  }

  return (
    <div className="App">
      {!play ? (
        <div className="header">
        <h1>Magic Hat</h1>
        <h4>an icebreaker game</h4>
        <Button variant="primary" onClick={()=> setPlay(true)}>Play</Button>
        </div>
      )
      :
      (<div>
      <div className="questions">
      {question ? (<p>{question}</p>) : (<p className="done">{message}</p>)}
      </div>
      <div className="magic-hat">
      <img src={magicHat}/>
      </div>
      <div className="buttons">
      <Button variant="primary" onClick={() => randomQuestion()}>Give me a question</Button>
      <Button variant="secondary" onClick={() => setToggle(true)}>Auto generate questions</Button>
      <Button variant="light" onClick={() => setToggleQuestionInput(true)}>Add my own questions</Button>
      </div>
      <div className="inputFields">
      {toggle ?
      (<div className="inputFields-toggled">
        <div className="inputFields-toggled-input">
        <Input variant="small-input" placeholder="in seconds" onChange={(e) => handleTime(e)}/>
        </div> <br/>
        <div className="inputFields-toggled-btns">
        <Button variant="submit" onClick={() => startTimer()}>{!start ? ("start"): ("stop")}</Button>
        {!start ? (<Button variant="cancel" onClick={() => cancel()}>cancel</Button>) : null}
        </div>
        <div className="message"> 
        {errorMessage ? (<p className="error">{errorMessage}</p>) : null}
        </div>
       </div>) : null}

      {toggleQuestionInput ? 
      (<div className="inputFields-toggled">
      <div className="inputFields-toggled-input">
      <Input variant="large-input" onChange={(e) => handleInput(e)} placeholder="ex. what is your darkest secret?"></Input><br/>
      </div>
      <div className="inputFields-toggled-btns">
      <Button variant="submit" onClick={() => addQuestion()}>Add</Button>
      <Button variant="cancel" onClick={() => close()}>close</Button>
      </div>
      <div className="message"> 
      {errorMessage ? (<p className="error">{errorMessage}</p>) : null}
      </div>
      </div>) : null}
      </div>
      </div>)}
      
    </div>
  );
}

export default App;
