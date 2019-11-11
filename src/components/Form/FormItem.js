import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateForm } from "../../reducers/actions/updateForm";
import { FORM_INCOMP } from '../Errors/errorTypes'

export class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {slide_id: null, question: null, q_id: null, textAns: ""};
    this.handleTextBox = this.handleTextBox.bind(this);
    this.textboxRef = React.createRef();
    this.submitRef = React.createRef();
    this.formCardRef = React.createRef();
    this.qRef = React.createRef();
    this.readOnly = false;
    this.editable = this.props.editable;
  }

  async submitForm(id, url, auth, ans) {
    var response = await fetch(url + id + "/", {
      method: "PATCH",
      mode: "cors",
      referrer: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth
      },
      body: JSON.stringify({
        "form_answer": ans + '',
        "editable": this.editable + ''
      }),
      redirect: "follow"
    }).catch(err => console.log(err));
    if (response) {
      var jsonres = await response.json().catch(err => console.log(err));
      this.setState({ data: jsonres });
    }
  }

  disableCard() {
    this.formCardRef.current.classList.value = this.formCardRef.current.classList.value + " uneditable"
    this.textboxRef.current.classList.value = this.textboxRef.current.classList.value + " uneditable"
}

  componentDidMount() {
    this.setState({
      slide_id: this.props.sldrid,
      question: this.props.ques,
      q_id: this.props.q_id
    });
    if (this.editable === false) {
      this.disableCard();
    }
  }

  componentDidUpdate() {
    if (this.props.errors.available) {
      //console.log(this.props.currentForm[this.props.ques_id-1].q_ans)
      if(this.props.errors.type === FORM_INCOMP && this.props.currentForm[this.props.ques_id-1].q_ans === null){
        //console.log(this.props.ques_id + " is incomplete.")
        this.formCardRef.current.classList.value = this.formCardRef.current.classList.value + " error-incomp"

      }
    }
  }

  handleTextBox(e) {
    this.setState({textAns: e.target.value});
    var form = this.props.currentForm;
    form[this.props.ques_id-1].q_ans = this.state.textAns;
    form[this.props.ques_id-1].form_id = this.state.q_id;
    this.props.updateForm(form);
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-card" ref={this.formCardRef}>
            <div className="qletter">
              <h1 className="h1-large">{this.state.slide_id + "."}</h1>
            </div>
            <div className="question" ref={this.qRef}>
              <h2>{this.state.question}</h2>
            </div>
            <div className="ans">
              <div className="ansboxg">
                <textarea
                  className="anstext "
                  rows="4"
                  cols="50"
                  onChange = {this.handleTextBox}
                  ref = {this.textboxRef}
                  readOnly={this.readOnly}
                ></textarea>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  className="svg-submit white"
                  id="svg-submit-1"
                  onClick={this.extractResponse}
                >

                </svg>
              </div>
              {/* <p className="req">This field is required.</p> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { subState, currentSub, currentForm, errors } = state;
  return { subState: subState, currentSub: currentSub, currentForm, ownProps, errors };
};

export default connect(
  mapStateToProps, { updateForm }
)(FormItem);
