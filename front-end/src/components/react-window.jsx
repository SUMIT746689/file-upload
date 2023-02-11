import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./styles.css";
import { faker } from "@faker-js/faker";


export const ReactWindow = () => {
  const [data, sedivata] = useState([])
  useEffect(() => {
    const data = new Array(30000).fill().map((value, id) => (({
      id: id,
      title: faker.lorem.words(3),
      body: faker.lorem.sentences(3),
      more: faker.lorem.words(5),
      last: faker.lorem.words(7),
    })));

    sedivata(data);

  }, []);

  useEffect(() => {
    console.log({ data })
  })

  const Row = ({ index, style }) => (
    <div
      className={index % 2 ? "ListItemOdd" : "ListItemEven"}
      style={style}
    >
      <div style={{ width: '25%', height: 'fit',padding:'2px' }}>{data[index].title}</div>
      <div style={{ width: '25%', height: 'fit',padding:'2px' }}>{data[index].body}</div>
      <div style={{ width: '25%', height: 'fit',padding:'2px' }}>{data[index].more}</div>
      <div style={{ width: '25%', height: 'fit',padding:'2px' }}>{data[index].last}</div>
    </div>
  );


  return (
    <>
      <div style={{ width: 'full', height: 'fit' }}>
        <div style={{ display: 'flex', background: 'green', color: 'white' }}>
          <div style={{ width: '25%', padding: '10px 0 10px 10px', borderLeft: '1px solid white' }} >Title</div>
          <div style={{ width: '25%', padding: '10px 0 10px 10px', borderLeft: '1px solid white' }} >Body</div>
          <div style={{ width: '25%', padding: '10px 0 10px 10px', borderLeft: '1px solid white' }} >More</div>
          <div style={{ width: '25%', padding: '10px 0 10px 10px', borderLeft: '1px solid white' }} >Last</div>
        </div>
        <List
          className="List"
          height={500}
          itemCount={data.length}
          itemSize={60}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </>
  )
};

