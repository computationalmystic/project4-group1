
function clearPopulationArea() {
    document.getElementById("populationArea1").innerHTML = "";
    document.getElementById("populationArea2").innerHTML = "";
    document.getElementById("populationArea3").innerHTML = "";
}


function repo_groupLoad(slide) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("pageHeader").innerHTML = "Repo Groups";
            var obj = JSON.parse('{ "repo_group" : ' + xhttp.responseText + '}'), stage = document.getElementById(slide), stageHTML, i, appendText;
            console.log(slide);
            console.log(obj);
            if (slide === "populationArea1") {
                document.getElementById("pageHeader").innerHTML = "Top Committers";
            } else if (slide === "populationArea2") {
                document.getElementById("pageHeader").innerHTML = "Pull Requests";
            } else if (slide === "populationArea3") {
                document.getElementById("pageHeader").innerHTML = "Closed Issues";
            }
            stageHTML = "<ol>";
            for (i = 0; i < obj.repo_group.length; i += 1) {
                appendText = "<li><a href=# id=" + obj.repo_group[i].repo_group_id + " onclick=repo_groupChange(this.id," + slide + ")>" + obj.repo_group[i].rg_name + "</a></li>";
                stageHTML = stageHTML + appendText;
            }
            stageHTML += "</ol>";
            stage.innerHTML = stageHTML;
        }
    };
    xhttp.open("GET", "http://augur.osshealth.io:5000/api/unstable/repo-groups", true);
    xhttp.send();
}

function repo_groupChange(id, slide) {
    var xhttp = new XMLHttpRequest(), selected = document.getElementById(id);
    xhttp.onreadystatechange = function () {
        document.getElementById("pageHeader").innerHTML = "Repos";
        if (this.readyState === 4 && this.status === 200) {
            var obj = JSON.parse('{ "repos" : ' + xhttp.responseText + '}'), stage = document.getElementById(slide), stageHTML, i, appendText;
            console.log(slide.id + " This");
        
            if (slide.id === "populationArea1") {
                stage = document.getElementById("populationArea1");
            } else if (slide.id === "populationArea2") {
                stage = document.getElementById("populationArea2");
            } else if (slide.id === "populationArea3") {
                stage = document.getElementById("populationArea3");
            }
            stageHTML = "<ol>";
            console.log(obj);
            for (i = 0; i < obj.repos.length; i += 1) {
                appendText = "<li><a href=# onclick='loadVisuals(" + id + "," + obj.repos[i].repo_id + ")'>" + obj.repos[i].repo_name + "</a></li>";
                stageHTML += appendText;
            }
            stageHTML += "</ol>";
            stage.innerHTML = stageHTML;
        }
    };
    xhttp.open("GET", "http://augur.osshealth.io:5000/api/unstable/repo-groups/" + id + "/repos", true);
    xhttp.send();
}

function topCommitters(repoGroupID, reposID) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState === 4 && this.status === 500) {
            console.log("There was an internal server error. Please try a different repository.");
            document.getElementById("errorArea1").innerHTML = "There was an internal server error. Please try a different repository.";            
        }
        if (this.readyState === 4 && this.status === 200) {
            var text = '{ "topCommitters" : ' + xhttp.responseText + '}', obj = JSON.parse(text), email, i, committers = "<ol>";
            console.log(obj);
            for (i = 0; (obj.topCommitters[i].email !== "other_contributors") && i < 10; i++) {
                console.log(i);
                console.log(obj.topCommitters[i].email);
            
                email = obj.topCommitters[i].email;
                committers = committers + "<li>" + email + "  " + obj.topCommitters[i].commits + "</li>";
            }
            committers = committers + "</ol>";
            document.getElementById("populationArea1").innerHTML = committers;
            document.getElementById("errorArea1").innerHTML = "";
        }
    };
    
    xhttp.open("GET", "http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/top-committers", true);
    xhttp.send();
}

function pullRequests(repoGroupID, reposID) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 500) {
            console.log("There was an internal server error. Please try a different repository.");
            document.getElementById("errorArea2").innerHTML = "There was an internal server error. Please try a different repository.";          
        }
        if (this.readyState == 4 && this.status == 200) {
            var text = '{ "pullRequests" : ' + xhttp.responseText + '}';
            console.log(text);
            var obj = JSON.parse(text);
            var email; 
            var i;
            var j = 1;
            var committers = "<ol>"
            console.log(obj);
            if(obj.pullRequests.length > 10){
                for (i = obj.pullRequests.length; i>(obj.pullRequests.length - 11); i--) {
                    console.log(i);
                    rate = obj.pullRequests[i].rate;
                    current_date = new Date(obj.pullRequests[i].date);
                    formatted_date = (current_date.getMonth() + 1) + "-" + current_date.getDate() + "-" + current_date.getFullYear();
                    committers = committers + "<li><h" + j + ">" + formatted_date + "  " + rate + "</h" + j + "></li>";
                    j++;
                }
            }
            else{
                i = obj.pullRequests.length - 1;
                if(i == -1){
                    committers = committers + "<li>There are no pull requests in this repo. Please choose a different one.</li>"   
                }
                else{    
                    for(i; i >= 0; i--){
                        rate = obj.pullRequests[i].rate;
                        current_date = new Date(obj.pullRequests[i].date);
                        formatted_date = (current_date.getMonth() + 1) + "-" + current_date.getDate() + "-" + current_date.getFullYear();
                        committers = committers + "<li><h" + j + ">" + formatted_date + "  " + rate + "</h" + j + "></li>";
                        j++;
                    }
                }
                
            }
            committers = committers + "</ol>";
            document.getElementById("populationArea2").innerHTML = committers;
            document.getElementById("errorArea2").innerHTML = "";
        }
    };
    xhttp.open("GET", "http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/pull-request-acceptance-rate", true);
    xhttp.send();
}

function closedIssues(repoGroupID, reposID) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 500) {
            console.log("There was an internal server error. Please try a different repository.");
            document.getElementById("errorArea3").innerHTML = "There was an internal server error. Please try a different repository.";           
        }
        if (this.readyState == 4 && this.status == 200) {
            var text = '{ "closedIssues" : ' + xhttp.responseText + '}', obj = JSON.parse(text), email, i, committers = "<ol>";
            console.log(obj);
            var j = 1;
            if(obj.closedIssues.length > 10){
                for (i = (obj.closedIssues.length - 1); i > (obj.closedIssues.length - 11); i--) {
                    
                    console.log(i);
            
                    current_date = new Date(obj.closedIssues[i].date);
                    formatted_date = (current_date.getMonth() + 1) + "-" + current_date.getDate() + "-" + current_date.getFullYear();
                    committers = committers + "<li><h" + j + ">" + formatted_date + "  " + obj.closedIssues[i].closed_count + "</h" + j +"></li>";
                    j++;
                }
            }
            else{
                
                i = obj.closedIssues.length - 1;
                if(i == -1){
                    committers = committers + "<li>There is no closed issues in this repo. Please choose a different one.</li>"
                }
                else{
                    for(i; i >= 0; i--){
                        current_date = new Date(obj.closedIssues[i].date);
                        formatted_date = (current_date.getMonth() + 1) + "-" + current_date.getDate() + "-" + current_date.getFullYear();
                        committers = committers + "<li><h" + j + ">" + formatted_date + "  " + obj.closedIssues[i].closed_count + "</h" + j +"></li>";
                        j++;
                    }
                }
            }
            committers = committers + "</ol>";
            document.getElementById("populationArea3").innerHTML = committers;
            document.getElementById("errorArea3").innerHTML = "";
        }
    };
    
    xhttp.open("GET", "http://augur.osshealth.io:5000/api/unstable/repo-groups/" + repoGroupID + "/repos/" + reposID + "/closed-issues-count", true);
    xhttp.send();
}
 
function loadVisuals(repoGroupID, repoID) {
    console.log("This function was called");
    topCommitters(repoGroupID, repoID);
    pullRequests(repoGroupID, repoID);
    closedIssues(repoGroupID, repoID);
}