import * as types from "../actions/actionTypes";

const initialCountries = new Array(100).fill(0).map(
  (foo, index) => {
    return index===0
      ? { id: index, name: `출발지`, price:500*index/100, done: true, bought: false }
      : { id: index, name: `카이로${index}`, price:500*index/100, done: false, bought: false, owner: '' }
  }
);

const initialPlayer = new Array(4).fill(0).map(
  (foo, index) => ({ id: index, playerName: `player${index}`, money: 10000, location: 0, ownCountries: [] })
)

const initialState = {
  countries: initialCountries,
  player: initialPlayer,
  number: 0,
  turn: 0
};

function counter(state=initialState, action) {
  const { countries, player, number, turn } = state;
  const { location, money, ownCountries } = player[turn];

  switch(action.type) {
    case types.RANDOM:
      console.log(state.turn);
      if(location+action.number > 35) {
        return {
          countries: [
            ...countries.slice(0, location+action.number-36),
            {
              ...countries[location+action.number-36],
              done: true
            },
            ...countries.slice(location+action.number-35, location),
            {
              ...countries[location],
              done: false
            },
            ...countries.slice(location+1, countries.length)
          ],
          number: action.number,
          player: [
            ...player.slice(0, turn),
            {
              ...player[turn],
              money:money+2000,
              location: location+action.number-36
            },
            ...player.slice(turn+1, player.length)
          ],
          turn: turn
        }
      }
      return {
        countries: [
          ...countries.slice(0, location),
          {
            ...countries[location],
            done: false
          },
          ...countries.slice(location+1, location+action.number),
          {
            ...countries[location+action.number],
            done: true
          },
          ...countries.slice(location+action.number+1, countries.length)
        ],
        number: action.number,
        player: [
          ...player.slice(0, turn),
          {
            ...player[turn],
            location: location+action.number
          },
          ...player.slice(turn+1, player.length)
        ],
        turn: turn
      };

    case types.DEAL:
      if(countries[location].bought && countries[location].owner !== player[turn].playerName) {
        return {
          countries: countries,
          player: [
            ...player.slice(0, turn),
            {
              ...player[turn],
              money:money - countries[location].price
            },
            ...player.slice(turn+1, player.length)
          ],
          number: number,
          turn: (turn+1)%4
        };
      }
      return {
        countries: countries,
        player: player,
        number: number,
        turn: turn
      };
    
    case types.BUY:
      return {
        countries: [
          ...countries.slice(0, location),
          {
            ...countries[location],
            bought: true,
            owner: player.playerName
          },
          ...countries.slice(location+1, countries.length)
        ],
        player: [
          ...player.slice(0, turn),
          {
            ...player[turn],
            money:money - countries[location].price,
            ownCountries: [...ownCountries, countries[location].name]
          },
          ...player.slice(turn+1, player.length)
        ],
        turn: (turn+1)%4
      };
    default:
      return state;
  }
};

export default counter;
