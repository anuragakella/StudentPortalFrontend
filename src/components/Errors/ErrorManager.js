import React, { Component } from "react";
import { connect } from "react-redux";
import { sendError } from "../../reducers/actions/sendError";

export class ErrorManager extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.errRef = React.createRef();
  }
  componentDidMount() {
    this.setState({ errors: this.props.errors });
  }

  isErrorAvl() {
    return this.props.errors.available;
  }

  componentDidUpdate() {
    if (Object.keys(this.props).length > 0) {
    if (this.props.errors.available === true) {
      //console.log("ERR MNGR");
      console.log(this.props.errors)
      this.errRef.current.classList.value = this.errRef.current.classList.value.replace(
        " error-invisible",
        ""
      );
      setTimeout(() => {
        setTimeout(() => {
          this.props.sendError({ available: false, message: "" });
        }, 1000);
        this.errRef.current.classList.value =
          this.errRef.current.classList.value + " error-invisible";
      }, 4000);
    }
  }
}
  render() {
    return (
        <div className="error-manager error-invisible" ref={this.errRef}>
          {this.props.errors !== undefined ?
            
            this.props.errors.available ? (
            <h3> {this.props.errors.message} </h3>
          ) : (
            <h3>ErrorManager</h3>
          ) : (<div></div>)}
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { errors } = state;
  return { errors, ownProps };
};

export default connect(
  mapStateToProps,
  { sendError }
)(ErrorManager);
