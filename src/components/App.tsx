/** @format */
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';
import CellList from './cell-list';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div>
      <h3 className='subtitle is-1 head'>R book</h3>
      <CellList />
    </div>
  );
}

export default App;
