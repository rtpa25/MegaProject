/** @format */

import { useEffect, useRef } from 'react';
import classes from './Preview.module.css';

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iFrameRef = useRef<any>();

  useEffect(() => {
    iFrameRef.current.srcdoc = html;
    iFrameRef.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className={classes.previewWrapper}>
      <iframe
        ref={iFrameRef}
        srcDoc={html}
        title='preview'
        sandbox='allow-scripts'
      />
    </div>
  );
};

export default Preview;
