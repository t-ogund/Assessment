import React, { useState } from 'react'
import './MultiSelect.scss'

// this is a stub for you to develop the following

/*
    PART 2 - OPTIONAL 
    
    Develop a component similar to the single select that allows multiple options to be selected. 

    This will include an ability to toggle each option, and then click a submit button for grading.

    Grading will indicate visually on each option if it was correct or not. This implies 4 states for each button - selected and correct, selected and incorrect, not selected and correct, not selected and incorrect.

    The generic feedback shown in the data is binary - either you got it 100% correct and get the correct feedback, or you don't. 
*/


const MultiSelect = props => {

    const [choice, setChoice] = useState(-1);
    const [submit, setSubmit] = useState(false);
   

    function handleClick(i) {
        const optionButtons = document.querySelectorAll(".option-button");
       
        if (optionButtons[i].classList.contains("picked") === false) {
            optionButtons[i].classList.add("picked");
        } else {
            optionButtons[i].classList.remove("picked");
        }
    }

    function submitAnswer() {
        setSubmit(true)
        let submitButtonSection = document.querySelector(".submit-button-section");
        let answerResult = document.querySelectorAll(".answer-result");
        for (let i = 0; i < answerResult.length; i++) {
            answerResult[i].style.display = "block";
        }
        setTimeout(function() {
            submitButtonSection.style.display = "none";
            setChoice(0);
        }, 5000)
    }

    function next() {
        setChoice(0)
        let submitButtonSection = document.querySelector(".submit-button-section");
        submitButtonSection.style.display = "none";
    }

    const selectedOptionButtons = document.querySelectorAll(".option-button");
    const finalSelectedAnswers = [];
    const finalValues = [];

    for (let i = 0; i < selectedOptionButtons.length; i++) {
        if (selectedOptionButtons[i].classList.contains("picked")) {
            finalSelectedAnswers.push(selectedOptionButtons[i]);
            finalValues.push(props.data.options[i].correct)
        }
    }

    let correct = null;
    if (finalValues.length === 3 && finalValues.includes(undefined) === false) {
        correct = true;
    } else {
        correct = false;
    }
  
    return(
        <div className={`MultiSelect`}>
            <div className={`card-container`}>
                <div className={`header-container`}>
                    <h1>
                        {props.data.questionText}
                    </h1>
                </div>
                <div className={`options`}>
                {
                    choice === -1 && 
                    props.data.options.map((option, x) => {
                        return (
                            <React.Fragment>
                            <div className="answer-feedback-container">
                                <button className={`option-button`} onClick={()=>{handleClick(x)}}>{option.text}</button>
                                <div className={`answer-feedback`}>
                                    {option.correct ? <h4 className={`answer-result`} style={{color: "rgb(63, 223, 31)"}}>Correct</h4> : <h4 className={`answer-result`} style={{color: "red"}}>Incorrect</h4>}
                                </div>
                            </div>
                            </React.Fragment>
                        )
                    })
                  
                }
                <div className={`submit-button-section`}>
                    {submit === false ? <button onClick={submitAnswer} className={`submit-button`}>Submit</button> : <button onClick={next} className={`submit-button`}>Next</button> }
                </div>
                </div>
            </div>
            {
                choice > -1 && 
                <div className={`feedback-container`}>
                    <div className={`feedback`}>
                        {
                         correct ? <h1 style={{color: "black"}}>{props.data.feedback.correct.header}</h1> : <h1 style={{color: "black"}}>{props.data.feedback.incorrect.header}</h1>
                        }
                        {
                         correct ? <p style={{color: "black"}}>{props.data.feedback.correct.body}</p> : <p style={{color: "black"}}>{props.data.feedback.incorrect.body}</p>
                        }
                    <button className={`feedback-button`} onClick={props.onComplete}>OK</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default MultiSelect
