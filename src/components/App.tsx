/** @format */
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './code-cell';
import './app.css';
import TextEditor from './text-editor';

function App() {
  return (
    <div>
      <h3 className='subtitle is-1 head'>J book</h3>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
}

export default App;
