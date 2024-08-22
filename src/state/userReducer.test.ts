import {userReducer, UserStateType} from "./userReducer";

let state: UserStateType;

beforeEach(() => {
  state = {
    age: 20,
    childrenCount: 2,
    name: 'Sam'
  }
})

test('user reducer should increment only age', () => {
  const endState = userReducer(state, {type: 'INCREMENT_AGE'});

  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
})

test('user reducer should increment only childrenCount', () => {
  const endState = userReducer(state, {type: 'INCREMENT_CHILDREN_COUNT'});

  expect(endState.childrenCount).toBe(3);
  expect(endState.age).toBe(20);
})

test('user reducer should change name of user', () => {
  const endState = userReducer(state, {type: 'CHANGE_NAME', newName: 'Din'});

  expect(state.name).toBe('Sam');
  expect(endState.name).toBe('Din');
})
