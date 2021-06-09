import { React, useState, useEffect }  from 'react';
import Button from './components/button'
import Input from './components/input'
import Questions from './questions'
import magicHat from './assets/hat.png'

import './app.css'

function App() {

  const [question, setQuestion] = useState('')
  const [icebreakers, setIceBreakers] = useState(Questions)
  const [toggle, setToggle] = useState(false)
  const [toggleQuestionInput, setToggleQuestionInput] = useState(false)
  const [randomNumbers, setRandomNumbers] = useState([])
  const [time, setTime] = useState(0)
  const [start, setStart] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')

  function randomNumber(){
    const randomNum = Math.floor(Math.random() * icebreakers.length)
    if (randomNumbers.length === icebreakers.length) {
      setRandomNumbers([randomNum])
      return randomNum
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
  console.log(start, time)

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
    setToggle(false)
    setTime(0)
    setQuestion('')
  }

  function handleInput(e){
    const newQuestion = e.target.value
    setNewQuestion(newQuestion)
  }

  function addQuestion(){
    setIceBreakers([...icebreakers, newQuestion]);
  }

  return (
    <div className="App">
      <div className="questions">
      <p>{question}</p>
      </div>
      <div className="magic-hat">
      <img src={magicHat}/>
      </div>
      <div className="buttons">
      <Button variant="primary" onClick={() => randomQuestion()}>Give me a question</Button>
      <Button variant="secondary" onClick={() => setToggle(true)}>auto generate questions</Button>
      <Button variant="light" onClick={() => setToggleQuestionInput(true)}>Add my own questions</Button>
      </div>
      <div className="inputFields">

      {toggle ?
      (<div className="inputFields-toggled">
        <div className="inputFields-toggled-input">
        <Input variant="small-input" placeholder="in seconds" onChange={(e) => handleTime(e)}/>
        </div> <br/>
        <div className="inputFields-toggled-btns">
        <Button variant="submit" onClick={() => setStart(!start)}>{!start ? ("start"): ("stop")}</Button>
        {!start ? (<Button variant="cancel" onClick={() => cancel()}>cancel</Button>) : null}
        </div>
       </div>) : null}

      {toggleQuestionInput ? 
      (<div className="inputFields-toggled">
      <div className="inputFields-toggled-input">
      <Input variant="large-input" onChange={(e) => handleInput(e)} placeholder="ex. what is your darkest secret?"></Input><br/>
      </div>
      <div className="inputFields-toggled-btns">
      <Button variant="submit" onClick={() => addQuestion()}>Add</Button>
      <Button variant="cancel" onClick={() => setToggleQuestionInput(false)}>close</Button>
      </div>
      </div>) : null}
      </div>
    </div>
  );
}

export default App;
