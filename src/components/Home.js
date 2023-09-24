import Editor from "./Editor";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
  /**
   * html / css / js is getting value from useLocalStorage custom hook
   * again setLanguage is comming from the custom hook, and is again passed to the editor
   * which will record all the changes made in the editor
   * this will change the value of html / css / js, which will trigger useEffect hook in useLocalStorage custom hook, 
   * thus saving data in the local storage
   */
    const [html, setHtml] = useLocalStorage('html', ''); 
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcDoc, setSrcDoc] = useState('');
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setSrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `)
      }, 250);
      /**
       * we have used setTimeOut because, we don't want to change the value instantly as we type each letter
       */
  
      return () => clearTimeout(timeout);
    }, [html, css, js]); //every time the value of html / css / js changes, reset the source code for the iframe
  
    return (
      <>
        <div className="pane top-pane">
          {/* html editor */}
          <Editor 
            language='xml'
            displayName='HTML'
            value={html}
            onChange={setHtml}
          />
          {/* css editor */}
          <Editor 
            language='css'
            displayName='CSS'
            value={css}
            onChange={setCss}
          />
          {/* jss editor */}
          <Editor 
            language='javascript'
            displayName='JS'
            value={js}
            onChange={setJs}
          />
        </div>
        <div className="pane">
          <iframe 
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </>
    );
}

export default Home