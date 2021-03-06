import React, { Component } from 'react'
import ProjectTask from './ProjectTasks/ProjectTask'

class Backlog extends Component {
    render() {

        const {projectTasks} = this.props;
        const tasks = projectTasks.map(projectTask => (
            <ProjectTask key={projectTask.id} projectTask={projectTask}/>
        ));

        let toDoItems = []
        let inProgressItems = []
        let onReviewItems = []
        let doneItems = []
            //console.log(tasks)
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].props.projectTask.status === "TO_DO" ){
                toDoItems.push(tasks[i])
            }
            if(tasks[i].props.projectTask.status === "IN_PROGRESS" ){
                inProgressItems.push(tasks[i])
            }
            if(tasks[i].props.projectTask.status === "ON_REVIEW" ){
              onReviewItems.push(tasks[i])
            }
            if(tasks[i].props.projectTask.status === "DONE" ){
                doneItems.push(tasks[i])
            }
        }

        return (
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="card text-center mb-2">
                  <div className="card-header bg-secondary text-white">
                    <h3>TO DO</h3>
                  </div>
                </div>
                {
                    toDoItems
                }
              </div>
              <div className="col-md-3">
                <div className="card text-center mb-2">
                  <div className="card-header bg-primary text-white">
                    <h3>In Progress</h3>
                  </div>
                </div>
                {
                  inProgressItems
                }
              </div>
              <div className="col-md-3">
                <div className="card text-center mb-2">
                  <div className="card-header bg-warning text-white">
                    <h3>On Review</h3>
                  </div>
                </div>
                {
                  onReviewItems
                }
              </div>
              <div className="col-md-3">
                <div className="card text-center mb-2">
                  <div className="card-header bg-success text-white">
                    <h3>Done</h3>
                  </div>
                </div>
                {
                  doneItems
                }
              </div>
            </div>
          </div>
        );
    }
}

export default Backlog; 