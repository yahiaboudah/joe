
(function Reduxx(g, Redux){

    g[Redux] = Redux;

    // [CREATE STORE]
    Redux.createStore     = function(reducer)
    {
        var state;
        var listeners = [];

        function getState() 
        {
            return state;
        }

        function subscribe(listener) 
        {
            listeners.push(listener);
            return function unsubscribe() {
            listeners.splice(listeners.indexOf(listener), 1);
            };
        }

        function dispatch(action) 
        {
            state = reducer(state, action);
            listeners.forEach(function(listener) { listener(); });
            return action;
        }

        return {
            getState : getState,
            subscribe: subscribe,
            dispatch : dispatch,
        };
    },

    // [COMBINE REDUCERS]
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

    // [BIND ACTION CREATORS]
    Redux.bindActionCreators = function(actionCreators, dispatch) 
    {
        var bounded = {};
        Object.keys(actionCreators).forEach(function(key)
        {
        
            var actionCreator = actionCreators[key];
            bounded[key] = function() 
            {
                dispatch(actionCreator.apply(null,  
                    Array.prototype.slice.call(arguments)));
            };
        
        });
        return bounded;
    },

    // [APPLY MIDDLEWARE]
    Redux.applyMiddleware  = function(middleware) 
    {
        return function(createStore){
          
            return function(reducer){
                
                var store = createStore(reducer);
                
                return {
            
                getState: store.getState,
                subscribe: store.subscribe,
                dispatch: function dispatch(action)
                {
                    return middleware(store)(store.dispatch)(action);
                },
                
                };
            };
        }
    }

})($.global, {toString: function(){return "Redux"}})