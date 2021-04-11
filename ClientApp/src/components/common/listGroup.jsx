import React from 'react';

const ListGroup = (props) => {
    return (
        <ul className="list-group">
            {props.items.map(item => (
                <li
                    key={item[props.valueProperty]}
                    className="list-group-item"
                    onClick={() => props.onItemSelect(item)}
                    className={item === props.selectedItem ? "list-group-item active" : "list-group-item"}
                >
                    {item[props.textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: "_id"
}

export default ListGroup;