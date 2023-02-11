import React from 'react';
// import faker from 'faker'
import { faker } from '@faker-js/faker';
import { List } from "react-virtualized";
// import './App.css';

function LargeFileRender() {

  const data = new Array(1000).fill().map((value, id) => (({
    id: id,
    title: faker.lorem.words(3),
    body: faker.lorem.sentences(8),
  })))

  const renderRow = ({ index, key, style }) => (
    <div  key={key} style={style} className="post">
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Data</td>
          </tr>
        </thead>
        <tbody>
          <tr style={{display:'flex',justifyContent:'center',gap:"10px"}}>
            <td><h3 style={{ fontSize: '16px' }}>{`${data[index].title}-${data[index].id}`}</h3></td>
            <td><p style={{ fontSize: '12px' }}>{data[index].body}</p></td>
          </tr>
        </tbody>
      </table>
      {/* <div key={key} style={style} className="post">
        <h3 style={{ fontSize: '16px' }}>{`${data[index].title}-${data[index].id}`}</h3>
        <p style={{ fontSize: '12px' }}>{data[index].body}</p>
      </div> */}
    </div>
  )
  return (
    <List
      style={{ width: '100%' }}
      width={2000}
      height={700}
      rowRenderer={renderRow}
      rowCount={data.length}
      rowHeight={120}
    />

  );
}
export default LargeFileRender;