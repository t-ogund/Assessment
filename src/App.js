import React, {useState} from 'react'
import data from './activity.json'
import MultiSelect from './MultiSelect/MultiSelect';
import SingleSelect from './SingleSelect/SingleSelect';
import './global-styles.scss';

function App() {

  /*
    This is a technical assessment designed to get a feel for how you approach problems. 
  */

  // REQUIREMENTS:
  // 1) SCSS CHALLENGE - style the single select. Flex your CSS skills. Show some animations; make the feedback a modal, etc. See example screenshot from a course in the SingleSelect folder.
  // 2) REACTJS CHALLENGE - OPTIONAL - Using hooks, implement the multi select component. Further instructions in MultiSelect.js.

  const [segmentIndex, setSegmentIndex] = useState(0);
  const currentSegment = data.segments[segmentIndex];

  const handleSegmentComplete = () => {
      if(data.segments.length > segmentIndex + 1){
        setSegmentIndex(segmentIndex + 1)
      }else{
        alert('all done')
      }
  }

  return (
    <div className="App">
      {
        currentSegment.type === 'single-select' && 
        <SingleSelect data={currentSegment} onComplete={handleSegmentComplete}/>
      }
      {
        currentSegment.type === 'multi-select' && 
        <MultiSelect data={currentSegment} onComplete={handleSegmentComplete}/>
      }
    </div>
  );
}

export default App;
