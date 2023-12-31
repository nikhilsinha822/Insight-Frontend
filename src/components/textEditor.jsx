import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import plugins from 'suneditor/src/plugins'
import katex from 'katex'
import DataContext from '../context/DataContext';
import { useContext } from 'react';

const Editor = ({ content, setContent }) => {
  const {generateImageUrl} = useContext(DataContext)
  return <SunEditor
    setContents={content}
    onChange={setContent}
    onImageUploadBefore={(files, info, uploadHandler) => {(async () => {
          const {image, imgId} = await generateImageUrl(files[0])
          const response = {
              "errorMessage": "looks like something gone wrong try again",
              "result": [{
                "url": image,
                "name": imgId,
                "size": files[0].size,
              }]
            }
          uploadHandler(response);
      })()
      uploadHandler();
      }
    }
    setOptions={{
      plugins: plugins,
      height: "auto",
      backgroundColor: "black",
      katex: katex,
      minHeight: 'calc(80vh)',
      minWidth: '100%',
      addTagWhitelist: '*',
      mode: 'balloon-always',
      imageMultipleFile: true,
      formats: [ 'blockquote',  'pre'],
      buttonList: [
        ['bold', 'underline', 'italic'],
        ['hiliteColor','formatBlock'],
        ['horizontalRule', 'list'],
        ['table', 'link', 'image', 'video'],
        ['math']
      ],
      
    }}
  />

}

export default Editor