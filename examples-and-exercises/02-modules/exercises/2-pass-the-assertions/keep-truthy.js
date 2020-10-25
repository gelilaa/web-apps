'use strict';

// write this file

const keepTruthy= (truthy)=>{

 return truthy.filter(Boolean);
};

module.exports = keepTruthy;