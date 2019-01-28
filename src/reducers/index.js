import * as types from "../actions/actionTypes";

const initialCountries = new Array(100).fill(0).map(
  (foo, index) => {
    return index===0
      ? { id: index, name: `출발지`, price:500*index/100, done: true, bought: false }
      : { id: index, name: `카이로${index}`, price:500*index/100, done: false, bought: false, owner: '' }
  }
);

const initialPlayer = {
  id: 0,
  playerName: `player0`,
  money: 10000,
  location: 0,
  ownCountries: []
}

const initialState = {
  countries: initialCountries,
  player: initialPlayer,
  number: 0
};

function counter(state=initialState, action) {
  const { countries, player, number } = state;
  const { location, money, ownCountries } = player;

  switch(action.type) {
    case types.RANDOM:
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
          player: { ...player, money:money+2000, location: location+action.number-36 }
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
        player: { ...player, location: location+action.number }
      };
    case types.DEAL:
      if(countries[location].bought && countries[location].owner !== player.playerName) {
        return {
          countries: countries,
          player: { ...player, money:money - countries[location].price},
          number: number
        };
      }
      return {
        countries: countries,
        player: { ...player, money:money},
        number: number
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
        player: { ...player, money: money-countries[location].price, ownCountries: [...ownCountries, countries[location].name]},
      };
    default:
      return state;
  }
};

export default counter;
