import React, { Component } from "react";
import { connect } from "react-redux";
import { updateForm } from "../../reducers/actions/updateForm";
import { FORM_INCOMP } from '../Errors/errorTypes'


export class FormItemBOOL extends Component {
  constructor(props) {
    super(props);
    this.state = { slide_id: null, question: null, q_id: null, sldr_val: null };
    this.handleChange = this.handleChange.bind(this);
    this.sliderRef = React.createRef();
    this.submitRef = React.createRef();
    this.formCardRef = React.createRef();
    this.sldrLabRef = React.createRef();
    this.editable = this.props.editable;
  }

  async submitForm(id, url, auth, ans, editable) {
    var response = await fetch(url + id + "/", {
      method: "PATCH",
      mode: "cors",
      referrer: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        form_answer: ans + "",
        editable: editable + ""
      }),
      redirect: "follow"
    }).catch(err => console.log(err));
    if (response) {
      let jsonres = await response.json().catch(err => console.log(err));
      this.setState({ data: jsonres });
    }
  }

  disableCard() {
    this.submitRef.current.classList.value =
      this.submitRef.current.classList.value + " uneditable";
    this.sliderRef.current.classList.value =
      this.sliderRef.current.classList.value + " uneditable";
    this.sliderRef.current.style.visibility = "hidden";
    this.formCardRef.current.classList.value =
      this.formCardRef.current.classList.value + " uneditable";
    this.sldrLabRef.current.classList.value =
      this.sldrLabRef.current.classList.value + " disappear";
  }


  componentDidMount() {
    this.setState({
      slide_id: this.props.sldrid,
      question: this.props.ques,
      q_id: this.props.q_id,
      currentForm: this.props.currentForm
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

  handleChange() {
    this.setState({ sldr_val: this.sliderRef.current.value });
    var form = this.props.currentForm;
    form[this.props.ques_id - 1].q_ans = this.sliderRef.current.value;
    form[this.props.ques_id-1].form_id = this.state.q_id;
    this.setState({
      currentForm: form
    });
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
            <div className="question">
              <h2>{this.state.question}</h2>
            </div>
            <div className="ans">
              <div className="ansboxg">
                <input
                  className="sldr sldr-form-card"
                  ref={this.sliderRef}
                  id={"sldr-" + this.state.slide_id}
                  step="5"
                  type="range"
                  min="0"
                  max="5"
                  defaultValue="0"
                  onChange={this.handleChange}
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  className="svg-submit white"
                  id="svg-submit-1"
                  ref={this.submitRef}
                ></svg>
                <div className="sldr-value noselect" ref={this.sldrLabRef}>
                  <div className="sldr-labels">
                    <h3
                      id="sldr-t-1"
                      onClick={() => {
                        this.handleChange();
                        document.getElementById(
                          "sldr-" + this.state.slide_id
                        ).value = 0;
                      }}
                    >
                      Yes
                    </h3>
                    <h3 id="sldr-t-2" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-3" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-4" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-5" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-6" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-7" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-8" style={{cursor: 'context-menu'}}> </h3>
                    <h3 id="sldr-t-9" style={{cursor: 'context-menu'}}> </h3>
                    <h3
                      id="sldr-t-10"
                      onClick={() => {
                        this.handleChange();
                        document.getElementById(
                          "sldr-" + this.state.slide_id
                        ).value = 5;
                      }}
                    >
                      No
                    </h3>
                  </div>
                </div>
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
  return { subState: subState, currentSub: currentSub, ownProps, currentForm, errors };
};

export default connect(
  mapStateToProps,
  { updateForm }
)(FormItemBOOL);
