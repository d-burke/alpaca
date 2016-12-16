import React from "react";
import axios from "axios";

export default class AddQuiz extends React.Component {
 constructor(props) {
    super(props);
  }

  componentWillUnmount() {
     document.getElementById('messagesContainer').innerHTML = '';
  }

  // this actually pushes the current values to the server using a post request
  // with axios
  sendCustomTemplate(e) {
    e.preventDefault();

    // an array of objects for each input field, with 'name' and 'value' keys
    var $form = $('.form-customquiz').serializeArray();
    var testName, question, correct, wrong1, wrong2, wrong3;

    $form.forEach(function (field) {
      if (field.name === 'testName') {
        testName = field.value;
      } else if (field.name === 'question') {
        question = field.value;
      } else if (field.name === 'answer') {
        correct = field.value;
      } else if (field.name === 'option1') {
        wrong1 = field.value;
      } else if (field.name === 'option2') {
        wrong2 = field.value;
      } else if (field.name === 'option3') {
        wrong3 = field.value;
      }
    });

    axios.post('/questions', {
      name: question,
      correct: correct,
      wrong1: wrong1,
      wrong2: wrong2,
      wrong3: wrong3,
      testName: testName,
    })
    .then(() => {
      $(':input', '.form-customquiz')
      .not('input[name=testName]')
      .val('');
      this.setMessage('Quiz added!', 'success');
    })
    .catch(function (err) {
      console.error('error:', err);
    });
  }

  setMessage(message, type = 'info') {
    document.getElementById('messagesContainer').innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
  }


  render() {
    return (
      <div className="container customquiz">
        <div className="col-md-12">
          <div className='row'>
            <div className='col-md-6' >
              <h1>Build a Custom Quiz</h1>

              <form className="form-customquiz customquiz">
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="testName">Test Name</label>
                  <div className="col-xs-8">
                    <input name="testName" type="text" className="form-control" placeholder="Enter the Name of this Test" required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="question">Question</label>
                  <div className="col-xs-8">
                    <input name="question" type="text" className="form-control" placeholder="Enter a question" required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="answer">Correct</label>
                  <div className="col-xs-8">
                    <input name="answer" type="text" className="form-control" placeholder="Enter an answer"  maxLength="25" required></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option1">Wrong 1</label>
                  <div className="col-xs-8">
                    <input name="option1" type="text" className="form-control" placeholder="Enter an answer" maxLength="25"></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option2">Wrong 2</label>
                  <div className="col-xs-8">
                    <input name="option2" type="text" className="form-control" placeholder="Enter an answer" maxLength="25"></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option3">Wrong 3</label>
                  <div className="col-xs-8">
                    <input name="option3" type="text" className="form-control" placeholder="Enter an answer" maxLength="25"></input>
                  </div>
                </div>

                <button className="btn btn-sm btn-primary" type="submit" onClick={(e) => this.sendCustomTemplate(e) }>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
