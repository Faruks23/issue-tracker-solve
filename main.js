  
// call submitIssue function  here
document.getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

// get input value funtion
const getInputValue = (id) => document.getElementById(id).value;

function submitIssue(e) {
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  // Random id generated here
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";
     
  const issue = { id, description, severity, assignedTo, status };
  // console.log(issue);
    // get data form local storage 
  let issues = [];
    const getIsuss = localStorage.getItem("issues");
  if (getIsuss) {
    issues = JSON.parse(getIsuss);
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}
//  close button Function 
const setStatusClosed = (id) => {
  const getIsuss = localStorage.getItem("issues");
  const issues = JSON.parse(getIsuss);
  // find if close button is clicked  and  match with id than set the status value close
  const currentIssue = issues.find((issue) => issue.id === id);

  // set the status value close
  const statuse = "Closed";
  currentIssue.status = statuse;
  // and set item again convert to string
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

// deleteIssue function
const deleteIssue = (id) => {
  console.log(id);
  const issues = JSON.parse(localStorage.getItem("issues"));
  // find from issues array if id match with id than make a condition
  const remainingIssues = issues.find((issue) => issue.id == id);
  // make a condition  and than splice the data 
  if (remainingIssues !== -1) {
    issues.splice(remainingIssues, 1);
  }
  // and than setItem again
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
 
    const { id, description, severity, assignedTo, status } = issues[i];
  
    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};
fetchIssues();
