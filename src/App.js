import React, { useState } from "react";
import { Provider, connect } from "react-redux";
import store from "./Store.js";
import { BossApp } from "./components/App/BossApp.js";

const App = props => {
  const [state] = useState(props);
  console.log(store.getState());
  return (
    <Provider store={store}>
     <BossApp state={store.getState()}/>
    </Provider>
  );
}
 

// const mapStateToProps = (state) => {
//   return state;
// };


// export default connect(
//   mapStateToProps
// )(App);
export default App;