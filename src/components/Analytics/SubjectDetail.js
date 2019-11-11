import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

export class SubjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {uname: "", sub: {}, isDataAvbl: false, query_res: []};
        this.filtereds = [];
        this.getSubFilter = this.getSubFilter.bind(this);
        this.handleGo = this.handleGo.bind(this);
    }

   componentDidMount() {
        console.log("Mounted Sub Det");
        console.log(this.props.match.params.subDet);
        var plusindex = this.props.match.params.subDet.indexOf('+');
        var sub_id = this.props.match.params.subDet.slice(plusindex+1);
        var sub_name = this.props.match.params.subDet.slice(0, plusindex);
        this.setState({sub: {subName: sub_name.replace(/_/g, " "), subID: sub_id}});
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
            "http://192.168.0.7:8000/api/super/form_filter/";
          var auth = "Token 2603ad1074a7d80dccc2fc838f85101de9ff4467";
            this.filtereds = await this.fetchReq(
              url + this.state.uname + "/",
              auth
            );
      }

    async handleGo() {
        await this.setState({uname: this.state.uname_text});
        if((this.state.uname).search("VF1M") === -1){
            console.log("invalid username");
        } else {
            await this.getSubFilter();
            console.log(this.filtereds[0]);
            this.setState({query_res: this.filtereds});
        }
    }

    handleText = (e) => {
        this.setState({[e.target.name]: e.target.value});
    } 

    fetchUsers() {
        var forms= [];
        console.log("RE_RENDER")
        var i =1;
        if(Object.keys(this.state.query_res).length > 0) {
            this.state.query_res.forEach(form => {
                console.log(form.form_child.sub_id);
                console.log(this.state.sub.subID);
                console.log(form.form_child.sub_id == this.state.sub.subID);
                if(form.form_child.sub_id == this.state.sub.subID){
                forms.push(
                    <Fragment>
                    <div>
                    </div>{" "}
                    <tr>
                      <td>{i}</td>
                      <td>{form.question.question}</td>
                      <td>{form.question.question_type}</td>
                      <td>{form.form_answer}</td>
                    </tr>
                  </Fragment>
                )
                i++
                }
            });
            return(forms);
        }
    }

    render() {
        return (<div>
            <h1>submissions for: {this.state.sub.subName}</h1>
            <p>subID: {this.state.sub.subID}</p>
            <input type="text" name="uname_text" onChange={this.handleText}></input>
            <div onClick={this.handleGo} className="anl-load-button"><h3>Go</h3></div>
          <div className="anl-table">
            <table>
              <tr>
                <th>S.No</th>
                <th>Question</th>
                <th>Question Type</th>
                <th>Answer</th>
              </tr>
              {this.fetchUsers()}
              </table>
              </div>
        </div>)
    }
}

export default withRouter(SubjectDetail);
