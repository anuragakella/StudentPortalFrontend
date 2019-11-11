import React, { Component } from "react";
import FormItem from "../Form/FormItem";
import FormItemSLDR from "../Form/FormItemSLDR";
import FormItemBOOL from "../Form/FormItemBOOL";
import { connect } from "react-redux";
import { loadForm } from "../../reducers/actions/loadForm";
import { needSwitch } from "../../reducers/actions/needSwitch";
import { updateForm } from "../../reducers/actions/updateForm";
import { sendError } from "../../reducers/actions/sendError";
import ErrorManager from "../Errors/ErrorManager";
import { FORM_INCOMP, NO_ERROR } from "../Errors/errorTypes";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needUpdate: false,
      data: null,
      currentForm: null,
      errors: {}
    };
    this.btnRef = React.createRef();
    this.getData = this.getData.bind(this);
    this.generateForm = this.generateForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.shakeBtn = this.shakeBtn.bind(this);
    this.countNull = this.countNull.bind(this);
    this.isFormLoaded = false;
    this.needUpdate = true;
    this.shouldSubmit = false;
  }

  async getData(url = "", auth = "") {
    var resp = await fetch(url, {
      method: "GET",
      mode: "cors",
      referrer: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      redirect: "follow"
    }).catch(err => console.log(err));
    if (resp) {
      let jsonres = await resp.json().catch(err => console.log(err));
      return jsonres;
    }
  }

  async shakeBtn() {
    if (this.props.errors.available) {
      this.btnRef.current.classList.value =
        this.btnRef.current.classList.value + " red-btn";
      // setTimeout(() => {
      //   if (this.btnRef.classList !== null) {
      //     this.btnRef.current.classList.value = this.btnRef.current.classList.value.replace(
      //       " red-btn",
      //       ""
      //     );
      //   } else {
      //   }
      // }, 2000);
      setTimeout(() => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }, 1000);
    } else {
     
    }
  }

  async componentDidUpdate() {
    console.log("form.js --updt")
    
    await this.shakeBtn();
    if(Object.keys(this.props.token).length > 0){
      if(this.props.token.token !== "") {
    if (
      (this.props.currentSub.current_sub !== undefined &&
        this.isFormLoaded === false) ||
      this.props.needSwitchState.needswitch === true
    ) {
      var formData = await this.getData(
        "http://192.168.0.7:8000/api/forms/filters/subject/" +
          this.props.currentSub.current_sub.subID +
          "/",
        "Token " + this.props.token.token
      );
      this.props.loadForm(formData);
      this.isFormLoaded = true;
      this.props.needSwitch(false);
      var temparr = [];
      this.props.subState.subState.forEach(sub => {
        var data = {
          q_id: null,
          q_ans: null,
          form_id: null,
          editable: this.props.data[0].editable
        };
        data.q_id = sub.subID;
        temparr.push(data);
      });
      this.setState({ currentForm: temparr });
      this.props.updateForm(this.state.currentForm);
    }
  }
}
  }
  generateForm() {
    var formItems = [],
      i;
    for (i = 1; i <= this.props.data.length; i++) {
      if (this.props.data[i - 1].question.question_type === "SLDR") {
        formItems.push(
          <FormItemSLDR
            sldrid={i}
            key={i}
            ques={this.props.data[i - 1].question.question}
            q_id={this.props.data[i - 1].form_id}
            editable={this.props.data[i - 1].editable}
            ques_id={this.props.data[i - 1].question.question_id}
          />
        );
      } else if (this.props.data[i - 1].question.question_type === "TEXT") {
        formItems.push(
          <FormItem
            sldrid={i}
            key={i}
            ques={this.props.data[i - 1].question.question}
            q_id={this.props.data[i - 1].form_id}
            editable={this.props.data[i - 1].editable}
            ques_id={this.props.data[i - 1].question.question_id}
          />
        );
      } else if (this.props.data[i - 1].question.question_type === "BOOL") {
        formItems.push(
          <FormItemBOOL
            sldrid={i}
            key={i}
            ques={this.props.data[i - 1].question.question}
            q_id={this.props.data[i - 1].form_id}
            editable={this.props.data[i - 1].editable}
            ques_id={this.props.data[i - 1].question.question_id}
          />
        );
      }
    }
    formItems.push(
      <div key={i++} className="submit-flex">
        <div
          className="submit-btn"
          onClick={this.handleClick}
          ref={this.btnRef}
        >
          <h1 style={{ paddingRight: 1 + "em" }}>Submit</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            className="svg-submit"
            id="svg-submit-1"
            ref={this.submitRef}
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
          </svg>
        </div>
      </div>
    );
    return formItems;
  }

  async submitForm(id, url, auth, ans) {
    if(Object.keys(this.props.token).length > 0){
    if(this.props.token.token !== "") {
    await fetch(url + id + "/", {
      method: "PATCH",
      mode: "cors",
      referrer: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify({
        form_answer: ans + "",
        editable: false + ""
      }),
      redirect: "follow"
    }).catch(err => console.log(err));
    // if (response) {
    //   var jsonres = await response.json().catch(err => console.log(err));
    // }
  }
}
  }

  handleClick() {
    if (this.props.errors.available) {
      console.log("nope");
    } else {
      for (var i = 0; i < this.state.currentForm.length; i++) {
        if (
          this.props.currentForm[i].form_id !== null &&
          this.props.data[i].editable === true
        ) {
          this.shouldSubmit = true;
          this.props.currentForm.editable = false;
        } else {
          this.shouldSubmit = false;
        }
            if( this.props.currentForm !== null) {
              if (
            this.props.currentForm[i].form_id === null &&
            this.props.currentForm[i].editable === true
          ) {
            this.props.sendError({
              available: true,
              type: FORM_INCOMP,
              message:
                "You need to answer all the questions (1-7) before you can do that."
            });
            this.setState({
              errors: {
                available: true,
                type: FORM_INCOMP,
                message:
                  "You need to answer all the questions (1-7) before you can do that."
              }
            });
          }
          }
            if( this.props.currentForm !== null) {
          } else if (
            this.props.currentForm[i].form_id === null &&
            this.props.currentForm[i].editable === false
          ) {
            
            this.props.sendError({
              available: true,
              type: FORM_INCOMP,
              message: "Couldn't do that. The Form was already filled."
            });
            this.setState({
              errors: {
                available: true,
                type: "FORM_UNEDITABLE",
                message: "Couldn't do that. The Form was already filled."
              }
            });
          }
        }
        }
    if (this.shouldSubmit === true) {
      if (this.btnRef.current !== null) {
          this.btnRef.current.classList.value =
          this.btnRef.current.classList.value + " green-btn";
        setTimeout(() => {
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
        }, 3000)
      }
      if(Object.keys(this.props.token).length > 0){
        if(this.props.token.token !== "") {
      for (i = 0; i < this.state.currentForm.length; i++) {
        
        console.log("fetching");
        (async (id, url, auth, ans) => {
          await this.submitForm(id, url, auth, ans);
        })(
          this.props.currentForm[i].form_id,
          "http://192.168.0.7:8000/api/forms/",
          "Token " + this.props.token.token,
          this.props.currentForm[i].q_ans
        );
        this.shouldSubmit = false;
      }
    }
  }
}
  }
  componentDidMount() {
    console.log("form.js --mount")
    this.props.sendError({ available: false, type: NO_ERROR, message: "" });
    this.setState({
      currentForm: this.props.currentForm,
      errors: this.props.errors
    });
  }

  generateStartSheet() {
    return (
      <div className="get-started">
        <h1>Select a Subject On The Right To Get Started</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="get-started-svg1"
        >
          <path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" />
        </svg>
      </div>
    );
  }
  countNull() {
    var n=0;
    if(Object.keys(this.props.currentForm).length > 0){
    if(this.props.currentForm !== null){
      if(this.state.currentForm[0].editable === false) {
        return this.state.currentForm.length  
      }
      else {
      for (var i = 0; i < this.state.currentForm.length; i++) {
      if(this.state.currentForm[i].q_ans !== null) {
        n++;
      }
    }
  }
  }
}
    return n;
}

  render() {
    if (this.props.data !== undefined) {
      return this.props.needSwitchState.needswitch === false ? (
        <div>
          <ErrorManager />
          <div className="qnumc">
            <h1
              className="qnum"
              onClick={() => console.log(this.props.currentSub.current_sub)}
            >
              Questions {this.countNull()}/7 Done
            </h1>
            <p>
              Click the blue tick after answering a question, to submit. You
              CANNOT edit an answer after a submission.
            </p>
          </div>
          <div>
            {this.props.currentSub.current_sub !== undefined ||
            this.props.needSwitchState.needswitch === true ? (
              this.generateForm()
            ) : (
              <div className=" fadein "> {this.generateStartSheet()} </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className=" fadein ">{this.generateStartSheet()} </div>
        </div>
      );
    } else
      return (
        <div>
          <div className=" fadein ">{this.generateStartSheet()} </div>
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    formData,
    currentSub,
    needSwitch,
    subState,
    currentForm,
    errors,
    token
  } = state;
  return {
    data: formData.data.data,
    currentSub: currentSub,
    needSwitchState: needSwitch,
    subState,
    currentForm,
    errors,
    token,
    ownProps
  };
};

export default connect(
  mapStateToProps,
  { loadForm, needSwitch, updateForm, sendError }
)(Form);
