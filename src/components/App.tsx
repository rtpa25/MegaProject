/** @format */
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './code-cell';
import './app.css';
import TextEditor from './text-editor';
import CellList from './cell-list';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div>
      <h3 className='subtitle is-1 head'>J book</h3>
      <CellList />
    </div>
  );
}

export default App;
