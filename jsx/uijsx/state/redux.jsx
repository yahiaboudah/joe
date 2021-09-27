const { func } = require("prop-types");


(function Reduxx(g, Redux){

    g[Redux] = Redux;


    Redux.combineReducers = function(reducers)
    {
        var keys = Object.keys(reducers);

        return function(state, action) 
        {
            var totalState = {};
            state = state || {};
            
            keys.forEach(function(key)
            {
              totalState[key] = reducers[key](state[key], action);
            });
            
            return totalState;
        };
    },

    Redux.createStore     = function(reducer)
    {
        var state;
        var listeners = [];

        function getState() {
            return state;
        }

        function subscribe(listener) {
            listeners.push(listener);
            return function unsubscribe() {
            listeners.splice(listeners.indexOf(listener), 1);
            };
        }

        function dispatch(action) {
            state = reducer(state, action);
            listeners.forEach(function(listener) {
            listener();
            });
            return action;
        }

        return {
            getState: getState,
            subscribe: subscribe,
            dispatch: dispatch,
        };
    },

    Redux.

})($.global, {toString: function(){return "Redux"}})