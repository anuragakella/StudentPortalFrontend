import React, { Component, Fragment } from 'react'
import Spinner from '../App/Spinner'
import { connect } from 'react-redux'

export class TeacherDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {uname: "", tecDet: null, isDataAvbl: false, query_res: []};
        this.filtereds = [];
        this.getSubFilter = this.getSubFilter.bind(this);
        this.handleGo = this.handleGo.bind(this);
    }

   componentDidMount() {
        console.log("Mounted Sub Det");
        console.log(this.props.match.params.tecDet);
        this.setState({tecDet: (this.props.match.params.tecDet)});
        }

    async fetchReq(url = "", auth = "") {
        var res = await fetch(url, {
          method: "GET",
          mode: "cors",
          referrer: "no-referrer",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth
          },
          redirect: "follow"
        });
        var jres = await res.json();
        //console.log("FETCH URL: " + url);
        return jres;
      }
    

    async getSubFilter() {
          this.filtereds = [];
          var url =
            "http://192.168.0.7:8000/api/super/prof_filter/";
          var auth = "Token 2603ad1074a7d80dccc2fc838f85101de9ff4467";
            this.filtereds = await this.fetchReq(
              url + this.state.tecDet + "/",
              auth
            );
      }

    async handleGo() {
            await this.getSubFilter();
            console.log(this.filtereds[0]);
            this.setState({query_res: this.filtereds});
    }


    fetchUsers() {
        var forms= [];
        console.log("RE_RENDER")
        var i =1;
        if(Object.keys(this.state.query_res).length > 0) {
            this.state.query_res.forEach(form => {
                console.log(form.form_child.sub_id);
                forms.push(
                    <Fragment>
                    <div>
                    </div>{" "}
                    <tr>
                      <td>{i}</td>
                      <td className="td-ques">{form.question.question}</td>
                      <td>{form.question.question_type}</td>
                      <td>{form.form_child.sub_name}</td>
                      <td>{form.form_answer}</td>
                    </tr>
                  </Fragment>
                )
                i++
            });
            return(forms);
        }
    }

    render() {
        return ( this.state.tecDet != null ? 
        (<div>
            <h1>submissions for: {this.state.tecDet}</h1>
            <div onClick={this.handleGo} className="anl-load-button"><h3>Load</h3></div>
          <div className="anl-table">
          {Object.keys(this.state.query_res).length > 0 ?
            (
                <div>
            <table className="detail-table">
              <tr>
                <th>S.No</th>
                <th>Question</th>
                <th>Question Type</th>
                <th>Subject</th>
                <th>Answer</th>
              </tr>
              {this.fetchUsers()}
              </table>
                </div>
              
            ) : (<div>
                <h2 style={{marginRight: 0 + '%'}}>Press 'Load' to continue</h2>
              <table>
              <tr>
                <th>S.No</th>
                <th>Question</th>
                <th>Question Type</th>
                <th>Subject</th>
                <th>Answer</th>
              </tr>
              </table>
              </div>)}
            
              </div>
        </div>) : (<div><Spinner spinnerText="Reading Formdata"/></div>))
    }
}

const mapStateToProps = (state, ownProps) => {
  const { token } = state;
  return { token, ownProps }
}

export default connect(mapStateToProps)(TeacherDetail)
