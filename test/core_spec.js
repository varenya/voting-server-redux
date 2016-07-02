import {List,Map} from 'immutable';
import {expect} from 'chai';

import { setEntries, next , vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {
		it('add entries to the state', () => {
			const state = Map();
			const entries = ['A','B'];
			const nextState = setEntries(state,entries);
			expect(nextState).to.equal(Map({
				entries: List.of('A','B')
			}));
		});
	});

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			const state = Map({
				entries : List.of('A','B','C')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote : Map({
					pair: List.of('A','B')
				}),
				entries : List.of('C')
			}));
		});

		it('puts the winner back in entries', () => {
			const state = Map({
				vote : Map({
					pair : List.of('D','E'),
					tally : Map({
						'D': 4,
						'E': 3
					})
				}),
				entries : List.of('A','B','C')
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote : Map({
					pair : List.of('A','B'),
				}),
				entries : List.of('C','D')
			}));

		});

		it('puts both if they are tied', () => {
			const state = Map({
				vote : Map({
					pair : List.of('A','B'),
					tally : Map({
						'A':4,
						'B':4
					})
				}),
				entries : List.of('C','D')
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote : Map({
					pair : List.of('C','D')
				}),
				entries : List.of('A','B')
			}));
		});
	});

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
				vote : Map({
					pair : List.of('A','B')
				}),
				entries: List()
			});
			const nextState = vote(state,'A');

			expect(nextState).to.equal(Map({
				vote : Map({
					pair : List.of('A','B'),
					tally : Map({ 'A' : 1 })
				}),
				entries : List()
			}));
		});

		it('add to an already existing tally', () => {
			const state = Map({
				vote : Map({
					pair : List.of('A','B'),
					tally : Map({'A':2,'B':3})
				}),
				entries : List()
			});

			const nextState = vote(state,'B');

			expect(nextState).to.equal(Map({
				vote : Map({
					pair : List.of('A','B'),
					tally : Map({'A':2,'B':4})
				}),
				entries : List()
			}));
	        });
	});
});
