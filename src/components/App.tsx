/** @format */
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import classes from './App.module.css';
import { fetchPlugin } from '../plugins/fetch-plugin';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import CodeEditor from './code-editor';

function App() {
  const [input, setInput] = useState('');
  const ref = useRef<any>();
  const iFrameRef = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iFrameRef.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    iFrameRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  };

  const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener(
          'message',
          (event) => {
            try {
              eval(event.data);
            } catch (error) {
              const root = document.querySelector('#root');
              root.innerHTML =
                '<div style="color: red;"><h4>My App is great your code suck</h4>' +
                error +
                '</div>';
              console.error(error);
            }
          },
          false
        );
      </script>
    </body>
  </html>
  `;

  return (
    <div className={classes.container}>
      <h3>J book protoype-1</h3>
      <CodeEditor initialValue='hello' onChange={() => {}} />
      <textarea
        spellCheck='false'
        className={classes.ta}
        value={input}
        onChange={(e) => setInput(e.target.value)}></textarea>
      <button className={classes.btn} onClick={onClick}>
        Submit
      </button>
      <div className={classes.pre}>
        {/* <pre>{code}</pre> */}
        {/* disable access to some browser centric properties like localStorage */}
        <iframe
          ref={iFrameRef}
          title='J Book Protoype'
          sandbox='allow-scripts'
          srcDoc={html}
        />
      </div>
    </div>
  );
}

export default App;
