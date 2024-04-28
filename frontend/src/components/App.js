import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RunnerJoin from './RunnerJoin';
import CustomerOrder from './CustomerOrder';
import ThankYouPage from './ThankYouPage';
import RunnerChat from './RunnerChat';
import OrderNotAvailable from './OrderNotAvailable';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={CustomerOrder} />
          <Route path="/join" component={RunnerJoin} />
          <Route path="/thank-you" component={ThankYouPage} />
          <Route path="/chat" component={RunnerChat} />
          <Route path="/order-not-available" component={OrderNotAvailable} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
