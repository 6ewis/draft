import React from 'react';
import _BoxSource from '../../../containers/DND/_BoxSource';
import R from 'ramda';

export default ( {
   styleHeader, content, styleCursor, attributeName,
   attributeTitle, boxSourceType, boxSourceComponent
  }) => {

//   let arrayOfAttributeNames = [];
//
//   function renderAttributes() {
//     let listAttributes = content.map((key, index) => {
//       arrayOfAttributeNames.push(key[attributeName]);
//       let draggedItem = {attribute: attributeName, value: key[attributeName], id: key.id};
//       let newProps = Object.assign({}, {}, {
//         _draggedItem: draggedItem,
//         attributeValue: key[attributeName],
//         id: key.id,
//         key: index,
//         cursor: styleCursor.cursor});
//         return React.createElement(_BoxSource(boxSourceType, boxSourceComponent), newProps);
//     });
//
//     return ( <div>
//                <h4 style={styleHeader}> {attributeTitle} </h4>
//                {R.all(R.isNil)(arrayOfAttributeNames) ? "No data available" : listAttributes }
//              </div>
//            );
//   }

 function renderAttributes() {
 let createElementWithNewProps = (key, index) => {
    let draggedItem = {attribute: attributeName, value: key[attributeName], id: key.id};
    let newProps = {
      _draggedItem: draggedItem,
      attributeValue: key[attributeName],
      id: key.id,
      key: index,
      cursor: styleCursor.cursor
    };
    return React.createElement(_BoxSource(boxSourceType, boxSourceComponent), newProps);
  };

  let alreadyProcessed = (resultList, item) => {
    let arrayOfAttributeValues = R.map(R.path(['props', 'attributeValue']), resultList);
    console.log("attribute", attributeName);
    console.log("item[attributeName]: ", item[attributeName]);
    console.log("arrayOfAttributeValues: ", arrayOfAttributeValues);
    return R.contains(item[attributeName], arrayOfAttributeValues);
  };

  let processItem = (results, item, index) => {
    if (alreadyProcessed(results, item)) {return results; }
    return R.append(createElementWithNewProps(item, index), results);
  };

  let listAttributes = R.addIndex(R.reduce)(processItem, [], content);

  return ( <div>
             <h4 style={styleHeader}> {attributeTitle} </h4>
             {R.all(R.isNil)(listAttributes) ? "No data available" : listAttributes }
           </div>
         );
 }

 return renderAttributes();
};
