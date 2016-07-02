import { Map,fromJS } from 'immutable';

import { expect } from 'chai';
import  reducer  from '../src/reducer';

describe('reducer' , () => {
	it('handle SET_ENTRIES', () => {
		const initialState = Map();
		const action = { type: 'SET_ENTRIES',entries:['A'] };
		const nextState = reducer(initialState,action);
		expect(nextState).to.equal(fromJS({
			entries : ['A']
		}));
	});

	it('handle NEXT' , () => {
		const initialState = fromJS({
			entries : ['A','B']
		});
		const action = { type : 'NEXT' };
		const nextState = reducer(initialState,action);
		expect(nextState).to.equal(fromJS({
			vote : {
				pair : ['A','B']
			},
			entries : []
		}));
	});

	it('handle VOTE', () => {
		const initialState = fromJS({
			vote : {
				pair : ['A','B'],
				tally : {
					'A': 4,
					'B': 3
				}
			},

			entries : ['C','D']
		});

		const action = { type : 'VOTE',entry :'A'};

		const nextState = reducer(initialState,action);
		expect(nextState).to.equal(fromJS({
			vote : {
				pair : ['A','B'],
				tally : {
					'A': 5,
					'B' : 3
				}
			},

			entries : ['C','D']
		}));
	});

	it('has initial state', () => {
		const action = { type : 'SET_ENTRIES',entries : ['A','B'] };

		const nextState = reducer(undefined,action);

		expect(nextState).to.equal(fromJS({
			entries : ['A','B']
		}));

	});

	it('sets a winner when there are no more entries', () => {
		const action = { type : 'NEXT' } ;

		const initialState = fromJS({
			vote : {
				pair : ['A','B'],
				tally : {
					'A': 5,
					'B':3
				}
			},

			entries : []
		});

		const nextState = reducer(initialState,action);

		expect(nextState).to.equal(fromJS({
			winner : 'A'
		}));
	});

	it('can be used with reduce', () => {

		const actions = [
			{type : 'SET_ENTRIES',entries: ['A','B'] },
			{type : 'NEXT'},
			{type: 'VOTE', entry :'A'},
			{type: 'VOTE', entry: 'A'},
			{type: 'VOTE', entry: 'B'},
			{type : 'NEXT'}
		];

		const initialState = Map();

		const nextState = actions.reduce(reducer,initialState);

		expect(nextState).to.equal(fromJS({
			winner : 'A'
		}));
			
	});
});
