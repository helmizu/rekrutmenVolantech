import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, CardHeader, CardFooter, CardSubtitle, Row, Col, Navbar, NavbarBrand, Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, FormGroup, Input} from 'reactstrap'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            tasks : [],
            task : "",
            description : "",
            taskEdit : "",
            descriptionEdit : "",
            insertTask : 0,
            category: "", 
            insertCategory : 0,
            dropdownOpen: false,
            dropdownMenuOpen: false,
            dropdownId: 0,
            editTask : 0
        };
        
        this.toggle = this.toggle.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.onChange = this.onChange.bind(this)
        this.saveTask = this.saveTask.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.saveCategory = this.saveCategory.bind(this)
        
    }
    
    toggle(idTask) {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen,
            dropdownId : idTask
        }));
    }
    
    toggleMenu(idTask) {
        this.setState(prevState => ({
            dropdownMenuOpen: !prevState.dropdownOpen,
            dropdownId : idTask
        }));
    }
    
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    addNewTask(idList) {
        this.setState({
            insertTask: idList
        });  
    }
    
    addNewCategory(idCategory) {
        this.setState({
            insertCategory: idCategory
        });  
    }
    
    moveTask(idTask, idCategory) {
        const tasks = this.state.tasks;
        for (var i in tasks) {
            if (tasks[i].id == idTask) {
                tasks[i].category = idCategory;
                break; //Stop this loop, we found it!
            }
        }
        this.setState({
            tasks : tasks
        })
        
    }
    
    saveTask(e) {
        e.preventDefault()
        
        let newTask = {
            id : this.state.tasks.length+1,
            task : this.state.task,
            description : this.state.description,
            important : this.state.important,
            category : this.state.insertTask
        }
        
        let tasks = [...this.state.tasks, newTask]
        
        this.setState({
            tasks : tasks,
            task : "",
            description : "",
            category : "",
            insertTask : 0
        })
    }
    
    editTask(idTask) {
        const tasks = this.state.tasks;
        for (var i in tasks) {
            if (tasks[i].id == idTask) {
                this.setState({
                    taskEdit : tasks[i].task,
                    descriptionEdit : tasks[i].description,
                    editTask : tasks[i].id
                })
                break; //Stop this loop, we found it!
            }
        }
    }
    
    saveEdit(e) {
        e.preventDefault()
        const idTask = this.state.editTask;
        const tasks = this.state.tasks;
        for (var i in tasks) {
            if (tasks[i].id == idTask) {
                tasks[i].task = this.state.taskEdit;
                tasks[i].description = this.state.descriptionEdit;
                break; //Stop this loop, we found it!
            }
        }
        this.setState({
            tasks : tasks,
            editTask : 0,
            dropdownMenuOpen : false
        })
        
    }
    
    deleteTask(idTask) {
        var tasks = this.state.tasks
        var index = tasks.map(x => {
            return x.id;
        }).indexOf(idTask);
        
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        })
    }
    
    saveCategory(e) {
        e.preventDefault()
        
        let newCategory = {
            id : this.state.categories.length+1,
            name : this.state.category,
        }
        
        let categories = [ ...this.state.categories, newCategory ]
        
        this.setState({
            categories : categories,
            category : "",
            insertCategory : 0
        })         
    }
    
    updateCategory(idList) {
        return this.state.categories.find(x => x.id === idList).name;
    }
    
    render() {
        const {insertTask, tasks, categories, insertCategory, editTask} = this.state
        return (
            <div>
            <Navbar>
            <NavbarBrand className="text-white">To Do List</NavbarBrand>
            </Navbar>
            
            <div class="container-fluid py-3 height-full">
            <Row>
            {categories.map(c => 
                (
                    <Col key={c.id} sm="3" xs="3" md="3">
                    <Card className="wrap-head border-left-color-blue">
                    <h5 className="text-head">{c.name}</h5>
                    </Card>
                    <div className="wrap-content mb-3">
                    {tasks.map(t => (
                        t.category === c.id ?
                        (
                            editTask && editTask === t.id ? 
                                (
                                    <Card key={t.id}>
                                    <CardBody>
                                    <Form onSubmit={this.saveEdit}>
                                    <FormGroup>
                                    <Input type="text" onChange={this.onChange} name="taskEdit" value={this.state.taskEdit} id="Task" placeholder="Your Task" />
                                    </FormGroup>
                                    <FormGroup>
                                    <Input type="textarea" onChange={this.onChange} name="descriptionEdit" value={this.state.descriptionEdit} id="Description" placeholder="Description"/>
                                    </FormGroup>
                                    <Button block={true} type="submit" className="mt-2">Save</Button>
                                    </Form>
                                    </CardBody>
                                    </Card>
                                    ) 
                                    :
                                    (
                                   
                            <Card key={t.id}>
                            <CardHeader>
                            <Row>
                            <Col xs="10">
                            {t.task}
                            </Col>
                            <Col xs="2">
                            <Dropdown isOpen={this.state.dropdownMenuOpen && this.state.dropdownId === t.id} toggle={() => {this.toggleMenu(t.id)}}>
                            <DropdownToggle className="edit" caret>
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem onClick={() => {this.editTask(t.id)}}>Edit</DropdownItem>
                            <DropdownItem onClick={() => {this.deleteTask(t.id)}}>Delete</DropdownItem>                                        
                            </DropdownMenu>
                            </Dropdown>
                            </Col>
                            </Row>
                            </CardHeader>
                            <CardBody onClick={this.toggle} className="p-2">
                            <CardSubtitle className="px-3">
                            {t.description}
                            </CardSubtitle>
                            </CardBody>
                            <CardFooter>
                            <Dropdown isOpen={this.state.dropdownOpen && this.state.dropdownId === t.id} toggle={() => {this.toggle(t.id)}}>
                            <DropdownToggle caret>
                            Move
                            </DropdownToggle>
                            <DropdownMenu>
                            {categories.map(c => (
                                <DropdownItem onClick={() => {this.moveTask(t.id, c.id)}}>{c.name}</DropdownItem>
                                ))}
                                
                                </DropdownMenu>
                                </Dropdown>
                                </CardFooter>
                                </Card>
                                    )
                                )
                                :
                                ""
                                ))}
                                <div>
                                {insertTask && insertTask === c.id ? 
                                    (
                                        <Card>
                                        <CardBody>
                                        <Form onSubmit={this.saveTask}>
                                        <FormGroup>
                                        <Input type="text" onChange={this.onChange} name="task" id="Task" placeholder="Your Task" />
                                        </FormGroup>
                                        <FormGroup>
                                        <Input type="textarea" onChange={this.onChange} name="description" id="Description" placeholder="Description"/>
                                        </FormGroup>
                                        <Button block={true} type="submit" className="mt-2">Save</Button>
                                        </Form>
                                        </CardBody>
                                        </Card>
                                        ) 
                                        :
                                        (
                                            <span onClick={() => {this.addNewTask(c.id)}}> + Add Task</span>
                                            )                               
                                        }
                                        </div>
                                        </div>
                                        </Col>
                                        )
                                        )}
                                        
                                        <Col xs="3">
                                        {!insertCategory ?
                                            (
                                                <Button block={true} onClick={() => {this.addNewCategory(categories.length+1)}}> + Add List</Button>
                                                )
                                                :
                                                (
                                                    <Card>
                                                    <CardBody>
                                                    <Form onSubmit={this.saveCategory}>
                                                    <FormGroup>
                                                    <Input type="text" onChange={this.onChange} name="category" id="Category" placeholder="Your Category" />
                                                    </FormGroup>
                                                    <Button block={true} type="submit" className="mt-2">Save</Button>
                                                    </Form>
                                                    </CardBody>
                                                    </Card>
                                                    )                                
                                                }
                                                </Col>
                                                </Row>
                                                </div>
                                                </div>
                                                )
                                            }
                                        }
                                        