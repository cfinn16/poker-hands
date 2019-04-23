import React from "react";
import Enzyme, { shallow, render, mount, configure } from "enzyme";
import HandsContainer from './HandsContainer.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const mockPlayers = ["Ted", "Louis"]
const highCardAce = ['4H', '5C', '8S', 'JD', 'AH']
const highCardKing = ['4H', '5C', '8S', 'JD', 'KH']
const pair = ['2D', '2S', '4H', '8C', '9D']
const twoPair = ['2C', '2H', '4D', '8S', '8D']
const threeOfAKind = ['KS', 'KD', 'KH', '4D', '6C']
const straight = ['4S', '5C', '6H', '7C', '8C']
const flush = ['2H', '3H', '4H', '8H', 'KH']
const fullHouse = ['2C', '2H', '8C', '8S', '8D']
const fourOfAKind = ['KS', 'KD', 'KH', 'KC', '6C']
const straightFlush = ['4S', '5S', '6S', '7S', '8S']

describe('HandsContainer', () => {
  it('should render correctly', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>);

    expect(component).toMatchSnapshot();
  });

  it('deals two hands of five cards each when the deal button is clicked', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.find("button.btn-primary").simulate("click")

    expect(component.state().hand1).toHaveLength(5)
    expect(component.state().hand2).toHaveLength(5)
  })

  it('selects a winner when the select winner button is clicked', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.find("button.btn-primary").simulate("click")
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual(expect.anything())
  })

  it('a pair beats high card', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: pair, hand2: highCardAce})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Ted")
  })

  it('two pair beats a pair', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: pair, hand2: twoPair})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Louis")
  })

  it('three of a kind beats two pair', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: twoPair, hand2: threeOfAKind})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Louis")
  })

  it('a straight beats three of a kind', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: straight, hand2: threeOfAKind})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Ted")
  })

  it('a flush beats a straight', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: straight, hand2: flush})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Louis")
  })

  it('a full house beats a flush', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: fullHouse, hand2: flush})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Ted")
  })

  it('four of a kind beats a full house', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: fullHouse, hand2: fourOfAKind})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Louis")
  })

  it('a straight flush beats four of a kind', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: straightFlush, hand2: fourOfAKind})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Ted")
  })

  it ('finds the high card to break a tie', () => {
    const component = shallow(<HandsContainer players={mockPlayers}/>)

    component.setState({ hand1: highCardAce, hand2: highCardKing})
    component.find("button.btn-info").simulate("click")

    expect(component.state().winner).toEqual("Ted")
  })

});





// test('isFlush should return true if each card in a hand has the same suit', () => {
//   expect(isFlush(flush)).toBe(true);
// });
