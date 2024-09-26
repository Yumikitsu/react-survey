import { useState } from "react";

function Survey() {
  const [open, setOpen] = useState(false); //Ignore this state

  // Used for resetting the formData
  const initialFormData = () => ({
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

  const [formData, setFormData] = useState(
    {
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

  // Handle the submit event
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)

    // Reset the form
    event.target.reset()

    // Reset the form data
    setFormData(initialFormData)
  }

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

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        {/* answers should go here */}
      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck consistency</h3>
            <ul>
              {/* 1 radio-button per li */}
              <li>
                <input id="consistency-one" type="radio" name="consistency" value="1" onChange={handleRadioChange} />
                <label htmlFor="consistency-one">1</label>
              </li>
              <li>
                <input id="consistency-two" type="radio" name="consistency" value="2" onChange={handleRadioChange}/>
                <label htmlFor="consistency-two">2</label>
              </li>
              <li>
                <input id="consistency-three" type="radio" name="consistency" value="3" onChange={handleRadioChange}/>
                <label htmlFor="consistency-three">3</label>
              </li>
              <li>
                <input id="consistency-four" type="radio" name="consistency" value="4" onChange={handleRadioChange}/>
                <label htmlFor="consistency-four">4</label>
              </li>
            </ul>
            <h3>How do you rate your rubber duck colour?</h3>
            <ul>
              {/* 1 radio-button per li */}
              <li>
                <input id="color-one" type="radio" name="color" value="1" onChange={handleRadioChange}/>
                <label htmlFor="color-one">1</label>
              </li>
              <li>
                <input id="color-two" type="radio" name="color" value="2" onChange={handleRadioChange}/>
                <label htmlFor="color-two">2</label>
              </li>
              <li>
                <input id="color-three" type="radio" name="color" value="3" onChange={handleRadioChange}/>
                <label htmlFor="color-three">3</label>
              </li>
              <li>
                <input id="color-four" type="radio" name="color" value="4" onChange={handleRadioChange}/>
                <label htmlFor="color-four">4</label>
              </li>
            </ul>
            <h3>How do you rate your rubber duck logo?</h3>
            <ul>
              {/* 1 radio-button per li */}
              <li>
                <input id="logo-one" type="radio" name="logo" value="1" onChange={handleRadioChange}/>
                <label htmlFor="logo-one">1</label>
              </li>
              <li>
                <input id="logo-two" type="radio" name="logo" value="2" onChange={handleRadioChange}/>
                <label htmlFor="logo-two">2</label>
              </li>
              <li>
                <input id="logo-three" type="radio" name="logo" value="3" onChange={handleRadioChange}/>
                <label htmlFor="logo-three">3</label>
              </li>
              <li>
                <input id="logo-four" type="radio" name="logo" value="4" onChange={handleRadioChange}/>
                <label htmlFor="logo-four">4</label>
              </li>
            </ul>
          </div>
          <div className="form__group">
            <h3>What would you say are the best features of your rubber duck?</h3>
            <ul>
              {/* 1 Checkbox per li */}
              <li>
                <label><input name="bestFeatures" type="checkbox" value="yellow" onChange={handleCheckboxChange}/>{`It's yellow!`}</label>
              </li>
              <li>
                <label><input name="bestFeatures" type="checkbox" value="logo" onChange={handleCheckboxChange}/>It has a logo!</label>
              </li>
              <li>
                <label><input name="bestFeatures" type="checkbox" value="squeaks" onChange={handleCheckboxChange}/>It squeaks!</label>
              </li>
              <li>
                <label><input name="bestFeatures" type="checkbox" value="big" onChange={handleCheckboxChange}/>{`It's big!`}</label>
              </li>
            </ul>
            <h3>What would you say are the worst features of your rubber duck?</h3>
            <ul>
              {/* 1 Checkbox per li */}
              <li>
                <label><input name="worstFeatures" type="checkbox" value="yellow" onChange={handleCheckboxChange}/>{`It's yellow!`}</label>
              </li>
              <li>
                <label><input name="worstFeatures" type="checkbox" value="logo" onChange={handleCheckboxChange}/>It has a logo!</label>
              </li>
              <li>
                <label><input name="worstFeatures" type="checkbox" value="squeaks" onChange={handleCheckboxChange}/>It squeaks!</label>
              </li>
              <li>
                <label><input name="worstFeatures" type="checkbox" value="big" onChange={handleCheckboxChange}/>{`It's big!`}</label>
              </li>
            </ul>
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              {/* 1 Checkbox per li */}
              <li>
                <label><input name="spendTime" type="checkbox" value="swimming" onChange={handleCheckboxChange}/>Swimming</label>
              </li>
              <li>
                <label><input name="spendTime" type="checkbox" value="bathing" onChange={handleCheckboxChange}/>Bathing</label>
              </li>
              <li>
                <label><input name="spendTime" type="checkbox" value="chatting" onChange={handleCheckboxChange}/>Chatting</label>
              </li>
              <li>
                <label><input name="spendTime" type="checkbox" value="noTime" onChange={handleCheckboxChange}/>{`I don't like to spend time with it`}</label>
              </li>
            </ul>
          </div>
          <label>What else have you got to say about your rubber duck?
            <textarea name="review" cols="30" rows="10" onChange={handleTextChange}></textarea>
          </label>
          <label>Put your name here (if you feel like it):
            <input type="text" name="username" value={formData.username} onChange={handleTextChange}/>
          </label>
          <label>Leave us your email pretty please??
            <input type="email" name="email" value={formData.email} onChange={handleTextChange}/>
          </label>
            <input className="form__submit" type="submit" value="Submit Survey!" />
        </form>
      </section>
    </main>
  );
}

export default Survey;
