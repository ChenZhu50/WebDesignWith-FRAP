import React, { Component } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './fonts';
/*
  This Collatz 方法将所有的计算都放在了 render 方法中，这样每次 render 都会重新计算一次。
  这样做是不好的，因为这样会导致性能问题。
*/

/*
class Collatz extends Component {render(){
  const {number} = this.props;
  // this code will reruns with every render
  let x = number;
  let outputString = x.toString();
  while(typeof x == 'number' && x !== 1){
    if((x%2) === 1){
      x = 3*x + 1;
    }else{
      x = x/2;
    };
    outputString += ' ' + x;}
    return(
      <div className = "Collatz">
        <h2>Collatz Sequence for {number}</h2>
        <p>{outputString}</p>
      </div>
    );
  }
}
*/

/*
  为了解决这个问题，我们可以将计算逻辑放在构造函数中，这样只有在组件实例化时才会计算一次。\
  但这里引入了一个新的问题，我们用的是string，所以每次更新的时候整个p都会被react重新渲染。
*/

/*
class Collatz extends Component {
  constructor(props){
    super(props);
    let x = this.props.number;
    let outputString = x.toString();
    while(typeof x == 'number' && x !== 1){
      if((x%2) === 1){
        x = 3*x + 1;
      }else{
        x = x/2;
      };
      outputString += ' ' + x;
    }
    this.outputString = outputString;
  }
  render(){
    const {number} = this.props;
    const outputString = this.outputString;
    return(
      <div className = "Collatz">
        <h2>Collatz Sequence for {number}</h2>
        <p>{outputString}</p>
      </div>
    );
  } 
}
*/

/*
  为了解决问题，我们可以用list的方式来呈现我们的outputString，这样只有更新的部分会被react重新渲染。
*/

class Collatz extends Component {
  constructor(props) {
    super(props);
    let x = this.props.number;
    let outputArr = [x];
    while (typeof x == 'number' && x !== 1) {
      if ((x % 2) === 1) {
        x = 3 * x + 1;
      } else {
        x = x / 2;
      };
      outputArr.push(x);
    }
    this.outputArr = outputArr;
  }
  render() {
    const { number } = this.props;
    const outputArr = this.outputArr;
    return (
      <div className="Collatz">
        <h2>Collatz Sequence for {number}</h2>
        <ul>
          {
            outputArr.map((x, ind) => {
              return <SpecialListItem listStyleType = "circle" key={ind}>{x}
              </SpecialListItem>;
            })
          }
        </ul>
      </div>
    );
  }
}

const GridDiv = styled.div`
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: auto;
        grid-gap: 10px;
        background-color: #eee;
        color: black;
        margin: 20px;
`;
const LeftColumn = styled.div` 
        grid-column: 1;
        margin: 0.8em;
`;
const RightColumn = styled.div` 
        grid-column: 2;
        margin: 0.8em;
`;
const EmphaticPar = styled.p`
        font-style: oblique;
`;
const VeryEmphaticPar = styled(EmphaticPar)` 
        font-family: 'Jersey 15', sans-serif;
        font-size: 150%;
`;
const SpecialListItem = styled.li`
        font-weight: bold;
        font-size: 90%;
        padding: 2px;
        list-style-type: ${props => props.listStyleType || "square"};
`;

class App extends Component {
  render() {
    const number = 17;
    const wikilink = 'https://en.wikipedia.org/wiki/Collatz_conjecture';
    return (
      <>
      <GlobalStyle />
      <GridDiv>
        <LeftColumn>
          <h1>Collatz Conjecture</h1>
          <p>The <a href={wikilink}>Collatz Conjecture </a>
            states that for any positive integer, <i>x</i>, repeatedly applying <i>3x + 1</i> if odd
            and <i>x/2</i> if even will eventually lead to 1.</p>
          <VeryEmphaticPar>No one knows if this is true.</VeryEmphaticPar>
        </LeftColumn>
        <RightColumn>
          <Collatz number={number} />
        </RightColumn>
      </GridDiv>
      </>);

  }
}
export default App;
