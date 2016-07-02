import {expect} from 'chai';
import {List,Map} from 'immutable';

describe('immutability',() => {
	describe('a number', () => {
		function increment(currentState){
			return currentState + 1;
		}

		it('is immutable',() => {
			let state = 42;
			let nextState = increment(state);
			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});
	});

	describe('a list', () => {

		function addList(state,newItem){
			return state.push(newItem);
		}

		it('is immutable', () => {
			let state = List.of('varen','nammu');
			let nextState = addList(state,'thyagaraj');
			expect(nextState).to.equal(List.of('varen','nammu','thyagaraj'));
			expect(state).to.equal(List.of('varen','nammu'));
		});

	});

	describe('a tree',() => {
		function addMovie(currentState,movie){
			return currentState.update('movies',movies => movies.push(movie));
		}
		it('is immutable',() => {
			let state = Map({'movies':List.of('Up','Finding Nemo')});
			let nextState = addMovie(state,'Bolt');
			expect(nextState).to.equal(Map({'movies':List.of('Up','Finding Nemo','Bolt')}));
			expect(state).to.equal(Map({'movies':List.of('Up','Finding Nemo')}));
		});
	});
});
