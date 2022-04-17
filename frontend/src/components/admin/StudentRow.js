import React from 'react'
import {
    Input, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem
} from 'reactstrap'


const StudentRow = () => {
  return (
    <tr>
        <td>
            <div className="form-check">
                <Input type="checkbox" className="form-check-input" />
                <label className="form-check-label">#0021</label>
            </div>
        </td>
        <td className="text-center">
            <img src="../../img/figure/student2.png" alt="student" />
        </td>
        <td>Mark Willy</td>
        <td>Male</td>
        <td>2</td>
        <td>A</td>
        <td>Jack Sparrow </td>
        <td>TA-107 Newyork</td>
        <td>02/05/2001</td>
        <td>+ 123 9988568</td>
        <td>kazifahim93@gmail.com</td>
        <td>
            <Dropdown tag="div">
                <DropdownToggle tag="a" aria-expanded="false">
                    <span className="flaticon-more-button-of-three-dots"></span>
                </DropdownToggle>
                <DropdownMenu right={true}>
                    <DropdownItem>
                        <i className="fas fa-times text-orange-red"></i>
                        Close
                    </DropdownItem>
                    <DropdownItem>
                        <i className="fas fa-cogs text-dark-pastel-green"></i>
                        Edit
                    </DropdownItem>
                    <DropdownItem>
                        <i className="fas fa-redo-alt text-orange-peel"></i>
                        Refresh
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </td>
    </tr>
  )
}

export default StudentRow   