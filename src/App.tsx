import { useState } from "react";
import { Button } from "./components/Button";
import { IButton } from "./interfaces/ButtonInterface";
import { Calculator } from "./services/CalculationService";

function App() {
  const [total, setTotal] = useState(0);
  const [expression, setExpression] = useState('');
  const calculator = new Calculator();
  const buttons:IButton[] = [
    {
      value: '1',
      color: 'bg-green-500'
    },
    {
      value: '2',
      color: 'bg-green-500'
    },
    {
      value: '3',
      color: 'bg-green-500'
    },
    {
      value: '/',
      color: 'bg-blue-500'
    },
    {
      value: 'x',
      color: 'bg-blue-500'
    },
    {
      value: '4',
      color: 'bg-green-500'
    },
    {
      value: '5',
      color: 'bg-green-500'
    },
    {
      value: '6',
      color: 'bg-green-500'
    },
    {
      value: '-',
      color: 'bg-blue-500'
    },
    {
      value: '+',
      color: 'bg-blue-500'
    },
    {
      value: '7',
      color: 'bg-green-500'
    },
    {
      value: '8',
      color: 'bg-green-500'
    },
    {
      value: '9',
      color: 'bg-green-500'
    },
    {
      value: '0',
      color: 'bg-green-500'
    },
    {
      value: '=',
      color: 'bg-orange-400'
    }
  ];

  function clearInput(){
    setExpression('');
    setTotal(0);
  }

  function getTokensOfExpression(expression: string): string[] {
    const numbers = expression.split(/\D+/g).filter(Boolean);
    const operators = expression.split(/[0-9]+/).filter(Boolean);
    const splitedExpression: string[] = [];

    numbers.forEach((number, index)=> {
      splitedExpression.push(number)
      if(operators[index])
        splitedExpression.push(operators[index]);
    });

    return splitedExpression;
  }

  function handleChangeExpression(value:string){
    if(value === 'AC'){
      clearInput();
      return;
    }

    if(value === '='){
      setExpression(String(total));
      setTotal(0);
      return;
    }

    if(value === '/' || value === 'x' || value === '-' || value === '+'){
      setExpression(expression=>expression + value);
      return;
    }

    calcResult(expression + value);
    setExpression(expression=>expression + value);
  }

  function calcResult(expression: string){
    let tokens = getTokensOfExpression(expression);

    while(tokens.length > 1){
      let index;
      let result;
      const multi = tokens.find((token)=>token === 'x');
      const div = tokens.find((token)=>token === '/');
      const sum = tokens.find((token)=>token === '+');
      const sub = tokens.find((token)=>token === '-');

      if(multi){
        index = tokens.findIndex((token)=>token === multi);
        result = calculator.mul(Number(tokens[index-1]), Number(tokens[index+1]));
        tokens.splice(index-1, 3, String(result));
      }
      
      else if(div){
        index = tokens.findIndex((token)=>token === div);
        result = calculator.div(Number(tokens[index-1]), Number(tokens[index+1]));
        tokens.splice(index-1, 3, String(result));
      }

      else if(sum){
        index = tokens.findIndex((token)=>token === sum);
        result = calculator.sum(Number(tokens[index-1]), Number(tokens[index+1]));
        tokens.splice(index-1, 3, String(result));
      }

      else if(sub){
        index = tokens.findIndex((token)=>token === sub);
        result = calculator.sub(Number(tokens[index-1]), Number(tokens[index+1])); 
        tokens.splice(index-1, 3, String(result));
      }

    }

    setTotal(Number(tokens[0]));
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="flex flex-col w-[864px] h-[500px] bg-slate-400 p-6 rounded-md gap-4">
          <input type="text" className="h-20 rounded-md p-4 text-end bg-slate-100 text-2xl" value={expression} disabled/>
          <div className="flex gap-4 w-[864px] relative">
            <div className="flex items-center justify-end h-20 rounded-md p-4 bg-slate-100 text-2xl w-[648px]">
              {total}
            </div>
            <Button color="bg-rose-500" value="AC" onClick={handleChangeExpression}/>
          </div>
          <div className="flex flex-wrap gap-4">
            {
              buttons.map((button:IButton) =>  <Button color={button.color} value={button.value} onClick={handleChangeExpression}/>)
            }
          </div>
        </div>
    </div>
  )
}

export default App
