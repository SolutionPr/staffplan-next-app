import React from 'react';

const SingleVerticalBarGraph = ({ value, maxValue, width, height, barColor,Color }) => {
  const percentage = (value / maxValue) * 100;

  const containerStyle = {
    position: 'relative',
    width: '30px',
    height:  '100px',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'center',
  };

  const barStyle = {
    width: '100%',
    height: `${percentage}%`,
    backgroundColor: barColor || 'blue',
    position: 'relative',
    borderRadius: '3px 3px 0 0', 
  };

  const valueStyle = {
    position: 'absolute',
    bottom: `${percentage}%`,
    transform: 'translateY(-100%)',
    backgroundColor: 'transparent',
    padding: '2px 0px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: Color ? Color:'#fff',
    bottom:"74%",
  width:"30px",
  textAlign:"center"
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}>
        <div style={valueStyle}>{value}</div>
      </div>
    </div>
  );
};

export default SingleVerticalBarGraph;
