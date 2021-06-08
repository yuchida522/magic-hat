import { React, useState, useEffect }  from 'react';
import Button from './components/button'
import Questions from './questions'

function App() {

  const [question, setQuestion] = useState('')
  const [icebreakers, setIceBreakers] = useState(Questions)
  const [autoGenerate, setAutoGenerate] = useState(false)
  const [randomNumbers, setRandomNumbers] = useState([])
  
  console.log(randomNumbers)
  function randomNumber(){
    const randomNum = Math.floor(Math.random() * icebreakers.length)
    if (randomNumbers.length === icebreakers.length) {
      setRandomNumbers([randomNum])
      return randomNum
    } else if (randomNumbers.includes(randomNum)){
      return randomNumber()
    } else {
      setRandomNumbers([...randomNumbers, randomNum])
      // console.log(randomNumbers)
      return randomNum
    }
  };
  
  function randomQuestion(){
		const randomNum = randomNumber();
    setQuestion(icebreakers[randomNum]);
	};

  return (
    <div className="App">
      <p>{question}</p>
      <Button onClick={() => randomQuestion()}>Give me a question</Button>
      {!autoGenerate ?
      (<Button onClick={() => setAutoGenerate(true)}>auto generate questions</Button>) : null}
      {autoGenerate ?
      (<Button onClick={() => setAutoGenerate(false)}>Stop Generating</Button>) : null}
    </div>
  );
}

export default App;
