import { useState, useEffect } from "react";
import axios from 'axios';
import AnswersList from "./AnswersList";

function Survey() {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false); //Ignore this state

  // Used for resetting the formData
  const initialFormData = () => ({
    id: "-1",
    consistency: "",
    color: "",
    logo: "",
    bestFeatures: {
      yellow: "",
      logo: "",
      squeaks: "",
      big: ""
    },
    worstFeatures: {
      yellow: "",
      logo: "",
      squeaks: "",
      big: ""
    },
    spendTime: {
      swimming: "",
      bathing: "",
      chatting: "",
      noTime: ""
    },
    review: "",
    username: "",
    email: ""
  })

  // Form Data
  const [formData, setFormData] = useState(
    {
      id: "-1",
      consistency: "",
      color: "",
      logo: "",
      bestFeatures: {
        yellow: "",
        logo: "",
        squeaks: "",
        big: ""
      },
      worstFeatures: {
        yellow: "",
        logo: "",
        squeaks: "",
        big: ""
      },
      spendTime: {
        swimming: "",
        bathing: "",
        chatting: "",
        noTime: ""
      },
      review: "",
      username: "",
      email: ""
    }
  )

  // Keeps track of all the submitted data
  const [submittedData, setSubmittedData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/answers')
      .then(response => {
        setSubmittedData(response.data)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  // Key to give each form a unique key value
  const [formKey, setFormKey] = useState(Date.now())

  const [editMode, setEditMode] = useState(false)

  // Handle the submit event
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)

    if(editMode) {
      axios.put(`http://localhost:3000/answers/${formData.id}`, formData)
        .then(response => {
          console.log(response.data)
          handleSubmittedData()
          setFormData(initialFormData())
          // Set edit mode to false
          setEditMode(false)
        })
        .catch(error => console.error('Error updating data:', error))
    } else {
      axios.post('http://localhost:3000/answers', formData)
        .then(response => {
          console.log(response.data)
          handleSubmittedData()
          setFormData(initialFormData())
        })
        .catch(error => console.error('Error updating data:', error))
    }

    // Add the formData to the submitted data list
    //handleSubmittedData()

    // Reset the form data
    //setFormData(initialFormData())

    // Update the form key
    setFormKey(Date.now())
  }

  // setSubmittedData handlings
  const handleSubmittedData = () => {
    let updated = false

    // Check if old answer should get updated
    const updatedData = submittedData.map((data) => {
      if (data.id === formData.id) {
        updated = true
        return formData
      }
      return data
    })

    // Add a new answer
    if(!updated) {
      setSubmittedData([...submittedData, formData])
    } else {
      setSubmittedData(updatedData)
    }
  }

  // Create a new id
  const newId = () => {
    let id = 0
    let unique = false
    while(!unique) {
      unique = true
      for(let i = 0; i < submittedData.length; i++) {
        if (submittedData[i].id === `${id}`) {
          id++
          unique = false
          break
        }
      }
    }
    return `${id}`
  }

  // Update the form data to give it a unique ID if it's the default id
  useEffect(() => {
    if (formData.id === '-1') {
      setFormData((data) => ({
        ...data, id: newId()
      }))
    }
  }, [formData])

  // Handle a freetext change event
  const handleTextChange = (event) => {
    setFormData({...formData, [event.target.name]:event.target.value})
  }

  // Handle a checkbox change event
  const handleCheckboxChange = (event) => {
    setFormData({...formData, [event.target.name]: {...formData[event.target.name], [event.target.value]: event.target.checked ? event.target.closest('label').innerText : ""}})
  }

  // Handle a radio change event
  const handleRadioChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  // Handle an answer list selection event
  const handleAnswerSelection = (id, deleteAnswer) => {
    // If delete is true, remove the answer from answerList
    if (deleteAnswer) {
      axios.delete(`http://localhost:3000/answers/${id}`)
        .then(() => {
          setSubmittedData((data) => data.filter((answer) => answer.id !== id))
        })
        .catch(error => console.error('Error deleting data:', error))
      //setSubmittedData((data) => data.filter((answer) => answer.id !== id))
    } else { // Set the formData to the submittedData with the same id
      const selectedAnswer = submittedData.find((answer) => answer.id === id)
      if (selectedAnswer) {
        setFormData(selectedAnswer)
        setEditMode(true)
      }
    }
  }

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={submittedData} onAnswerSelect={handleAnswerSelection}/>
      </section>
      <section className="survey__form">
        <form key={formKey} className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck consistency?</h3>
            <ul>
              {/* 1 radio-button per li */}
              <li>
                <input id="consistency-one" type="radio" name="consistency" value="1" checked={formData.consistency === '1'} onChange={handleRadioChange} />
                <label htmlFor="consistency-one">1</label>
              </li>
              <li>
                <input id="consistency-two" type="radio" name="consistency" value="2" checked={formData.consistency === '2'} onChange={handleRadioChange}/>
                <label htmlFor="consistency-two">2</label>
              </li>
              <li>
                <input id="consistency-three" type="radio" name="consistency" value="3" checked={formData.consistency === '3'} onChange={handleRadioChange}/>
                <label htmlFor="consistency-three">3</label>
              </li>
              <li>
                <input id="consistency-four" type="radio" name="consistency" value="4" checked={formData.consistency === '4'} onChange={handleRadioChange}/>
                <label htmlFor="consistency-four">4</label>
              </li>
            </ul>
            <h3>How do you rate your rubber duck colour?</h3>
            <ul>
              {/* 1 radio-button per li */}
              <li>
                <input id="color-one" type="radio" name="color" value="1" checked={formData.color === '1'} onChange={handleRadioChange}/>
                <label htmlFor="color-one">1</label>
              </li>
              <li>
                <input id="color-two" type="radio" name="color" value="2" checked={formData.color === '2'} onChange={handleRadioChange}/>
                <label htmlFor="color-two">2</label>
              </li>
              <li>
                <input id="color-three" type="radio" name="color" value="3" checked={formData.color === '3'} onChange={handleRadioChange}/>
                <label htmlFor="color-three">3</label>
              </li>
              <li>
                <input id="color-four" type="radio" name="color" value="4" checked={formData.color === '4'} onChange={handleRadioChange}/>
                <label htmlFor="color-four">4</label>
              </li>
            </ul>
            <h3>How do you rate your rubber duck logo?</h3>
            <ul>
              {/* 1 radio-button per li */}
              <li>
                <input id="logo-one" type="radio" name="logo" value="1" checked={formData.logo === '1'} onChange={handleRadioChange}/>
                <label htmlFor="logo-one">1</label>
              </li>
              <li>
                <input id="logo-two" type="radio" name="logo" value="2" checked={formData.logo === '2'} onChange={handleRadioChange}/>
                <label htmlFor="logo-two">2</label>
              </li>
              <li>
                <input id="logo-three" type="radio" name="logo" value="3" checked={formData.logo === '3'} onChange={handleRadioChange}/>
                <label htmlFor="logo-three">3</label>
              </li>
              <li>
                <input id="logo-four" type="radio" name="logo" value="4" checked={formData.logo === '4'} onChange={handleRadioChange}/>
                <label htmlFor="logo-four">4</label>
              </li>
            </ul>
          </div>
          <div className="form__group">
            <h3>What would you say are the best features of your rubber duck?</h3>
            <ul>
              {/* 1 Checkbox per li */}
              <li>
                <label><input name="bestFeatures" type="checkbox" value="yellow" checked={formData.bestFeatures.yellow !== ''} onChange={handleCheckboxChange}/>{`It's yellow!`}</label>
              </li>
              <li>
                <label><input name="bestFeatures" type="checkbox" value="logo" checked={formData.bestFeatures.logo !== ''} onChange={handleCheckboxChange}/>It has a logo!</label>
              </li>
              <li>
                <label><input name="bestFeatures" type="checkbox" value="squeaks" checked={formData.bestFeatures.squeaks !== ''} onChange={handleCheckboxChange}/>It squeaks!</label>
              </li>
              <li>
                <label><input name="bestFeatures" type="checkbox" value="big" checked={formData.bestFeatures.big !== ''} onChange={handleCheckboxChange}/>{`It's big!`}</label>
              </li>
            </ul>
            <h3>What would you say are the worst features of your rubber duck?</h3>
            <ul>
              {/* 1 Checkbox per li */}
              <li>
                <label><input name="worstFeatures" type="checkbox" value="yellow" checked={formData.worstFeatures.yellow !== ''} onChange={handleCheckboxChange}/>{`It's yellow!`}</label>
              </li>
              <li>
                <label><input name="worstFeatures" type="checkbox" value="logo" checked={formData.worstFeatures.logo !== ''} onChange={handleCheckboxChange}/>It has a logo!</label>
              </li>
              <li>
                <label><input name="worstFeatures" type="checkbox" value="squeaks" checked={formData.worstFeatures.squeaks !== ''} onChange={handleCheckboxChange}/>It squeaks!</label>
              </li>
              <li>
                <label><input name="worstFeatures" type="checkbox" value="big" checked={formData.worstFeatures.big !== ''} onChange={handleCheckboxChange}/>{`It's big!`}</label>
              </li>
            </ul>
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              {/* 1 Checkbox per li */}
              <li>
                <label><input name="spendTime" type="checkbox" value="swimming" checked={formData.spendTime.swimming !== ''} onChange={handleCheckboxChange}/>Swimming</label>
              </li>
              <li>
                <label><input name="spendTime" type="checkbox" value="bathing" checked={formData.spendTime.bathing !== ''} onChange={handleCheckboxChange}/>Bathing</label>
              </li>
              <li>
                <label><input name="spendTime" type="checkbox" value="chatting" checked={formData.spendTime.chatting !== ''} onChange={handleCheckboxChange}/>Chatting</label>
              </li>
              <li>
                <label><input name="spendTime" type="checkbox" value="noTime" checked={formData.spendTime.noTime !== ''} onChange={handleCheckboxChange}/>{`I don't like to spend time with it`}</label>
              </li>
            </ul>
          </div>
          <label>What else have you got to say about your rubber duck?
            <textarea name="review" cols="30" rows="10" value={formData.review} onChange={handleTextChange}></textarea>
          </label>
          <label>Put your name here (if you feel like it):
            <input type="text" name="username" value={formData.username} onChange={handleTextChange}/>
          </label>
          <label>Leave us your email pretty please??
            <input type="email" name="email" value={formData.email} onChange={handleTextChange}/>
          </label>
            <input className="form__submit" type="submit" value={!editMode ? "Submit Survey!" : "Save Changes"} />
        </form>
      </section>
    </main>
  );
}

export default Survey;
