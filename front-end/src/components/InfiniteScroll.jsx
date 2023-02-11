import { faker } from '@faker-js/faker';
import { useEffect,useState } from 'react';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

const InfiniteScroll = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const data = new Array(100).fill().map((value, id) => (({
      id: id,
      title: faker.lorem.words(3),
      body: faker.lorem.sentences(1),
      more: faker.lorem.words(5),
      last: faker.lorem.words(7),
    })));

    setData(data);

  }, []);
  console.log({ data })

  const DATA = ({index }) => (
    <div style={{ color: 'black' }}>{index}</div>
  )

  return <div>
    <ReactVirtualizedAutoSizer>
      {(height, width) => (
        <FixedSizeList
          height={300}
          width={width}
          itemCount={1000}
          itemSize={35}
        >
          {DATA}
        </FixedSizeList>
      )}
    </ReactVirtualizedAutoSizer>
    
    <div>
    {
      data?.map((v, index) => <tr
        style={{

          background: `${index % 2 === 0 ? "linear-gradient(90deg, rgba(195,213,209,0.31985294117647056) 0%, rgba(15,144,115,0.03974089635854339) 100%)"
            :
            "linear-gradient(90deg, rgba(15,144,115,0.53974089635854339) 0%, rgba(195,213,209,0.31985294117647056) 100%)"}`,
          border: '1px',
        }}
        key={index}
      >
        <td style={{ paddingLeft: '2px' }}><h5>{v.title}</h5></td>
        <td style={{ paddingLeft: '2px' }}>{v.body}</td>
        <td style={{ paddingLeft: '2px' }}>{v.more}</td>
        <td style={{ paddingLeft: '2px' }}>{v.last}</td>
      </tr>)
    }
    </div>
  </div>

}

export default InfiniteScroll;