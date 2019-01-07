import React from 'react';
import PropTypes from 'prop-types';

const SelectionList = ({lists})=>{
  return (
    <React.Fragment>
      {lists.map((item, index)=>{
        return (
          <option key={index} value={item}>{item}</option>
        );
      })}
    </React.Fragment>
  )
  
};

SelectionList.propTypes = {
  lists: PropTypes.array.isRequired
};

export default SelectionList;