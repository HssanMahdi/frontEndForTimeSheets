import React from "react";
import "./ProjectPlanning.scss";
import hello from "../../assets/project-management-q.svg";
export default function ProjectPlanning() {
  return (
    <main>
      <div className="main__container">
        <div className="main__title ">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Project Planning</h1>
            <p>To Do List</p>
          </div>
        </div>
        <hr></hr>
        <div className="app">
          <main className="project-planning">
            <div className="project-info">
              <h1></h1>
              <div className="project-participants">
                <span></span>
                <span></span>
                <span></span>
                <button className="project-participants__add">
                  Add Participant
                </button>
              </div>
            </div>
            <div className="project-tasks">
              <div className="row">
                <div className="col">
                  <div className="project-column">
                    <div className="project-column-heading">
                      <h2 className="project-column-heading__title">
                        Task Ready
                      </h2>
                      <button className="project-column-heading__options">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--copyright">
                          Copywriting
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Konsep hero title yang menarik</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>3
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>7
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>

                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--design">
                          UI Design
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Icon di section our services</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>2
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>5
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>

                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--copyright">
                          Copywriting
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Konsep hero title yang menarik</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>2
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>3
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="project-column">
                    <div className="project-column-heading">
                      <h2 className="project-column-heading__title">
                        Task To Do
                      </h2>
                      <button className="project-column-heading__options">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>

                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--copyright">
                          Copywriting
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>
                        Check the company we copied doesn't think we copied
                        them.
                      </p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>4
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>0
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>
                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--design">
                          UI Design
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Design the about page.</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>0
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>5
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>
                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--illustration">
                          Illustration
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Move that one image 5px down to make Phil Happy.</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>2
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>2
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="project-column">
                    <div className="project-column-heading">
                      <h2 className="project-column-heading__title">Done</h2>
                      <button className="project-column-heading__options">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>

                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--illustration">
                          Illustration
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>
                        Send Advert illustrations over to production company.
                      </p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>12
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>5
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>

                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--illustration">
                          Illustration
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Dawn wants to move the text 3px to the right.</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>3
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>7
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>

                    <div className="task" draggable="true">
                      <div className="task__tags">
                        <span className="task__tag task__tag--copyright">
                          Copywriting
                        </span>
                        <button className="task__options">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                      <p>Amend the contract details.</p>
                      <div className="task__stats">
                        <span>
                          <time dateTime="2021-11-24T20:00:00">
                            <i className="fas fa-flag"></i>Nov 24
                          </time>
                        </span>
                        <span>
                          <i className="fas fa-comment"></i>8
                        </span>
                        <span>
                          <i className="fas fa-paperclip"></i>16
                        </span>
                        <span className="task__owner"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
