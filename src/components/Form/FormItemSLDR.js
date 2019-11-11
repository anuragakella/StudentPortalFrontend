import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateForm } from "../../reducers/actions/updateForm";
import { FORM_INCOMP } from '../Errors/errorTypes'


export class FormItemSLDR extends Component {
  constructor(props) {
    super(props);
    this.state = {slide_id: null, question: null, q_id: null};
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
        "Authorization": auth
      },
      body: JSON.stringify({
        "form_answer": ans + '',
        "editable": editable + ''
      }),
      redirect: "follow"
    }).catch(err => console.log(err));
    if (response) {
      let jsonres = await response.json().catch(err => console.log(err));
      this.setState({ data: jsonres });
    }
  }

  disableCard() {
      this.submitRef.current.classList.value = this.submitRef.current.classList.value + " uneditable"
      this.sliderRef.current.classList.value = this.sliderRef.current.classList.value + " uneditable"
      this.sliderRef.current.style.visibility = "hidden";
      this.formCardRef.current.classList.value = this.formCardRef.current.classList.value + " uneditable"
      this.sldrLabRef.current.classList.value = this.sldrLabRef.current.classList.value + " disappear"
  }

  componentDidMount() {
    this.setState({slide_id: this.props.sldrid, question: this.props.ques, q_id: this.props.q_id, status: this.state.status+1});
    if(this.editable === false){this.disableCard();}
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
              <h2>
              </h2>
            </div>
            <div className="ans">
              <div className="ansboxg">
                <input className="sldr sldr-form-card" ref={this.sliderRef} id={"sldr-"+this.state.slide_id} stepp="1" type="range" min="1" max="10" defaultValue ="0" onChange={this.handleChange}></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  className="svg-submit white"
                  id="svg-submit-1"
                  ref={this.submitRef}
                >
                 
                </svg>
                <div className="sldr-value noselect" ref={this.sldrLabRef}>
                <div className="sldr-labels" >
                <h3 id="sldr-t-1" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 1; this.handleChange();}}>1</h3>
                <h3 id="sldr-t-2" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 2; this.handleChange();}}>2</h3>
                <h3 id="sldr-t-3" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 3; this.handleChange();}}>3</h3>
                <h3 id="sldr-t-4" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 4; this.handleChange();}}>4</h3>
                <h3 id="sldr-t-5" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 5; this.handleChange();}}>5</h3>
                <h3 id="sldr-t-6" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 6; this.handleChange();}}>6</h3>
                <h3 id="sldr-t-7" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 7; this.handleChange();}}>7</h3>
                <h3 id="sldr-t-8" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 8; this.handleChange();}}>8</h3>
                <h3 id="sldr-t-9" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 9; this.handleChange();}}>9</h3>
                <h3 id="sldr-t-10" onClick= {() => {document.getElementById("sldr-"+this.state.slide_id).value = 10; this.handleChange();}}>10</h3>
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
  return { subState: subState, currentSub: currentSub, currentForm, ownProps, errors };
};

export default connect(
  mapStateToProps,
  { updateForm }
)(FormItemSLDR);
